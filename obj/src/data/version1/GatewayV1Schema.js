"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const CommStatisticsV1Schema_1 = require("./CommStatisticsV1Schema");
class GatewayV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_3.TypeCode.String);
        this.withRequiredProperty('org_id', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('model', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('version', pip_services3_commons_node_3.TypeCode.Integer);
        this.withRequiredProperty('udi', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('label', pip_services3_commons_node_3.TypeCode.String);
        this.withOptionalProperty('create_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('rec_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('ping_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('stats_time', pip_services3_commons_node_3.TypeCode.DateTime);
        this.withOptionalProperty('stats', new pip_services3_commons_node_2.ArraySchema(new CommStatisticsV1Schema_1.CommStatisticsV1Schema));
        this.withOptionalProperty('active', pip_services3_commons_node_3.TypeCode.Boolean);
    }
}
exports.GatewayV1Schema = GatewayV1Schema;
//# sourceMappingURL=GatewayV1Schema.js.map