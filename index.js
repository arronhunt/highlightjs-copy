/**
 *  @file highlight-copy.js
 *  @author Arron Hunt <arronjhunt@gmail.com>
 *  @copyright Copyright 2021. All rights reserved.
 */

/**
 * Adds a copy button to highlightjs code blocks
 * @param {copyCallback} [callback] - Called after the copy event has occured
 * @returns {Object} hljs plugin object.
 */
function CopyButtonPlugin(callback) {
  return {
    "after:highlightElement"({ el, text }) {
      // Create the copy button and append it to the codeblock
      let button = Object.assign(document.createElement("button"), {
        innerHTML: "Copy",
        className: "hljs-copy-button",
      });
      button.dataset.copied = false;
      el.parentElement.classList.add("hljs-copy-wrapper");
      el.parentElement.appendChild(button);

      button.onclick = function () {
        if (!navigator.clipboard) return;

        navigator.clipboard
          .writeText(text)
          .then(function () {
            button.innerHTML = "Copied!";
            button.dataset.copied = true;

            let alert = Object.assign(document.createElement("div"), {
              role: "status",
              className: "hljs-copy-alert",
              innerHTML: "Copied to clipboard",
            });
            el.parentElement.appendChild(alert);

            setTimeout(() => {
              button.innerHTML = "Copy";
              button.dataset.copied = false;
              el.parentElement.removeChild(alert);
              alert = null;
            }, 2000);
          })
          .then(function () {
            if (typeof callback === "function") return callback(el, text);
          });
      };
    },
  };
}

/**
 * @callback copyCallback
 * @param {Object} el - The code block element that was copied from.
 * @param {string} text - The raw text copied to the clipboard.
 */
