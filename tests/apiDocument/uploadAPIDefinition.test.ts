import { uploadApiDefinitionWorkflow } from '../../actions/apiDoc';
import { test } from '../../test'

test.describe('Upload API Definition Flow', () => {

  test('Document360 Login', { tag: ['@upload-api-definition'] }, async ({ docSession }) => {
    test.setTimeout(60000);
    await uploadApiDefinitionWorkflow(docSession);
  });

});
