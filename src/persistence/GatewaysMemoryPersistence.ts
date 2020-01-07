let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';

import { GatewayV1 } from '../data/version1/GatewayV1';
import { UdiConverter } from '../data/version1/UdiConverter';
import { IGatewaysPersistence } from './IGatewaysPersistence';

export class GatewaysMemoryPersistence 
    extends IdentifiableMemoryPersistence<GatewayV1, string> 
    implements IGatewaysPersistence {

    constructor() {
        super();
        this._maxPageSize = 1000;
    }

    private matchString(value: string, search: string): boolean {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }

    private matchSearch(item: GatewayV1, search: string): boolean {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.label, search))
            return true;
        return false;
    }

    private contains(array1, array2) {
        if (array1 == null || array2 == null) return false;
        
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1]) 
                    return true;
        }
        
        return false;
    }
    
    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();
        
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let org_id = filter.getAsNullableString('org_id');
        let udi = filter.getAsNullableString('udi');
        let model = filter.getAsNullableString('model');
        let label = filter.getAsNullableString('label');
        let active = filter.getAsNullableBoolean('active');

        if (udi)
            udi = UdiConverter.fromString(udi);

        return (item) => {
            if (id && item.id != id) 
                return false;
            if (org_id && item.org_id != org_id) 
                return false;
            if (label && item.label != label) 
                return false;
            if (udi && item.udi != udi) 
                return false;
            if (model && item.model != model) 
                return false;
            if (active && item.active != active) 
                return false;
            if (search && !this.matchSearch(item, search)) 
                return false;
            return true; 
        };
    }

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<GatewayV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

    public getOneByUdi(correlationId: string, udi: string,
        callback: (err: any, item: GatewayV1) => void): void {
        
        let item = _.find(this._items, (item) => item.udi == udi && !item.deleted);

        if (item) this._logger.trace(correlationId, "Found gateway by %s", udi);
        else this._logger.trace(correlationId, "Cannot find gateway by %s", udi);

        callback(null, item);
    }

}
