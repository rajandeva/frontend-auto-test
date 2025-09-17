import { DocHomePage } from "../pages/apiDocumentHomePage";
import { Document360LoginPage } from "../pages/document360LoginPage";
import { DocSession } from "../utils/docSession";
import { TrySamplePetstoreFlow, UploadAPIDefinitionWorkFlow } from "../workflows/apiDefinitionWorkflow";
import { SetupAPIDoc } from "../pages/setUpApiDocPage";

class UploadAPIDefinitionImpl implements UploadAPIDefinitionWorkFlow {
    constructor(private docSession: DocSession) {}

    async performLogin() {
        const loginPage = new Document360LoginPage(this.docSession);
        await loginPage.login();
    }

    async selectApiDocProject() {
        const docHomePage = new DocHomePage(this.docSession);
        await docHomePage.selectApiDocProject();
    }

    async uploadApiDefinition() {
        const setUpApiDocPage = new SetupAPIDoc(this.docSession);
        await setUpApiDocPage.uploadApiDefinition();
    }

    async fillBrandGuidelines() {
        const setUpApiDocPage = new SetupAPIDoc(this.docSession);
        await setUpApiDocPage.fillBrandGuidelines();
    }

    async publishDocumentation() {
        const setUpApiDocPage = new SetupAPIDoc(this.docSession);
        await setUpApiDocPage.publishDocumentation();
    }

}

class TrySamplePetstoreFlowImpl implements TrySamplePetstoreFlow {
    constructor(private docSession: DocSession) {}
   
    async performLogin() {
        const loginPage = new Document360LoginPage(this.docSession);
        await loginPage.login();
    }

    async selectApiDocProject() {
        const docHomePage = new DocHomePage(this.docSession);
        await docHomePage.selectApiDocProject();
    }

    async trySamplePetstore(): Promise<void> {
        const setUpApiDocPage = new SetupAPIDoc(this.docSession);
        await setUpApiDocPage.trySamplePetstoreFlow();
    }


    async publishDocumentation() {
        const setUpApiDocPage = new SetupAPIDoc(this.docSession);
        await setUpApiDocPage.publishDocumentation();
    }

}


export async function selectApiDocProject(docSession: DocSession): Promise<void> {
    const docHomePage = new DocHomePage(docSession);
    await docHomePage.selectApiDocProject();
    await docSession.page.waitForSelector('text=Welcome to your project', { timeout: 10000 });
    // await docSession.page.waitForLoadState('domcontentloaded');
}

export async function uploadApiDefinitionWorkflow(docSession: DocSession): Promise<void> {
    const uploadApiDefinitionInstance = new UploadAPIDefinitionImpl(docSession);
    await uploadApiDefinitionInstance.performLogin();
    await uploadApiDefinitionInstance.selectApiDocProject();
    await uploadApiDefinitionInstance.uploadApiDefinition();
    await uploadApiDefinitionInstance.fillBrandGuidelines();
    await uploadApiDefinitionInstance.publishDocumentation();
}


export async function trySamplePetstoreFlow(docSession: DocSession): Promise<void> {
    const trySamplePetstoreInstance = new TrySamplePetstoreFlowImpl(docSession);
    await trySamplePetstoreInstance.performLogin();
    await trySamplePetstoreInstance.selectApiDocProject();
    await trySamplePetstoreInstance.trySamplePetstore();
    await trySamplePetstoreInstance.publishDocumentation();
}
