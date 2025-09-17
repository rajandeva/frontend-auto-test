import { Page } from '@playwright/test';
import { TestBase, test } from '../test';
import { DocSession } from '../utils/docSession';

export class Document360LoginPage extends TestBase {
    readonly page: Page;
    constructor(docSession: DocSession) {
        super(docSession);
        this.page = docSession.page;
    }

    #selectors = {
        txtEmail: '#emailOrSubdomain',
        txtPassword: '#password',
        btnLogin: '#login_button',
        loader: '.d360-logo-icon'
    };

    async goto() {
        await this.page.goto('/');
    }

    private async enterEmail(email: string) {
        await this.page.fill(this.#selectors.txtEmail, email);
    }

    private async enterPassword(password: string) {
        test.step('Fill password', async () => {
            await this.page.fill(this.#selectors.txtPassword, password);
            test.info().annotations.push({ type: 'sensitive', description: 'Password input was filled' });
        });
    }

    private async clickLogin() {
        await this.page.click(this.#selectors.btnLogin);
    }

    async login() {
        const email = process.env.DOC_LOGIN!;
        const password = process.env.DOC_PASSWORD!;
        await this.goto();
        await this.enterEmail(email);
        await this.clickLogin();
        await this.enterPassword(password);
        await this.clickLogin();
        await this.page.waitForLoadState('domcontentloaded');
        await this.logger.info('Login successful');
    }
}