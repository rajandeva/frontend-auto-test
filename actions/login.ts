import { Document360LoginPage } from "../pages/document360LoginPage";
import { DocSession } from "../utils/docSession";

class Login {
    constructor(private docSession: DocSession) {}

    async performLogin() {
        const loginPage = new Document360LoginPage(this.docSession);
        await loginPage.login();
    }
}


export async function setupDocLogin(docSession: DocSession): Promise<void> {
    const loginInstance = new Login(docSession);
    await loginInstance.performLogin();
}