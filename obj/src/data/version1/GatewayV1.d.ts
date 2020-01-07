import { IStringIdentifiable } from 'pip-services3-commons-node';
import { CommStatisticsV1 } from './CommStatisticsV1';
export declare class GatewayV1 implements IStringIdentifiable {
    id: string;
    org_id: string;
    model?: string;
    version?: number;
    udi: string;
    label?: string;
    create_time?: Date;
    active?: boolean;
    rec_time?: Date;
    ping_time?: Date;
    stats_time?: Date;
    stats?: CommStatisticsV1[];
}
