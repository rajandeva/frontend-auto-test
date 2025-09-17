import { trySamplePetstoreFlow } from '../../actions/apiDoc';
import { test } from '../../test'

test.describe('Try Sample Petstore Flow', () => {

  test('Try Sample Petstore', { tag: ['@try-sample-petstore'] }, async ({ docSession }) => {
    test.setTimeout(60000);
    await trySamplePetstoreFlow(docSession);
  });

});
