const { join } = require('path');
/**
 * @type {import("puppeteer").PuppeteerConfiguration}
 */
module.exports = {
    cacheDirectory: join(__dirname, 'node_modules', '.cache', 'puppeteer')
};