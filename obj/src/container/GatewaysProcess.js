"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const GatewaysServiceFactory_1 = require("../build/GatewaysServiceFactory");
class GatewaysProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("gateways", "IoT gateways microservice");
        this._factories.add(new GatewaysServiceFactory_1.GatewaysServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.GatewaysProcess = GatewaysProcess;
//# sourceMappingURL=GatewaysProcess.js.map