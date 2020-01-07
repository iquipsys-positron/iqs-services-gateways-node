import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class GatewaysHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/gateways');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-gateways', 'controller', 'default', '*', '1.0'));
    }
}