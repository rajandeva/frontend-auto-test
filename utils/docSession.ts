import { Browser, Page } from "@playwright/test";

export class DocSession {
    readonly browser: Browser;
    readonly page: Page;

    constructor(browser: Browser, page: Page) {
        this.browser = browser;
        this.page = page;
    }
}