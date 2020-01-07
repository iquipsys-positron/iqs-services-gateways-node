let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { GatewayV1 } from '../../../src/data/version1/GatewayV1';
import { GatewaysMemoryPersistence } from '../../../src/persistence/GatewaysMemoryPersistence';
import { GatewaysController } from '../../../src/logic/GatewaysController';
import { GatewaysHttpServiceV1 } from '../../../src/services/version1/GatewaysHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('GatewaysHttpServiceV1', ()=> {
    let service: GatewaysHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new GatewaysMemoryPersistence();
        let controller = new GatewaysController();

        service = new GatewaysHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-gateways', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-gateways', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-gateways', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let gateway1, gateway2;

        async.series([
        // Create one gateway
            (callback) => {
                rest.post('/v1/gateways/create_gateway',
                    {
                        gateway: GATEWAY1
                    },
                    (err, req, res, gateway) => {
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
                rest.post('/v1/gateways/create_gateway', 
                    {
                        gateway: GATEWAY2
                    },
                    (err, req, res, gateway) => {
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
                rest.post('/v1/gateways/get_gateways',
                    {},
                    (err, req, res, page) => {
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

                rest.post('/v1/gateways/update_gateway',
                    { 
                        gateway: gateway1
                    },
                    (err, req, res, gateway) => {
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
                rest.post('/v1/gateways/delete_gateway_by_id',
                    {
                        gateway_id: gateway1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete gateway
            (callback) => {
                rest.post('/v1/gateways/get_gateway_by_id',
                    {
                        gateway_id: gateway1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});