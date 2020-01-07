import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { GatewayV1 } from '../data/version1/GatewayV1';
import { IGatewaysPersistence } from './IGatewaysPersistence';
export declare class GatewaysMemoryPersistence extends IdentifiableMemoryPersistence<GatewayV1, string> implements IGatewaysPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<GatewayV1>) => void): void;
    getOneByUdi(correlationId: string, udi: string, callback: (err: any, item: GatewayV1) => void): void;
}
