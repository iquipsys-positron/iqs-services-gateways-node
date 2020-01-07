"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class GatewaysHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/gateways');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-gateways', 'controller', 'default', '*', '1.0'));
    }
}
exports.GatewaysHttpServiceV1 = GatewaysHttpServiceV1;
//# sourceMappingURL=GatewaysHttpServiceV1.js.map