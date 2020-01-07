"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const GatewayV1Schema_1 = require("../data/version1/GatewayV1Schema");
class GatewaysCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetGatewaysCommand());
        this.addCommand(this.makeGetGatewayByIdCommand());
        this.addCommand(this.makeGetGatewayByUdiCommand());
        this.addCommand(this.makeGetOrCreateGatewayCommand());
        this.addCommand(this.makeCreateGatewayCommand());
        this.addCommand(this.makeUpdateGatewayCommand());
        this.addCommand(this.makeDeleteGatewayByIdCommand());
    }
    makeGetGatewaysCommand() {
        return new pip_services3_commons_node_2.Command("get_gateways", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getGateways(correlationId, filter, paging, callback);
        });
    }
    makeGetGatewayByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_gateway_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('gateway_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let gateway_id = args.getAsString("gateway_id");
            this._logic.getGatewayById(correlationId, gateway_id, callback);
        });
    }
    makeGetGatewayByUdiCommand() {
        return new pip_services3_commons_node_2.Command("get_gateway_by_udi", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('gateway_udi', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let gateway_udi = args.getAsString("gateway_udi");
            this._logic.getGatewayByUdi(correlationId, gateway_udi, callback);
        });
    }
    makeGetOrCreateGatewayCommand() {
        return new pip_services3_commons_node_2.Command("get_or_create_gateway", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('org_id', pip_services3_commons_node_6.TypeCode.String)
            .withRequiredProperty('udi', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let org_id = args.getAsString("org_id");
            let udi = args.getAsString("udi");
            this._logic.getOrCreateGateway(correlationId, org_id, udi, callback);
        });
    }
    makeCreateGatewayCommand() {
        return new pip_services3_commons_node_2.Command("create_gateway", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('gateway', new GatewayV1Schema_1.GatewayV1Schema()), (correlationId, args, callback) => {
            let gateway = args.get("gateway");
            this._logic.createGateway(correlationId, gateway, callback);
        });
    }
    makeUpdateGatewayCommand() {
        return new pip_services3_commons_node_2.Command("update_gateway", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('gateway', new GatewayV1Schema_1.GatewayV1Schema()), (correlationId, args, callback) => {
            let gateway = args.get("gateway");
            this._logic.updateGateway(correlationId, gateway, callback);
        });
    }
    makeDeleteGatewayByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_gateway_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('gateway_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let gatewayId = args.getAsNullableString("gateway_id");
            this._logic.deleteGatewayById(correlationId, gatewayId, callback);
        });
    }
}
exports.GatewaysCommandSet = GatewaysCommandSet;
//# sourceMappingURL=GatewaysCommandSet.js.map