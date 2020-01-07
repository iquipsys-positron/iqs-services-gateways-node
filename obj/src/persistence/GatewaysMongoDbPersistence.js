"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_mongodb_node_1 = require("pip-services3-mongodb-node");
const UdiConverter_1 = require("../data/version1/UdiConverter");
class GatewaysMongoDbPersistence extends pip_services3_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('gateways');
        super.ensureIndex({ org_id: 1 });
        super.ensureIndex({ udi: 1 }, { unique: true });
        this._maxPageSize = 1000;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
            udi = UdiConverter_1.UdiConverter.fromString(udi);
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, { stats: 0 }, callback);
    }
    getOneByUdi(correlationId, udi, callback) {
        let criteria = {
            udi: udi,
            $or: [{ deleted: false }, { deleted: { $exists: false } }]
        };
        this._collection.findOne(criteria, (err, item) => {
            item = this.convertToPublic(item);
            if (item)
                this._logger.trace(correlationId, "Found gateway by %s", udi);
            else
                this._logger.trace(correlationId, "Cannot find gateway by %s", udi);
            callback(err, item);
        });
    }
}
exports.GatewaysMongoDbPersistence = GatewaysMongoDbPersistence;
//# sourceMappingURL=GatewaysMongoDbPersistence.js.map