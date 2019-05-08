import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import a11yAudit from 'ember-a11y-testing/test-support/audit';


module('Acceptance | accessibility', function(hooks) {
  setupApplicationTest(hooks);

  test('accessibility checks', async function(assert) {
    await visit('/freestyle');
    assert.equal(currentURL(), '/freestyle');
    await a11yAudit();
    assert.ok(true, 'no a11y errors found!');
  });
});
