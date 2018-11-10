const systems = [];

class System {
    constructor(name) {
        this.name = name;
        this.xhrs = [];
        this.onConnectSSEs = [];
        this.sses = [];

        systems.push(this);
    }

    addXHR(path, handlerCallback) {
        this.xhrs.push({
            path,
            handlerCallback
        });
    }

    addOnConnectSSE(eventName, generatorCallback) {
        this.onConnectSSEs.push({
            eventName,
            generatorCallback
        });
    }

    addSSE(eventName, delay, generatorCallback) {
        this.sses.push({
            eventName,
            delay,
            generatorCallback
        });
    }
}

module.exports = {
    systems,
    System
};