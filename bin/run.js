let GatewaysProcess = require('../obj/src/container/GatewaysProcess').GatewaysProcess;

try {
    new GatewaysProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
