import TextField from './text-field';
import { inject as service } from '@ember/service';

const PHONE_REGEX = /^((([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+)*$/;

export default TextField.extend({
  phoneInput: service(),
  classNames: ['cs-component-phone-number-field'],
  attributeBindings: ['dataTestName:data-test-cs-component-phone-number-field'],
  dataTestName: true,
  label: 'Phone Number',
  inputComponent: 'phone-number-field/input',
  isComponentLibraryLoaded: false,

  init() {
    this._super(...arguments);
    this.phoneInput.load().then(() => {
      this.set('isComponentLibraryLoaded', true);
    });
  },

  actions: {
    handleInput(ev) {
      let value = ev.target.value;
      let errorMessage = ev.target.validationMessage;

      this.set('value', value);

      if (!value && !this.required) {
        this.set('invalid', false);
        return this.set('validationMessage', '');
      }

      if (!PHONE_REGEX.test(value)) {
        this.set('invalid', true);
        return this.set('validationMessage', 'Please enter a valid phone number');
      }

      if (!errorMessage) {
        this.set('invalid', false);
        return this.set('validationMessage', 'Thank you.');
      }
    }
  }
});
