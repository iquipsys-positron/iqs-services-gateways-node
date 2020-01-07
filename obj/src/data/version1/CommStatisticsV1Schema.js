"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class CommStatisticsV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('device_udi', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('init_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withOptionalProperty('up_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withOptionalProperty('up_packets', pip_services3_commons_node_2.TypeCode.Integer);
        this.withOptionalProperty('up_errors', pip_services3_commons_node_2.TypeCode.Integer);
        this.withOptionalProperty('down_time', pip_services3_commons_node_2.TypeCode.DateTime);
        this.withOptionalProperty('down_packets', pip_services3_commons_node_2.TypeCode.Integer);
        this.withOptionalProperty('down_errors', pip_services3_commons_node_2.TypeCode.Integer);
    }
}
exports.CommStatisticsV1Schema = CommStatisticsV1Schema;
//# sourceMappingURL=CommStatisticsV1Schema.js.map