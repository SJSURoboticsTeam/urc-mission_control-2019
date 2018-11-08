export default function formatObject(obj) {
    let str = "{";
    let first = true;
    for (const key in obj) {
        const value = obj[key];
        if (value === undefined || value === null) {
            continue;
        }
        if (first) {
            first = false;
        } else {
            str += ",";
        }
        str += `${key}:${JSON.stringify(value)}`;
    }
    str += "}";
    return str;
}

function parseObject(str) {
    if (!str) {
        return;
    }

    // Strip braces.
    str = str.substr(1, str.length - 2);

    // Parse a list of properties separated by commas where key and value
    // have a colon between them.

    const obj = {};

    const properties = str.split(",");
    for (const property of properties) {
        let [key, value] = property.split(":");
        obj[key] = parseInt(value);
    }

    return obj;
}

