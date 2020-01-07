"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const GatewaysServiceFactory_1 = require("../build/GatewaysServiceFactory");
class GatewaysLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("gateways", "IoT gateways function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-gateways', 'controller', 'default', '*', '*'));
        this._factories.add(new GatewaysServiceFactory_1.GatewaysServiceFactory());
    }
}
exports.GatewaysLambdaFunction = GatewaysLambdaFunction;
exports.handler = new GatewaysLambdaFunction().getHandler();
//# sourceMappingURL=GatewaysLambdaFunction.js.map