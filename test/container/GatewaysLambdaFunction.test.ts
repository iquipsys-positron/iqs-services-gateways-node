let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { GatewayV1 } from '../../src/data/version1/GatewayV1';
import { GatewaysMemoryPersistence } from '../../src/persistence/GatewaysMemoryPersistence';
import { GatewaysController } from '../../src/logic/GatewaysController';
import { GatewaysLambdaFunction } from '../../src/container/GatewaysLambdaFunction';

let GATEWAY1: GatewayV1 = {
    id: '1',
    org_id: '1',
    model: 'MTCD',
    udi: '111',
    label: '3456',
    active: true
};
let GATEWAY2: GatewayV1 = {
    id: '2',
    org_id: '1',
    model: 'MTCD',
    udi: '222',
    label: '2334',
    active: true
};

suite('GatewaysLambdaFunction', ()=> {
    let lambda: GatewaysLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-gateways:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-gateways:controller:default:default:1.0'
        );

        lambda = new GatewaysLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var gateway1, gateway2;

        async.series([
        // Create one gateway
            (callback) => {
                lambda.act(
                    {
                        role: 'gateways',
                        cmd: 'create_gateway',
                        gateway: GATEWAY1
                    },
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.org_id, GATEWAY1.org_id);
                        assert.equal(gateway.model, GATEWAY1.model);
                        assert.equal(gateway.label, GATEWAY1.label);

                        gateway1 = gateway;

                        callback();
                    }
                );
            },
        // Create another gateway
            (callback) => {
                lambda.act(
                    {
                        role: 'gateways',
                        cmd: 'create_gateway',
                        gateway: GATEWAY2
                    },
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.org_id, GATEWAY2.org_id);
                        assert.equal(gateway.model, GATEWAY2.model);
                        assert.equal(gateway.label, GATEWAY2.label);

                        gateway2 = gateway;

                        callback();
                    }
                );
            },
        // Get all gateways
            (callback) => {
                lambda.act(
                    {
                        role: 'gateways',
                        cmd: 'get_gateways' 
                    },
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the gateway
            (callback) => {
                gateway1.label = 'Updated gateway 1';

                lambda.act(
                    {
                        role: 'gateways',
                        cmd: 'update_gateway',
                        gateway: gateway1
                    },
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.label, 'Updated gateway 1');
                        assert.equal(gateway.active, GATEWAY1.active);

                        gateway1 = gateway;

                        callback();
                    }
                );
            },
        // Delete gateway
            (callback) => {
                lambda.act(
                    {
                        role: 'gateways',
                        cmd: 'delete_gateway_by_id',
                        gateway_id: gateway1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete gateway
            (callback) => {
                lambda.act(
                    {
                        role: 'gateways',
                        cmd: 'get_gateway_by_id',
                        gateway_id: gateway1.id
                    },
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isNull(gateway);

                        callback();
                    }
                );
            }
        ], done);
    });
});