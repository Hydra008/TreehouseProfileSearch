var fs = require("fs");

function mergeValues(values, content) {
    for(var key in values) {
        content = content.replace(`{{${key}}}`, values[key]);
    }
    return content;
}

function views(templateName, values, reponse) {

    let fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding: "utf8"});
    fileContents = mergeValues(values, fileContents);
    reponse.write(fileContents);
}

module.exports.view = views;