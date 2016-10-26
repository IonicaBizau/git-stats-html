"use strict";

const ajs = require("ajs")
    , ghLegend = require("github-calendar-legend")
    , Daty = require("daty")
    , mapO = require("map-o")
    ;

/**
 * gitStatsHtml
 * Turn git-stats result into HTML output.
 *
 * @name gitStatsHtml
 * @function
 * @param {Object} json The JSON returned by `git-stats --raw`
 * @param {Function} cb The callback function.
 */
module.exports = function gitStatsHtml (json, cb) {
    json.theme = {
        levels: ghLegend
    };
    json.start = new Daty(json.start);
    json.end = new Daty(json.end);
    json.months = [];
    let lastMonth = null;
    json.levels.forEach((c, weekIndex) => {
        c.forEach(c => {
            if (c.month === lastMonth) { return; }
            json.months.push({
                name: c.month
              , index: weekIndex
              , left: 13 + 12 * weekIndex
            });
            lastMonth = c.month;
        });
    });
    if (json.months[1].index - json.months[0].index < 4) {
        json.months.splice(0, 1);
    }
    mapO(json.currentStreak, value => new Daty(value));
    mapO(json.longestStreak, value => new Daty(value));
    ajs.renderFile(`${__dirname}/template.html`, json, cb);
};
