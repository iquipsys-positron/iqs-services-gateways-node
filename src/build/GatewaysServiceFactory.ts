import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { GatewaysMongoDbPersistence } from '../persistence/GatewaysMongoDbPersistence';
import { GatewaysFilePersistence } from '../persistence/GatewaysFilePersistence';
import { GatewaysMemoryPersistence } from '../persistence/GatewaysMemoryPersistence';
import { GatewaysController } from '../logic/GatewaysController';
import { GatewaysHttpServiceV1 } from '../services/version1/GatewaysHttpServiceV1';

export class GatewaysServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-gateways", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-gateways", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-gateways", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-gateways", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-gateways", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-gateways", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(GatewaysServiceFactory.MemoryPersistenceDescriptor, GatewaysMemoryPersistence);
		this.registerAsType(GatewaysServiceFactory.FilePersistenceDescriptor, GatewaysFilePersistence);
		this.registerAsType(GatewaysServiceFactory.MongoDbPersistenceDescriptor, GatewaysMongoDbPersistence);
		this.registerAsType(GatewaysServiceFactory.ControllerDescriptor, GatewaysController);
		this.registerAsType(GatewaysServiceFactory.HttpServiceDescriptor, GatewaysHttpServiceV1);
	}
	
}
