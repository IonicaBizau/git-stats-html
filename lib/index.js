"use strict";

const ajs = require("ajs")
    , ghLegend = require("github-calendar-legend")
    ;

/**
 * gitStatsHtml
 * Turn git-stats result into HTML output.
 *
 * @name gitStatsHtml
 * @function
 * @param {Number} a Param descrpition.
 * @param {Number} b Param descrpition.
 * @return {Number} Return description.
 */
module.exports = function gitStatsHtml (json, cb) {
    json.theme = {
        levels: ghLegend
    };
    ajs.renderFile(`${__dirname}/template.html`, json, cb);
};
