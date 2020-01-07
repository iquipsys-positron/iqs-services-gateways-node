import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { GatewaysServiceFactory } from '../build/GatewaysServiceFactory';

export class GatewaysLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("gateways", "IoT gateways function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-gateways', 'controller', 'default', '*', '*'));
        this._factories.add(new GatewaysServiceFactory());
    }
}

export const handler = new GatewaysLambdaFunction().getHandler();