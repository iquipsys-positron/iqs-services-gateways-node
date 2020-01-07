"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_data_node_1 = require("pip-services3-data-node");
const UdiConverter_1 = require("../data/version1/UdiConverter");
class GatewaysMemoryPersistence extends pip_services3_data_node_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
        this._maxPageSize = 1000;
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.id, search))
            return true;
        if (this.matchString(item.label, search))
            return true;
        return false;
    }
    contains(array1, array2) {
        if (array1 == null || array2 == null)
            return false;
        for (let i1 = 0; i1 < array1.length; i1++) {
            for (let i2 = 0; i2 < array2.length; i2++)
                if (array1[i1] == array2[i1])
                    return true;
        }
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let org_id = filter.getAsNullableString('org_id');
        let udi = filter.getAsNullableString('udi');
        let model = filter.getAsNullableString('model');
        let label = filter.getAsNullableString('label');
        let active = filter.getAsNullableBoolean('active');
        if (udi)
            udi = UdiConverter_1.UdiConverter.fromString(udi);
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
    getOneByUdi(correlationId, udi, callback) {
        let item = _.find(this._items, (item) => item.udi == udi && !item.deleted);
        if (item)
            this._logger.trace(correlationId, "Found gateway by %s", udi);
        else
            this._logger.trace(correlationId, "Cannot find gateway by %s", udi);
        callback(null, item);
    }
}
exports.GatewaysMemoryPersistence = GatewaysMemoryPersistence;
//# sourceMappingURL=GatewaysMemoryPersistence.js.map