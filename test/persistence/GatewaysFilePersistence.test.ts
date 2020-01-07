import { ConfigParams } from 'pip-services3-commons-node';

import { GatewaysFilePersistence } from '../../src/persistence/GatewaysFilePersistence';
import { GatewaysPersistenceFixture } from './GatewaysPersistenceFixture';

suite('GatewaysFilePersistence', ()=> {
    let persistence: GatewaysFilePersistence;
    let fixture: GatewaysPersistenceFixture;
    
    setup((done) => {
        persistence = new GatewaysFilePersistence('./data/gateways.test.json');

        fixture = new GatewaysPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});