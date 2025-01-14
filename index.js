/**
 *  @file highlight-copy.js
 *  @author Arron Hunt <arronjhunt@gmail.com>
 *  @copyright Copyright 2021-2024. All rights reserved.
 */

/**
 * Adds a copy button to highlightjs code blocks
 */
class CopyToClipboard {
  /**
   * Create a new CopyToClipboard class instance
   * @param {Object} [options] - Functions that will be called when a copy event fires
   * @param {CopyCallback} [options.callback]
   * @param {Hook} [options.hook]
   * @param {String} [options.lang] Defaults to the document body's lang attribute and falls back to "en"
   * @param {Boolean} [options.autohide=true] Automatically hides the copy button until a user hovers the code block. Defaults to true
   */
  constructor(options = {}) {
    this.hook = options.hook;
    this.callback = options.callback;
    this.lang = options.lang || document.documentElement.lang || "en";
    this.autohide = options.autohide !== undefined ? options.autohide : true;
  }
  "after:highlightElement"({ el, text }) {
    // If the code block already has a copy button, return.
    if (el.parentElement.querySelector(".hljs-copy-button")) return;

    const { hook, callback, lang, autohide } = this;

    // Create the copy button and append it to the codeblock.
    const container = document.createElement("div");
    container.className = "hljs-copy-container";
    container.dataset.autohide = autohide;

    const button = document.createElement("button");
    button.innerHTML = locales[lang]?.[0] || "Copy";
    button.className = "hljs-copy-button";
    button.dataset.copied = false;

    el.parentElement.classList.add("hljs-copy-wrapper");
    el.parentElement.appendChild(container);
    container.appendChild(button);

    // Add a custom property to the container so that the copy button can reference and match its theme values.
    const computedStyle = window.getComputedStyle(el);
    container.style.setProperty("--hljs-theme-background", computedStyle.backgroundColor);
    container.style.setProperty("--hljs-theme-color", computedStyle.color);
    container.style.setProperty("--hljs-theme-padding", computedStyle.padding);

    button.addEventListener("click", async () => {
      if (!navigator.clipboard) return;

      let newText = text;

      if (hook && typeof hook === "function") newText = hook(text, el) || text;

      try {
        await navigator.clipboard.writeText(newText);
        button.innerHTML = locales[lang]?.[1] || "Copied!";
        button.dataset.copied = true;

        const alert = document.createElement("div");
        alert.role = "status";
        alert.className = "hljs-copy-alert";
        alert.innerHTML = locales[lang]?.[2] || "Copied to clipboard";
        el.parentElement.appendChild(alert);

        setTimeout(() => {
          button.innerHTML = locales[lang]?.[0] || "Copy";
          button.dataset.copied = false;
          el.parentElement.removeChild(alert);
        }, 2000);

        if (typeof callback === "function") {
          callback(newText, el);
        }
      } catch (err) {
        console.error("Clipboard copy failed", err);
      }
    });
  }
}

// Localization data
const locales = {
  en: ["Copy", "Copied!", "Copied to clipboard"],
  es: ["Copiar", "¡Copiado!", "Copiado al portapapeles"],
  "pt-BR": ["Copiar", "Copiado!", "Copiado para a área de transferência"],
  fr: ["Copier", "Copié !", "Copié dans le presse-papier"],
  de: ["Kopieren", "Kopiert!", "In die Zwischenablage kopiert"],
  ja: ["コピー", "コピーしました！", "クリップボードにコピーしました"],
  ko: ["복사", "복사됨!", "클립보드에 복사됨"],
  ru: ["Копировать", "Скопировано!", "Скопировано в буфер обмена"],
  zh: ["复制", "已复制!", "已复制到剪贴板"],
  "zh-tw": ["複製", "已複製!", "已複製到剪貼簿"],
};

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

// Export for Node/NPM and CDN compatibility
if (typeof module !== "undefined" && module.exports) {
  module.exports = CopyToClipboard;
} else {
  window.CopyToClipboard = CopyToClipboard;
}
