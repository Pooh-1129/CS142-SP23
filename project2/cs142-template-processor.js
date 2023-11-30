'use strict';

function Cs142TemplateProcessor(template) {
    this.template = template;
}

Cs142TemplateProcessor.prototype.fillIn = function(dict) {
    let fills = this.template.slice();
    const matched = fills.match(/{{[^{]*}}/g);
    matched.forEach((tmp) => {
        const ans = tmp.slice();
        const property = ans.replace("{{", "").replace("}}", "");
        if (dict[property] !== undefined) {
            fills = fills.replace(ans, dict[property]);
        } else {
            fills = fills.replace(ans, "");
        }
    });
    return fills;
};
