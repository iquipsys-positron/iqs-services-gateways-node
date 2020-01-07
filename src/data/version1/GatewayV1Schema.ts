import { ObjectSchema } from 'pip-services3-commons-node';
import { ArraySchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { CommStatisticsV1Schema } from './CommStatisticsV1Schema';

export class GatewayV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('org_id', TypeCode.String);
        this.withOptionalProperty('model', TypeCode.String);
        this.withOptionalProperty('version', TypeCode.Integer);
        this.withRequiredProperty('udi', TypeCode.String);
        this.withOptionalProperty('label', TypeCode.String);
        this.withOptionalProperty('create_time', TypeCode.DateTime);
        this.withOptionalProperty('rec_time', TypeCode.DateTime);
        this.withOptionalProperty('ping_time', TypeCode.DateTime);
        this.withOptionalProperty('stats_time', TypeCode.DateTime);
        this.withOptionalProperty('stats', new ArraySchema(new CommStatisticsV1Schema));
        this.withOptionalProperty('active', TypeCode.Boolean);
    }
}
