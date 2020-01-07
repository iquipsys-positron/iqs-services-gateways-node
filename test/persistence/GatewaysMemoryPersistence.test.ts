import { ConfigParams } from 'pip-services3-commons-node';

import { GatewaysMemoryPersistence } from '../../src/persistence/GatewaysMemoryPersistence';
import { GatewaysPersistenceFixture } from './GatewaysPersistenceFixture';

suite('GatewaysMemoryPersistence', ()=> {
    let persistence: GatewaysMemoryPersistence;
    let fixture: GatewaysPersistenceFixture;
    
    setup((done) => {
        persistence = new GatewaysMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new GatewaysPersistenceFixture(persistence);
        
        persistence.open(null, done);
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