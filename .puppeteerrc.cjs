const { join } = require('path');
const { env } = require('process');
/**
 * @type {import("puppeteer").PuppeteerConfiguration}
 */
module.exports = {
    cacheDirectory: join(__dirname, env.PUPPETEER_CACHE_DIR)
};