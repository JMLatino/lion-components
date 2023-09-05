import { runInputTelSuite } from '@lion/ui/input-tel-test-suites.js';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { ref } from 'lit/directives/ref.js';

import { LionInputTelDropdown } from '@lion/ui/input-tel-dropdown.js';
import { runInputTelDropdownSuite } from '@lion/ui/input-tel-dropdown-test-suites.js';

import '@lion/ui/define/lion-option.js';
import '@lion/ui/define/lion-select-rich.js';

/**
 * @typedef {import('lit').TemplateResult} TemplateResult
 * @typedef {HTMLSelectElement|HTMLElement & {modelValue:string}} DropdownElement
 * @typedef {import('../types/index.js').TemplateDataForDropdownInputTel} TemplateDataForDropdownInputTel
 * @typedef {import('../types/index.js').RegionMeta} RegionMeta
 */

class WithFormControlInputTelDropdown extends LionInputTelDropdown {
  static templates = {
    ...(super.templates || {}),
    /**
     * @param {TemplateDataForDropdownInputTel} templateDataForDropdown
     */
    dropdown: templateDataForDropdown => {
      const { refs, data } = templateDataForDropdown;
      // TODO: once spread directive available, use it per ref (like ref(refs?.dropdown?.ref))
      return html`
        <lion-select-rich
          ${ref(refs?.dropdown?.ref)}
          label="${refs?.dropdown?.labels?.country}"
          label-sr-only
          @model-value-changed="${refs?.dropdown?.listeners['model-value-changed']}"
          style="${refs?.dropdown?.props?.style}"
        >
          ${repeat(
            data.regionMetaList,
            regionMeta => regionMeta.regionCode,
            regionMeta =>
              html` <lion-option .choiceValue="${regionMeta.regionCode}"> </lion-option> `,
          )}
        </lion-select-rich>
      `;
    },
  };
}

// @ts-expect-error
runInputTelSuite({ klass: LionInputTelDropdown });
runInputTelDropdownSuite();

describe('WithFormControlInputTelDropdown', () => {
  // @ts-expect-error
  // Runs it for LionSelectRich, which uses .modelValue/@model-value-changed instead of .value/@change
  runInputTelDropdownSuite({ klass: WithFormControlInputTelDropdown });
});
