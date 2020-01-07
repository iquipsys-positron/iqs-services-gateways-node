let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';

import { GatewayV1 } from '../data/version1/GatewayV1';
import { UdiConverter } from '../data/version1/UdiConverter';
import { IGatewaysPersistence } from './IGatewaysPersistence';

export class GatewaysMongoDbPersistence extends IdentifiableMongoDbPersistence<GatewayV1, string> implements IGatewaysPersistence {

    constructor() {
        super('gateways');
        super.ensureIndex({ org_id: 1 });
        super.ensureIndex({ udi: 1 }, { unique: true });
        this._maxPageSize = 1000;
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ label: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let orgId = filter.getAsNullableString('org_id');
        if (orgId != null)
            criteria.push({ org_id: orgId });

        let udi = filter.getAsNullableString('udi');
        if (udi != null) {
            udi = UdiConverter.fromString(udi);
            criteria.push({ udi: udi });
        }

        let model = filter.getAsNullableString('model');
        if (model != null)
            criteria.push({ model: model });

        let label = filter.getAsNullableString('label');
        if (label != null)
            criteria.push({ label: label });

        let active = filter.getAsNullableBoolean('active');
        if (active != null)
            criteria.push({ active: active });

        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<GatewayV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, { stats: 0 }, callback);
    }

    public getOneByUdi(correlationId: string, udi: string,
        callback: (err: any, item: GatewayV1) => void): void {
        
        let criteria = {
            udi: udi,
            $or: [ { deleted: false }, { deleted: { $exists: false } } ]
        }

        this._collection.findOne(criteria, (err, item) => {
            item = this.convertToPublic(item);

            if (item) this._logger.trace(correlationId, "Found gateway by %s", udi);
            else this._logger.trace(correlationId, "Cannot find gateway by %s", udi);

            callback(err, item);
        })
    }

}
