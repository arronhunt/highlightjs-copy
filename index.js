/**
 *  @file highlight-copy.js
 *  @author Arron Hunt <arronjhunt@gmail.com>
 *  @copyright Copyright 2021-2024. All rights reserved.
 */

/**
 * Adds a copy button to highlightjs code blocks
 */
class CopyButtonPlugin {
  /**
   * Create a new CopyButtonPlugin class instance
   * @param {Object} [options] - Functions that will be called when a copy event fires
   * @param {CopyCallback} [options.callback]
   * @param {Hook} [options.hook]
   * @param {Boolean} [options.autohide=true] Automatically hides the copy button until a user hovers the code block. Defaults to False
   */
  constructor(options = {}) {
    this.hook = options.hook;
    this.callback = options.callback;
    this.autohide =
      typeof options.autohide !== "undefined" ? options.autohide : true;
  }
  "after:highlightElement"({ el, text }) {
    // If the code block already has a copy button, return.
    if (el.parentElement.querySelector(".hljs-copy-button")) return;

    let { hook, callback, autohide } = this;

    // Create the copy button and append it to the codeblock.
    let container = Object.assign(document.createElement("div"), {
      className: "hljs-copy-container",
    });
    container.dataset.autohide = autohide;

    let button = Object.assign(document.createElement("button"), {
      className: "hljs-copy-button",
      type: "button",
    });
    button.dataset.copied = false;

    el.parentElement.classList.add("hljs-copy-wrapper");
    el.parentElement.appendChild(container);
    container.appendChild(button);

    // Add a custom proprety to the container so that the copy button can reference and match its theme values.
    container.style.setProperty(
      "--hljs-theme-background",
      window.getComputedStyle(el).backgroundColor
    );
    container.style.setProperty(
      "--hljs-theme-color",
      window.getComputedStyle(el).color
    );
    container.style.setProperty(
      "--hljs-theme-padding",
      window.getComputedStyle(el).padding
    );

    button.onclick = function () {
      if (!navigator.clipboard) return;

      let newText = text;
      if (hook && typeof hook === "function") {
        newText = hook(text, el) || text;
      }

      navigator.clipboard
        .writeText(newText.trim())
        .then(function () {
          button.dataset.copied = true;

          setTimeout(() => {
            button.dataset.copied = false;
            el.parentElement.removeChild(alert);
            alert = null;
          }, 2000);
        })
        .then(function () {
          if (typeof callback === "function") return callback(newText, el);
        });
    };
  }
}

// Check if the NodeJS environment is available before exporting the class
if (typeof module != "undefined") {
  module.exports = CopyButtonPlugin;
}

/**
 * @typedef {function} CopyCallback
 * @param {string} text - The raw text copied to the clipboard.
 * @param {HTMLElement} el - The code block element that was copied from.
 * @returns {undefined}
 */
/**
 * @typedef {function} Hook
 * @param {string} text - The raw text copied to the clipboard.
 * @param {HTMLElement} el - The code block element that was copied from.
 * @returns {string|undefined}
 */
