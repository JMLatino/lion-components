import { IsDate } from '@lion/ui/form-core.js';
import { LionInput } from '@lion/ui/input.js';
import { formatDate, LocalizeMixin, parseDate } from '@lion/ui/localize-no-side-effects.js';

/**
 * `LionInputDate` has a .modelValue of type Date. It parses, formats and validates based
 * on locale.
 *
 * @customElement lion-input-date
 */
export class LionInputDate extends LocalizeMixin(LionInput) {
  /** @type {any} */
  static get properties() {
    return {
      modelValue: Date,
    };
  }

  constructor() {
    super();
    /**
     * @param {string} value
     */
    this.parser = value => (value === '' ? undefined : parseDate(value));
    this.formatter = formatDate;
    this.defaultValidators.push(new IsDate());
    // Just explicitly make clear we shouldn't use type 'date'
    this.type = 'text';
  }

  /** @param {import('lit').PropertyValues } changedProperties */
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('locale')) {
      this._calculateValues({ source: null });
    }
  }

  /**
   * @param {Date} modelValue
   */
  // eslint-disable-next-line class-methods-use-this
  serializer(modelValue) {
    const isDate = new IsDate();
    if (isDate.execute(modelValue)) {
      return '';
    }
    // modelValue is localized, so we take the timezone offset in milliseconds and subtract it
    // before converting it to ISO string.
    const offset = modelValue.getTimezoneOffset() * 60000;
    return new Date(modelValue.getTime() - offset).toISOString().slice(0, 10);
  }

  /**
   * @param {string} serializedValue
   */
  // eslint-disable-next-line class-methods-use-this
  deserializer(serializedValue) {
    return new Date(serializedValue);
  }
}
