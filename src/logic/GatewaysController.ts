let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { NotFoundException } from 'pip-services3-commons-node';
import { BadRequestException } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';

import { GatewayModelV1 } from '../data/version1/GatewayModelV1';
import { GatewayV1 } from '../data/version1/GatewayV1';
import { UdiConverter } from '../data/version1/UdiConverter';
import { IGatewaysPersistence } from '../persistence/IGatewaysPersistence';
import { IGatewaysController } from './IGatewaysController';
import { GatewaysCommandSet } from './GatewaysCommandSet';

export class GatewaysController implements  IConfigurable, IReferenceable, ICommandable, IGatewaysController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-gateways:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(GatewaysController._defaultConfig);
    private _persistence: IGatewaysPersistence;
    private _commandSet: GatewaysCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IGatewaysPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new GatewaysCommandSet(this);
        return this._commandSet;
    }
    
    public getGateways(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<GatewayV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getGatewayById(correlationId: string, id: string, 
        callback: (err: any, gateway: GatewayV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);
    }

    public getGatewayByUdi(correlationId: string, udi: string, 
        callback: (err: any, gateway: GatewayV1) => void): void {
        udi = UdiConverter.fromString(udi);
        this._persistence.getOneByUdi(correlationId, udi, callback);
    }

    public getOrCreateGateway(correlationId: string, org_id: string, udi: string,
        callback: (err: any, gateway: GatewayV1) => void): void {
        let gateway: GatewayV1;

        udi = UdiConverter.fromString(udi);

        async.series([
            (callback) => {
                this._persistence.getOneByUdi(correlationId, udi, (err, data) => {
                    gateway = data;
                    callback(err);
                });
            },
            (callback) => {
                if (gateway == null && org_id != null) {
                    gateway = <GatewayV1> {
                        id: IdGenerator.nextLong(),
                        org_id: org_id,
                        udi: udi,
                        create_time: new Date(),
                        model: null,
                        active: true
                    };

                    this._persistence.create(correlationId, gateway, (err, data) => {
                        gateway = data;
                        callback(err);
                    });
                } else callback();
            }
        ], (err) => {
            callback(err, gateway);
        });
    }

    private fixGateway(gateway: GatewayV1): void {
        gateway.udi = UdiConverter.fromString(gateway.udi);
        //gateway.model = gateway.model || GatewayModelV1.Unknown;
        gateway.active = gateway.active != null ? gateway.active : true;
    }

    public createGateway(correlationId: string, gateway: GatewayV1, 
        callback: (err: any, gateway: GatewayV1) => void): void {
        let newGateway: GatewayV1;

        this.fixGateway(gateway);
        gateway.id = IdGenerator.nextLong();
        gateway.create_time = new Date();

        async.series([
            // Check for existing UDI
            (callback) => {
                this._persistence.getOneByUdi(correlationId, gateway.udi, (err, data) => {
                    if (err == null && data != null) {
                        err = new BadRequestException(
                            correlationId,
                            'GW_UDI_USED',
                            'Gateway UDI ' + gateway.udi + ' has already been used'
                        ).withDetails('udi', gateway.udi);
                    }
                    callback(err);
                });
            }, 
            // Create gateway
            (callback) => {
                this._persistence.create(correlationId, gateway, (err, data) => {
                    newGateway = data;
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, newGateway);
        });
    }

    public updateGateway(correlationId: string, gateway: GatewayV1, 
        callback: (err: any, gateway: GatewayV1) => void): void {
        let newGateway: GatewayV1;

        this.fixGateway(gateway);

        async.series([
            // Check for existing UDI
            (callback) => {
                this._persistence.getOneByUdi(correlationId, gateway.udi, (err, data) => {
                    if (err == null && data != null && data.id != gateway.id) {
                        err = new BadRequestException(
                            correlationId,
                            'GW_UDI_USED',
                            'Gateway UDI ' + gateway.udi + ' has already been used'
                        ).withDetails('udi', gateway.udi);
                    }
                    callback(err);
                });
            }, 
            // Update gateway
            (callback) => {
                this._persistence.update(correlationId, gateway, (err, data) => {
                    newGateway = data;
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, newGateway);
        });
    }

    public deleteGatewayById(correlationId: string, id: string,
        callback: (err: any, gateway: GatewayV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
