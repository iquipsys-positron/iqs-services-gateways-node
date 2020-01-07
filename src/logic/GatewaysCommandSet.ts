import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { GatewayV1 } from '../data/version1/GatewayV1';
import { GatewayV1Schema } from '../data/version1/GatewayV1Schema';
import { IGatewaysController } from './IGatewaysController';

export class GatewaysCommandSet extends CommandSet {
    private _logic: IGatewaysController;

    constructor(logic: IGatewaysController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetGatewaysCommand());
		this.addCommand(this.makeGetGatewayByIdCommand());
		this.addCommand(this.makeGetGatewayByUdiCommand());
		this.addCommand(this.makeGetOrCreateGatewayCommand());
		this.addCommand(this.makeCreateGatewayCommand());
		this.addCommand(this.makeUpdateGatewayCommand());
		this.addCommand(this.makeDeleteGatewayByIdCommand());
    }

	private makeGetGatewaysCommand(): ICommand {
		return new Command(
			"get_gateways",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getGateways(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetGatewayByIdCommand(): ICommand {
		return new Command(
			"get_gateway_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('gateway_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let gateway_id = args.getAsString("gateway_id");
                this._logic.getGatewayById(correlationId, gateway_id, callback);
            }
		);
	}

	private makeGetGatewayByUdiCommand(): ICommand {
		return new Command(
			"get_gateway_by_udi",
			new ObjectSchema(true)
				.withRequiredProperty('gateway_udi', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let gateway_udi = args.getAsString("gateway_udi");
                this._logic.getGatewayByUdi(correlationId, gateway_udi, callback);
            }
		);
	}

	private makeGetOrCreateGatewayCommand(): ICommand {
		return new Command(
			"get_or_create_gateway",
			new ObjectSchema(true)
				.withRequiredProperty('org_id', TypeCode.String)
				.withRequiredProperty('udi', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let org_id = args.getAsString("org_id");
                let udi = args.getAsString("udi");
                this._logic.getOrCreateGateway(correlationId, org_id, udi, callback);
            }
		);
	}

	private makeCreateGatewayCommand(): ICommand {
		return new Command(
			"create_gateway",
			new ObjectSchema(true)
				.withRequiredProperty('gateway', new GatewayV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let gateway = args.get("gateway");
                this._logic.createGateway(correlationId, gateway, callback);
            }
		);
	}

	private makeUpdateGatewayCommand(): ICommand {
		return new Command(
			"update_gateway",
			new ObjectSchema(true)
				.withRequiredProperty('gateway', new GatewayV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let gateway = args.get("gateway");
                this._logic.updateGateway(correlationId, gateway, callback);
            }
		);
	}
	
	private makeDeleteGatewayByIdCommand(): ICommand {
		return new Command(
			"delete_gateway_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('gateway_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let gatewayId = args.getAsNullableString("gateway_id");
                this._logic.deleteGatewayById(correlationId, gatewayId, callback);
			}
		);
	}

}