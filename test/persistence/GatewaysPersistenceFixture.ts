let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { GatewayV1 } from '../../src/data/version1/GatewayV1';

import { IGatewaysPersistence } from '../../src/persistence/IGatewaysPersistence';

let GATEWAY1: GatewayV1 = {
    id: '1',
    org_id: '1',
    udi: '111',
    model: 'MTCD',
    label: '3456',
    active: true
};
let GATEWAY2: GatewayV1 = {
    id: '2',
    org_id: '1',
    udi: '222',
    model: 'MTCD',
    label: '2334',
    active: true
};
let GATEWAY3: GatewayV1 = {
    id: '3',
    org_id: '2',
    udi: '333',
    model: 'MTDD',
    active: false
};

export class GatewaysPersistenceFixture {
    private _persistence: IGatewaysPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateGateways(done) {
        async.series([
        // Create one gateway
            (callback) => {
                this._persistence.create(
                    null,
                    GATEWAY1,
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.org_id, GATEWAY1.org_id);
                        assert.equal(gateway.model, GATEWAY1.model);
                        assert.equal(gateway.udi, GATEWAY1.udi);
                        assert.equal(gateway.label, GATEWAY1.label);

                        callback();
                    }
                );
            },
        // Create another gateway
            (callback) => {
                this._persistence.create(
                    null,
                    GATEWAY2,
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.org_id, GATEWAY2.org_id);
                        assert.equal(gateway.model, GATEWAY2.model);
                        assert.equal(gateway.udi, GATEWAY2.udi);
                        assert.equal(gateway.label, GATEWAY2.label);

                        callback();
                    }
                );
            },
        // Create yet another gateway
            (callback) => {
                this._persistence.create(
                    null,
                    GATEWAY3,
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.org_id, GATEWAY3.org_id);
                        assert.equal(gateway.model, GATEWAY3.model);
                        assert.equal(gateway.udi, GATEWAY3.udi);
                        assert.equal(gateway.active, GATEWAY3.active);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let gateway1: GatewayV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateGateways(callback);
            },
        // Get all gateways
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        gateway1 = page.data[0];

                        callback();
                    }
                );
            },
        // Get gateway by udi
            (callback) => {
                this._persistence.getOneByUdi(
                    null,
                    '111',
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal('1', gateway.org_id);
                        assert.equal('111', gateway.udi);

                        callback();
                    }
                );
            },
        // Update the gateway
            (callback) => {
                gateway1.label = 'Updated gateway 1';

                this._persistence.update(
                    null,
                    gateway1,
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isObject(gateway);
                        assert.equal(gateway.label, 'Updated gateway 1');
                        assert.equal(gateway.id, gateway1.id);

                        callback();
                    }
                );
            },
        // Delete gateway
            (callback) => {
                this._persistence.deleteById(
                    null,
                    gateway1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete gateway
            (callback) => {
                this._persistence.getOneById(
                    null,
                    gateway1.id,
                    (err, gateway) => {
                        assert.isNull(err);

                        assert.isNull(gateway || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create gateways
            (callback) => {
                this.testCreateGateways(callback);
            },
        // Get gateways filtered by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: '34'
                    }),
                    new PagingParams(),
                    (err, gateways) => {
                        assert.isNull(err);

                        assert.isObject(gateways);
                        assert.lengthOf(gateways.data, 2);

                        callback();
                    }
                );
            },
        // Get gateways except certain ids
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        org_id: '1'
                    }),
                    new PagingParams(),
                    (err, gateways) => {
                        assert.isNull(err);

                        assert.isObject(gateways);
                        assert.lengthOf(gateways.data, 2);

                        callback();
                    }
                );
            },
        // Get gateways filtered by status
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        active: true
                    }),
                    new PagingParams(),
                    (err, gateways) => {
                        assert.isNull(err);

                        assert.isObject(gateways);
                        assert.lengthOf(gateways.data, 2);

                        callback();
                    }
                );
            },
        ], done);
    }

}
