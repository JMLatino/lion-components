import '@lion/ui/define/lion-tooltip.js';
import { aTimeout, expect, fixture, html, unsafeStatic } from '@open-wc/testing';
import { runOverlayMixinSuite } from '@lion/ui/overlays-test-suites.js';
import sinon from 'sinon';

/**
 * @typedef {import('../src/LionTooltip.js').LionTooltip} LionTooltip
 * @typedef {import('../../overlays/types/OverlayConfig.js').OverlayConfig} OverlayConfig
 */

describe('lion-tooltip', () => {
  describe('Integration tests', () => {
    const tagString = 'lion-tooltip';
    const tag = unsafeStatic(tagString);

    runOverlayMixinSuite({
      tagString,
      tag,
      suffix: ' for lion-tooltip',
    });
  });

  describe('Basic', () => {
    /** @type {sinon.SinonFakeTimers} */
    let clock;
    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });
    afterEach(() => {
      clock.restore();
    });

    it('shows content on mouseenter and hide on mouseleave', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const eventMouseEnter = new Event('mouseenter');
      // @ts-expect-error [allow-protected-in-tests]
      el._overlayInvokerNode.dispatchEvent(eventMouseEnter);
      await el.updateComplete;
      clock.tick(300);
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(true);
      const eventMouseLeave = new Event('mouseleave');
      // @ts-expect-error [allow-protected-in-tests]
      el._overlayInvokerNode.dispatchEvent(eventMouseLeave);
      clock.tick(300);
      await el.updateComplete;
      await el.updateComplete; // webkit needs longer
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(false);
    });

    it('shows content on mouseenter and remain shown on focusout', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const eventMouseEnter = new Event('mouseenter');
      // @ts-expect-error [allow-protected-in-tests]
      el._overlayInvokerNode.dispatchEvent(eventMouseEnter);
      clock.tick(300);
      await el.updateComplete;
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(true);
      const eventFocusOut = new Event('focusout');
      // @ts-expect-error [allow-protected-in-tests]
      el._overlayContentNode.dispatchEvent(eventFocusOut);
      clock.tick(300);
      await el.updateComplete;
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(true);
    });

    it('shows content on focusin and hide on focusout', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const invoker = /** @type {HTMLElement} */ (
        Array.from(el.children).find(child => child.slot === 'invoker')
      );
      const eventFocusIn = new Event('focusin');
      invoker.dispatchEvent(eventFocusIn);
      clock.tick(300);
      await el.updateComplete;
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(true);
      const eventFocusOut = new Event('focusout');
      invoker.dispatchEvent(eventFocusOut);
      clock.tick(300);
      await el.updateComplete;
      await el.updateComplete; // webkit needs longer
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(false);
    });

    it('shows content on focusin and remain shown on mouseleave', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const invoker = /** @type {HTMLElement} */ (
        Array.from(el.children).find(child => child.slot === 'invoker')
      );
      const eventFocusIn = new Event('focusin');
      invoker.dispatchEvent(eventFocusIn);
      clock.tick(300);
      await el.updateComplete;
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(true);
      const eventMouseLeave = new Event('mouseleave');
      invoker.dispatchEvent(eventMouseLeave);
      clock.tick(300);
      await el.updateComplete;
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(true);
    });

    it('stays hidden on disabled invoker', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker" disabled>Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const invoker = /** @type {HTMLElement} */ (
        Array.from(el.children).find(child => child.slot === 'invoker')
      );
      const eventMouseEnter = new Event('mouseenter');
      el.dispatchEvent(eventMouseEnter);
      await el.updateComplete;
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(false);
      const eventFocusIn = new Event('focusin');
      invoker.dispatchEvent(eventFocusIn);
      await el.updateComplete;
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(false);
    });

    it('stays hidden on aria-disabled invoker', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker" aria-disabled="true">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const invoker = /** @type {HTMLElement} */ (
        Array.from(el.children).find(child => child.slot === 'invoker')
      );
      const eventMouseEnter = new Event('mouseenter');
      el.dispatchEvent(eventMouseEnter);
      await el.updateComplete;
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(false);
      const eventFocusIn = new Event('focusin');
      invoker.dispatchEvent(eventFocusIn);
      await el.updateComplete;
      // @ts-expect-error [allow-protected-in-tests]
      expect(el._overlayCtrl.isShown).to.equal(false);
    });

    it('contains html when specified in tooltip content body', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">
              This is Tooltip using <strong id="click_overlay">overlay</strong>
            </div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const invoker = /** @type {HTMLElement} */ (
        Array.from(el.children).find(child => child.slot === 'invoker')
      );
      const event = new Event('mouseenter');
      invoker.dispatchEvent(event);
      await el.updateComplete;
      expect(el.querySelector('strong')).to.not.be.undefined;
    });
  });

  describe('Arrow', () => {
    /** @type {sinon.SinonFakeTimers} */
    let clock;
    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });
    afterEach(() => {
      clock.restore();
    });

    it('shows when "has-arrow" is configured', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip has-arrow>
            <div slot="content">
              This is Tooltip using <strong id="click_overlay">overlay</strong>
            </div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      expect(el._arrowNode).to.be.displayed;
    });

    it('makes sure positioning of the arrow is correct', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip
            has-arrow
            .config="${
              /** @type {OverlayConfig} */ ({
                popperConfig: {
                  placement: 'right',
                },
              })
            }"
            style="position: relative; top: 10px;"
          >
            <div slot="content" style="height: 30px; background-color: red;">Hey there</div>
            <button slot="invoker" style="height: 30px;">Tooltip button</button>
          </lion-tooltip>
        `)
      );

      el.opened = true;
      clock.tick(300);
      await el.repositionComplete;

      // Pretty sure we use flex for this now so that's why it fails
      /* expect(getComputedStyle(el.__arrowElement).getPropertyValue('top')).to.equal(
        '11px',
        '30px (content height) - 8px = 22px, divided by 2 = 11px offset --> arrow is in the middle',
      ); */

      expect(
        getComputedStyle(/** @type {HTMLElement} */ (el._arrowNode)).getPropertyValue('left'),
      ).to.equal(
        '-10px',
        `arrow height is 8px so this offset should be taken into account to align the arrow properly,
          as well as half the difference between width and height ((12 - 8) / 2 = 2)
        `,
      );
    });
  });

  describe('Positioning', () => {
    it('updates popper positioning correctly, without overriding other modifiers', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip style="position: absolute; top: 100px" opened>
            <div slot="content">Hey there</div>
            <div slot="invoker">Tooltip button</div>
          </lion-tooltip>
        `)
      );

      await aTimeout(0);
      // TODO: we are testing a protected property `_overlayCtrl` here, which is not ideal
      // @ts-ignore
      const initialPopperModifiers = el._overlayCtrl.config.popperConfig.modifiers;
      // @ts-ignore
      expect(el._overlayCtrl.config.popperConfig.placement).to.equal('top');

      el.config = {
        popperConfig: {
          placement: 'bottom',
        },
      };

      el.opened = false;
      el.opened = true;
      await aTimeout(0);
      // @ts-ignore
      const updatedPopperModifiers = el._overlayCtrl.config.popperConfig.modifiers;
      expect(updatedPopperModifiers).to.deep.equal(initialPopperModifiers);
      // @ts-ignore
      expect(el._overlayCtrl.config.popperConfig.placement).to.equal('bottom');
    });
  });

  describe('Accessibility', () => {
    it('should have a tooltip role set on the tooltip', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );

      // FIXME: This should be refactored to Array.from(this.children).find(child => child.slot === 'content').
      // When this issue is fixed https://github.com/ing-bank/lion/issues/382
      const content = /** @type {HTMLElement} */ (el.querySelector('[slot=content]'));
      expect(content.getAttribute('role')).to.be.equal('tooltip');
    });

    it('should have aria-describedby role set on the invoker', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const content = /** @type {HTMLElement} */ (el.querySelector('[slot=content]'));
      const invoker = /** @type {HTMLElement} */ (el.querySelector('[slot=invoker]'));
      expect(invoker.getAttribute('aria-describedby')).to.be.equal(content.id);
      expect(invoker.getAttribute('aria-labelledby')).to.be.equal(null);
    });

    it('should have aria-labelledby role set on the invoker when [ invoker-relation="label"]', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip invoker-relation="label">
            <div slot="content">Hey there</div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const content = /** @type {HTMLElement} */ (el.querySelector('[slot=content]'));
      const invoker = /** @type {HTMLElement} */ (el.querySelector('[slot=invoker]'));
      expect(invoker.getAttribute('aria-describedby')).to.be.equal(null);
      expect(invoker.getAttribute('aria-labelledby')).to.be.equal(content.id);
    });

    it('should be accessible when closed', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      await expect(el).to.be.accessible;
    });

    it('should be accessible when opened', async () => {
      const el = /** @type {LionTooltip} */ (
        await fixture(html`
          <lion-tooltip>
            <div slot="content">Hey there</div>
            <button slot="invoker">Tooltip button</button>
          </lion-tooltip>
        `)
      );
      const invoker = /** @type {HTMLElement} */ (el.querySelector('[slot="invoker"]'));
      const eventFocusIn = new Event('focusin');
      invoker.dispatchEvent(eventFocusIn);
      await el.updateComplete;

      await expect(el).to.be.accessible;
    });
  });
});
