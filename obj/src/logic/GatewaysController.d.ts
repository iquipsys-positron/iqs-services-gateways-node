import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { GatewayV1 } from '../data/version1/GatewayV1';
import { IGatewaysController } from './IGatewaysController';
export declare class GatewaysController implements IConfigurable, IReferenceable, ICommandable, IGatewaysController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getGateways(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<GatewayV1>) => void): void;
    getGatewayById(correlationId: string, id: string, callback: (err: any, gateway: GatewayV1) => void): void;
    getGatewayByUdi(correlationId: string, udi: string, callback: (err: any, gateway: GatewayV1) => void): void;
    getOrCreateGateway(correlationId: string, org_id: string, udi: string, callback: (err: any, gateway: GatewayV1) => void): void;
    private fixGateway;
    createGateway(correlationId: string, gateway: GatewayV1, callback: (err: any, gateway: GatewayV1) => void): void;
    updateGateway(correlationId: string, gateway: GatewayV1, callback: (err: any, gateway: GatewayV1) => void): void;
    deleteGatewayById(correlationId: string, id: string, callback: (err: any, gateway: GatewayV1) => void): void;
}
