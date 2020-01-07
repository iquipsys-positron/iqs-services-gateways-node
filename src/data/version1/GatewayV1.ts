import { IStringIdentifiable } from 'pip-services3-commons-node';

import { CommStatisticsV1 } from './CommStatisticsV1';

export class GatewayV1 implements IStringIdentifiable {
    public id: string;
    public org_id: string;
    public model?: string;
    public version?: number;
    public udi: string;
    public label?: string;
    public create_time?: Date;
    public active?: boolean;
    public rec_time?: Date;
    public ping_time?: Date;
    public stats_time?: Date;
    public stats?: CommStatisticsV1[];
}