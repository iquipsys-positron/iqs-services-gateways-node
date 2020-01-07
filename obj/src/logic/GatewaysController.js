"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const UdiConverter_1 = require("../data/version1/UdiConverter");
const GatewaysCommandSet_1 = require("./GatewaysCommandSet");
class GatewaysController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(GatewaysController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new GatewaysCommandSet_1.GatewaysCommandSet(this);
        return this._commandSet;
    }
    getGateways(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getGatewayById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    getGatewayByUdi(correlationId, udi, callback) {
        udi = UdiConverter_1.UdiConverter.fromString(udi);
        this._persistence.getOneByUdi(correlationId, udi, callback);
    }
    getOrCreateGateway(correlationId, org_id, udi, callback) {
        let gateway;
        udi = UdiConverter_1.UdiConverter.fromString(udi);
        async.series([
            (callback) => {
                this._persistence.getOneByUdi(correlationId, udi, (err, data) => {
                    gateway = data;
                    callback(err);
                });
            },
            (callback) => {
                if (gateway == null && org_id != null) {
                    gateway = {
                        id: pip_services3_commons_node_4.IdGenerator.nextLong(),
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
                }
                else
                    callback();
            }
        ], (err) => {
            callback(err, gateway);
        });
    }
    fixGateway(gateway) {
        gateway.udi = UdiConverter_1.UdiConverter.fromString(gateway.udi);
        //gateway.model = gateway.model || GatewayModelV1.Unknown;
        gateway.active = gateway.active != null ? gateway.active : true;
    }
    createGateway(correlationId, gateway, callback) {
        let newGateway;
        this.fixGateway(gateway);
        gateway.id = pip_services3_commons_node_4.IdGenerator.nextLong();
        gateway.create_time = new Date();
        async.series([
            // Check for existing UDI
            (callback) => {
                this._persistence.getOneByUdi(correlationId, gateway.udi, (err, data) => {
                    if (err == null && data != null) {
                        err = new pip_services3_commons_node_3.BadRequestException(correlationId, 'GW_UDI_USED', 'Gateway UDI ' + gateway.udi + ' has already been used').withDetails('udi', gateway.udi);
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
    updateGateway(correlationId, gateway, callback) {
        let newGateway;
        this.fixGateway(gateway);
        async.series([
            // Check for existing UDI
            (callback) => {
                this._persistence.getOneByUdi(correlationId, gateway.udi, (err, data) => {
                    if (err == null && data != null && data.id != gateway.id) {
                        err = new pip_services3_commons_node_3.BadRequestException(correlationId, 'GW_UDI_USED', 'Gateway UDI ' + gateway.udi + ' has already been used').withDetails('udi', gateway.udi);
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
    deleteGatewayById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.GatewaysController = GatewaysController;
GatewaysController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-gateways:persistence:*:*:1.0');
//# sourceMappingURL=GatewaysController.js.map