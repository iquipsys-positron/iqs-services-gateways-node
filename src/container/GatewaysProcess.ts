import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { GatewaysServiceFactory } from '../build/GatewaysServiceFactory';

export class GatewaysProcess extends ProcessContainer {

    public constructor() {
        super("gateways", "IoT gateways microservice");
        this._factories.add(new GatewaysServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
