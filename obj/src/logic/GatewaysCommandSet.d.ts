import { CommandSet } from 'pip-services3-commons-node';
import { IGatewaysController } from './IGatewaysController';
export declare class GatewaysCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IGatewaysController);
    private makeGetGatewaysCommand;
    private makeGetGatewayByIdCommand;
    private makeGetGatewayByUdiCommand;
    private makeGetOrCreateGatewayCommand;
    private makeCreateGatewayCommand;
    private makeUpdateGatewayCommand;
    private makeDeleteGatewayByIdCommand;
}
