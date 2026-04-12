import {defineConfig,devices, expect} from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = {
    testDir : './tests',
    timeout: 40*1000,
    expect:{
        timeout: 5000
    },
    reporter:'html',
    use:{
        browserName: 'chromium',
        headless: true,
        trace:'on',
        screenshot:'only-on-failure',
    }

};
module.exports = config;