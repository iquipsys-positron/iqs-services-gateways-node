import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { GatewayV1 } from '../data/version1/GatewayV1';
import { IGatewaysPersistence } from './IGatewaysPersistence';
export declare class GatewaysMongoDbPersistence extends IdentifiableMongoDbPersistence<GatewayV1, string> implements IGatewaysPersistence {
    constructor();
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<GatewayV1>) => void): void;
    getOneByUdi(correlationId: string, udi: string, callback: (err: any, item: GatewayV1) => void): void;
}
