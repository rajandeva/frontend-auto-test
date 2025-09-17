import { PlaywrightLogger } from "../fixtures/logger";
import { DocSession } from "../utils/docSession";
import { DocFixtures } from "../utils/type";
import {test as  base } from "@playwright/test";

export class TestBase {
    protected logger: PlaywrightLogger
    protected docSession: DocSession

    constructor(docSession: DocSession) {
        this.logger = new PlaywrightLogger();
        this.docSession = docSession;
    }
}

export const test = base.extend<DocFixtures>({
    docSession: async ({ browser, page }, use) => {
        const docSession = new DocSession(browser, page);
        await use(docSession);
    }
});