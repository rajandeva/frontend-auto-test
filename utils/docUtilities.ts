import { Page } from '@playwright/test';


export async function uploadFile(page: Page, filePath: string, selector: string): Promise<void> {
    await page.setInputFiles(selector, filePath);
}
