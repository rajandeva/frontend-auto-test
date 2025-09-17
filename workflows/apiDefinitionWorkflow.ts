export interface UploadAPIDefinitionWorkFlow {
    performLogin(): Promise<void>;
    selectApiDocProject(): Promise<void>;
    uploadApiDefinition(): Promise<void>;
    fillBrandGuidelines(): Promise<void>;
    publishDocumentation(): Promise<void>;
}

export interface TrySamplePetstoreFlow {
    performLogin(): Promise<void>;
    selectApiDocProject(): Promise<void>;
    trySamplePetstore(): Promise<void>;
    publishDocumentation(): Promise<void>;
}