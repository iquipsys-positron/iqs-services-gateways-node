import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { GatewaysMemoryPersistence } from './GatewaysMemoryPersistence';
import { GatewayV1 } from '../data/version1/GatewayV1';
export declare class GatewaysFilePersistence extends GatewaysMemoryPersistence {
    protected _persister: JsonFilePersister<GatewayV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
