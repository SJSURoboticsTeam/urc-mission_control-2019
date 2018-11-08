const express = require("express");
const fs = require("fs");
const bodyparser = require("simple-bodyparser");
const SseStream = require("ssestream");

// Run all the JS files in the "systems/" directory here.
for (const file of fs.readdirSync("./systems/")) {
    require(`./systems/${file}`);
}

const {systems} = require("./system");


// Given a string containing the JSON-like format of an XHR body, produce an
// Object holding the properties the body describes.
function parseXHRBody(body) {
    if (!body) {
        return;
    }

    // Strip braces.
    body = body.substr(1, body.length - 2);

    // Parse a list of properties separated by commas where key and value
    // have a colon between them.

    const obj = {};

    const properties = body.split(",");
    for (const property of properties) {
        let [key, value] = property.split(":");
        obj[key] = parseInt(value);
    }

    return obj;
}


// Given an Object, produce a JSON-like string that ESP32 controllers emit.
function formatSSE(data) {
    if (typeof data === "object") {
        let str = "{";
        let first = true;
        for (const key in data) {
            const value = data[key];
            if (first) {
                first = false;
            } else {
                str += ",";
            }
            str += `${key}:${JSON.stringify(value)}`;
        }
        str += "}";
        return str;
    } else {
        return data;
    }
}


function makeSystemServer(system, port) {
    const app = express();
    app.use(bodyparser());

    for (const xhr of system.xhrs) {
        app.post(xhr.path, (req, res) => {
            req.body = parseXHRBody(req.body);
            res.set("Access-Control-Allow-Origin", "*");
            xhr.handlerCallback(req, res);
        });
    }

    app.get("/sse", (req, res) => {
        console.log(`SSE connected to ${system.name}`);
        res.set("Access-Control-Allow-Origin", "*");

        const sseStream = new SseStream(req);
        sseStream.pipe(res);

        for (const sse of system.onConnectSSEs) {
            sseStream.write({
                event: sse.eventName,
                data: formatSSE(sse.generatorCallback())
            });
        }

        const intervals = [];
        for (const sse of system.sses) {
            const interval = setInterval(() => {
                sseStream.write({
                    event: sse.eventName,
                    data: formatSSE(sse.generatorCallback())
                });
            }, sse.delay);
            intervals.push(interval);
        }

        res.on("close", () => {
            console.log(`SSE disconnected from ${system.name}`);
            for (const interval of intervals) {
                clearInterval(interval);
            }
            sseStream.unpipe(res);
        });
    });

    app.listen(port, (err) => {
        if (err) {
            throw err;
        }
        console.log(`${system.name} server at http://localhost:${port}`);
    });
}


let port = 5000;

// Create one express.js server for each system. This way our XHRs won"t
// overlap even if they have the same paths.
for (const system of systems) {
    makeSystemServer(system, port);
    port++;
}
