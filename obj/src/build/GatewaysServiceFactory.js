"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const GatewaysMongoDbPersistence_1 = require("../persistence/GatewaysMongoDbPersistence");
const GatewaysFilePersistence_1 = require("../persistence/GatewaysFilePersistence");
const GatewaysMemoryPersistence_1 = require("../persistence/GatewaysMemoryPersistence");
const GatewaysController_1 = require("../logic/GatewaysController");
const GatewaysHttpServiceV1_1 = require("../services/version1/GatewaysHttpServiceV1");
class GatewaysServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(GatewaysServiceFactory.MemoryPersistenceDescriptor, GatewaysMemoryPersistence_1.GatewaysMemoryPersistence);
        this.registerAsType(GatewaysServiceFactory.FilePersistenceDescriptor, GatewaysFilePersistence_1.GatewaysFilePersistence);
        this.registerAsType(GatewaysServiceFactory.MongoDbPersistenceDescriptor, GatewaysMongoDbPersistence_1.GatewaysMongoDbPersistence);
        this.registerAsType(GatewaysServiceFactory.ControllerDescriptor, GatewaysController_1.GatewaysController);
        this.registerAsType(GatewaysServiceFactory.HttpServiceDescriptor, GatewaysHttpServiceV1_1.GatewaysHttpServiceV1);
    }
}
exports.GatewaysServiceFactory = GatewaysServiceFactory;
GatewaysServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-gateways", "factory", "default", "default", "1.0");
GatewaysServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-gateways", "persistence", "memory", "*", "1.0");
GatewaysServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-gateways", "persistence", "file", "*", "1.0");
GatewaysServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-gateways", "persistence", "mongodb", "*", "1.0");
GatewaysServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-gateways", "controller", "default", "*", "1.0");
GatewaysServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-gateways", "service", "http", "*", "1.0");
//# sourceMappingURL=GatewaysServiceFactory.js.map