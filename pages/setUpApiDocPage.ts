import { Page, ElementHandle, expect } from '@playwright/test';
import { TestBase } from '../test';
import { DocSession } from '../utils/docSession';
import { uploadFile } from '../utils/docUtilities';

export class SetupAPIDoc extends TestBase {
    readonly page: Page;

    constructor(docSession: DocSession) {
        super(docSession);
        this.page = docSession.page;
    }

    #selectors = {
        rBtnUploadAPIDefinition: '[name="ApiSourceSelection"]',
        uploadApi: '[ddsid="add-api-upload"] input',
        fileUploaded: '[class="dds-chip dds-chip-file-upload"]',
        nextButton: '[class="btn btn-primary"]',
        validationAlert: '[class="dds-alert dds-alert-info"]',
        websiteUrlInput: '[formcontrolname="siteUrl"]',
        projectNameInput: '[formcontrolname="projectName"]',
        languageVersion: '[id="languageVersion"]',
        brandLogo: 'input:has(+ a.text-info)',
        btnPublish: '[id="btn_documentation_publish"]',
        publishConfirmation: '[class="confirmation-popup"]',
        btnYes: 'button:has-text("Yes")',
        radBtnUploadApiSelection: (index: number): string => `input[id="Radio${index}"]`
    };

    private async selectUploadApiDefinition() {
        await this.page.click(this.#selectors.radBtnUploadApiSelection(0), {timeout: 5000});
    }

     private async selectSamplePetstore() {
        await this.page.click(this.#selectors.radBtnUploadApiSelection(2), {timeout: 5000});
    }

    private async clickOnNextButton() {
        await this.page.click(this.#selectors.nextButton, {timeout: 5000});
    }

    private async checkForValidationError(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
        return await this.page.waitForSelector(this.#selectors.validationAlert, { timeout: 5000 } );
    }

    private async uploadFile() {
        const filePath = './testData/Public_API_Collection.json';
        await this.page.setInputFiles(this.#selectors.uploadApi, filePath);
    }

    private async isFileUploaded(): Promise<ElementHandle<SVGElement | HTMLElement> | null> {
        return await this.page.waitForSelector(this.#selectors.fileUploaded, { timeout: 5000 } );
    }

    async enterWebsiteUrl() {
        await this.page.locator(this.#selectors.websiteUrlInput).clear();
        await this.page.fill(this.#selectors.websiteUrlInput, 'https://document360.com');
    }

    private async enterProjectName() {
        const randomString = Math.random().toString(36).substring(2, 8);
        const projectName = `Document360-API${randomString}`;
        await this.page.fill(this.#selectors.projectNameInput, projectName);
    }
    
    private async checkForPrivateAccessByDefault(){
        await expect(this.page.locator(this.#selectors.validationAlert)).toBeVisible({ timeout: 10000 });
        await expect(this.page.locator(this.#selectors.validationAlert)).toContainText('Private access mode by default.');
    }

    private async waitForProgressToComplete() {
        await this.page.getByRole('progressbar').waitFor({ state: 'hidden', timeout: 20000 });
    }

    async uploadApiDefinition() {
        await this.logger.info('Uploading API definition...');
        const filePath = './testData/Public_API_Collection.json';
        await this.selectUploadApiDefinition();
        await uploadFile(this.page, filePath, this.#selectors.uploadApi);
        await this.clickOnNextButton();
        if (await this.checkForValidationError()) {
            await this.clickOnNextButton();
        }
        await this.isFileUploaded();
        await this.clickOnNextButton();
        const progressbar = await this.page.getByRole('progressbar').isVisible({ timeout: 20000 }).catch(() => false);
        if (progressbar) {
            await this.waitForProgressToComplete();
        }
        await this.logger.info('API definition uploaded successfully');
    }

    private async uploadBrandLogo() {
        const filePath = './testData/testing_logo.png';
        await uploadFile(this.page, filePath, this.#selectors.brandLogo);
    }

    async fillBrandGuidelines() {
        await this.logger.info('Filling brand guidelines...');
        await this.enterProjectName();
        // await this.uploadBrandLogo();
        await this.clickOnNextButton();
        await this.checkForPrivateAccessByDefault();
        await this.waitForProgressToComplete();
        await this.clickOnNextButton();
        await this.logger.info('Brand guidelines filled successfully');
    }

    async publishDocumentation() {
        await this.logger.info('Publishing API Documentation...');
        await this.page.click(this.#selectors.btnPublish);
        await this.page.waitForSelector(this.#selectors.publishConfirmation, { timeout: 5000 });
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.waitForLoadState('domcontentloaded');
        // Wait for the publication process to complete
        await this.page.waitForSelector('text=Article Published', { timeout: 10000 });
        await this.logger.info('API Documentation published successfully');
    }

    async trySamplePetstoreFlow() {
        await this.logger.info('Trying Sample Petstore flow...');
        await this.selectSamplePetstore();
        await this.clickOnNextButton();
        await this.enterWebsiteUrl();
        await this.clickOnNextButton();
        await this.clickOnNextButton();
        await this.checkForPrivateAccessByDefault();
        await this.clickOnNextButton();
        await this.waitForProgressToComplete();
        await this.logger.info('Sample Petstore flow completed successfully');
    }

}