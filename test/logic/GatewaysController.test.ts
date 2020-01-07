let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { GatewayV1 } from '../../src/data/version1/GatewayV1';
import { GatewaysMemoryPersistence } from '../../src/persistence/GatewaysMemoryPersistence';
import { GatewaysController } from '../../src/logic/GatewaysController';
import { GatewaysHttpServiceV1 } from '../../src/services/version1/GatewaysHttpServiceV1';

let GATEWAY1: GatewayV1 = {
    id: '1',
    org_id: '1',
    model: 'smartphone',
    udi: '111',
    label: '3456',
    active: true
};
let GATEWAY2: GatewayV1 = {
    id: '2',
    org_id: '1',
    model: 'smartphone',
    udi: '222',
    label: '2334',
    active: true
};

suite('GatewaysController', ()=> {    
    let persistence: GatewaysMemoryPersistence;
    let controller: GatewaysController;

    suiteSetup((done) => {
        persistence = new GatewaysMemoryPersistence();
        controller = new GatewaysController();

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-gateways', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-gateways', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);

        persistence.open(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    
    test('CRUD Operations', (done) => {
        let gateway1, gateway2: GatewayV1;

        async.series([
        // Create one gateway
            (callback) => {
                controller.createGateway(
                    null, GATEWAY1,
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
                controller.createGateway(
                    null, GATEWAY2,
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
                controller.getGateways(
                    null, new FilterParams(), new PagingParams(),
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

                controller.updateGateway(
                    null, gateway1,
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
        // Get created gateway by udi
            (callback) => {
                controller.getGatewayByUdi(
                    null, GATEWAY1.udi,
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.udi, GATEWAY1.udi);

                        callback();
                    }
                );
            },
        // Delete gateway
            (callback) => {
                controller.deleteGatewayById(
                    null, gateway1.id,
                    (err, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete gateway
            (callback) => {
                controller.getGatewayById(
                    null, gateway1.id,
                    (err, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });

    test('Get or create gateway', (done) => {
        let gateway1: GatewayV1;

        async.series([
        // Create one gateway
            (callback) => {
                controller.getOrCreateGateway(
                    null, '1', 'ABC',
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);

                        gateway1 = gateway;

                        callback();
                    }
                );
            },
        // Get created gateway
            (callback) => {
                controller.getGatewayById(
                    null, gateway1.id,
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.org_id, '1');
                        assert.equal(gateway.udi, 'abc');
                        assert.equal(gateway.id, gateway1.id);

                        callback();
                    }
                );
            }
        ], done);
    });

});