import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

// Cleanup after each test case
afterEach(() => {
    cleanup();
});

// Improve jsdom focus behavior for testing
beforeAll(() => {
    if (typeof document !== 'undefined' && typeof HTMLElement !== 'undefined') {
        // Track the currently focused element
        let activeElement: HTMLElement | null = null;

        // Override getBoundingClientRect for elements (required for some focus operations)
        HTMLElement.prototype.getBoundingClientRect = function () {
            return {
                width: 100,
                height: 100,
                top: 0,
                left: 0,
                bottom: 100,
                right: 100,
                x: 0,
                y: 0,
                toJSON: () => { },
            };
        };

        // Override document.activeElement
        Object.defineProperty(document, 'activeElement', {
            get() {
                return activeElement || document.body;
            },
            configurable: true,
        });

        // Enhance HTMLElement.prototype.focus
        const originalFocus = HTMLElement.prototype.focus;
        HTMLElement.prototype.focus = function (this: HTMLElement, options?: FocusOptions) {
            if (this.tabIndex >= -1 && !this.hasAttribute('disabled')) {
                activeElement = this;
                // Trigger focus event
                this.dispatchEvent(new FocusEvent('focus', { bubbles: false }));
                this.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            }
            return originalFocus.call(this, options);
        };

        // Enhance HTMLElement.prototype.blur
        const originalBlur = HTMLElement.prototype.blur;
        HTMLElement.prototype.blur = function (this: HTMLElement) {
            if (activeElement === this) {
                const previousElement = activeElement;
                activeElement = null;
                // Trigger blur event
                this.dispatchEvent(new FocusEvent('blur', { bubbles: false }));
                this.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
            }
            return originalBlur.call(this);
        };
    }
});
