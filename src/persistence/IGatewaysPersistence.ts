import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { GatewayV1 } from '../data/version1/GatewayV1';

export interface IGatewaysPersistence extends IGetter<GatewayV1, string>, IWriter<GatewayV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<GatewayV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: GatewayV1) => void): void;

    getOneByUdi(correlationId: string, udi: string, 
        callback: (err: any, items: GatewayV1) => void): void;

    create(correlationId: string, item: GatewayV1, 
        callback: (err: any, item: GatewayV1) => void): void;

    update(correlationId: string, item: GatewayV1, 
        callback: (err: any, item: GatewayV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: GatewayV1) => void): void;
}
