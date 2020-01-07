import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class CommStatisticsV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('device_udi', TypeCode.String);
        this.withOptionalProperty('init_time', TypeCode.DateTime);
        this.withOptionalProperty('up_time', TypeCode.DateTime);
        this.withOptionalProperty('up_packets', TypeCode.Integer);
        this.withOptionalProperty('up_errors', TypeCode.Integer);
        this.withOptionalProperty('down_time', TypeCode.DateTime);
        this.withOptionalProperty('down_packets', TypeCode.Integer);
        this.withOptionalProperty('down_errors', TypeCode.Integer);
    }
}
