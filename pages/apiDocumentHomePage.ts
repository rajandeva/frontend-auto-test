import { Page } from '@playwright/test';
import { TestBase } from '../test';
import { DocSession } from '../utils/docSession';

export class DocHomePage extends TestBase {
    readonly page: Page;

    constructor(docSession: DocSession) {
        super(docSession);
        this.page = docSession.page;
    }

    #selectors = {
        newProjectButton: '#btn_new_project',
        apiDocProject: '//button[contains(text(),"Get started") and parent::div/div/div[contains(text(), "API documentation")]]'
    }

    private async clickOnNewProject() {
        await this.page.click(this.#selectors.newProjectButton);
    }

    private async clickOnApiDocProject() {
        await this.page.click(this.#selectors.apiDocProject, { timeout: 10000 });
    }

    async selectApiDocProject() {
        await this.clickOnNewProject();
        await this.clickOnApiDocProject();
        await this.page.waitForLoadState('domcontentloaded');
    }
    
}