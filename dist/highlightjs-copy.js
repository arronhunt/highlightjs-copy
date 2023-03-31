var CopyButtonPlugin = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // index.js
  var require_highlightjs_copy = __commonJS({
    "index.js"(exports, module) {
      var CopyButtonPlugin = class {
        constructor(options = {}) {
          self.hook = options.hook;
          self.callback = options.callback;
          self.lang = options.lang || document.documentElement.lang || "en";
        }
        "after:highlightElement"($) {
          var _a;
          const el = $.el;
          const text = $.text;
          let button = Object.assign(document.createElement("button"), {
            innerHTML: ((_a = locales[lang]) == null ? void 0 : _a[0]) || "Copy",
            className: "hljs-copy-button"
          });
          button.dataset.copied = false;
          el.parentElement.classList.add("hljs-copy-wrapper");
          el.parentElement.appendChild(button);
          el.parentElement.style.setProperty(
            "--hljs-theme-background",
            window.getComputedStyle(el).backgroundColor
          );
          button.onclick = function() {
            if (!navigator.clipboard)
              return;
            let newText = text;
            if (hook && typeof hook === "function") {
              newText = hook(text, el) || text;
            }
            navigator.clipboard.writeText(newText).then(function() {
              var _a2, _b;
              button.innerHTML = ((_a2 = locales[lang]) == null ? void 0 : _a2[1]) || "Copied!";
              button.dataset.copied = true;
              let alert = Object.assign(document.createElement("div"), {
                role: "status",
                className: "hljs-copy-alert",
                innerHTML: ((_b = locales[lang]) == null ? void 0 : _b[2]) || "Copied to clipboard"
              });
              el.parentElement.appendChild(alert);
              setTimeout(() => {
                var _a3;
                button.innerHTML = ((_a3 = locales[lang]) == null ? void 0 : _a3[0]) || "Copy";
                button.dataset.copied = false;
                el.parentElement.removeChild(alert);
                alert = null;
              }, 2e3);
            }).then(function() {
              if (typeof callback === "function")
                return callback(newText, el);
            });
          };
        }
      };
      module.exports = CopyButtonPlugin;
      var locales = {
        en: ["Copy", "Copied!", "Copied to clipboard"],
        es: ["Copiar", "Copiado!", "Copiado al portapapeles"],
        fr: ["Copier", "Copi\xE9!", "Copi\xE9 dans le presse-papier"],
        de: ["Kopieren", "Kopiert!", "In die Zwischenablage kopiert"],
        ja: ["\u30B3\u30D4\u30FC", "\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\uFF01", "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F"],
        ko: ["\uBCF5\uC0AC", "\uBCF5\uC0AC\uB428!", "\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB428"],
        ru: ["\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C", "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E!", "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432 \u0431\u0443\u0444\u0435\u0440 \u043E\u0431\u043C\u0435\u043D\u0430"],
        zh: ["\u590D\u5236", "\u5DF2\u590D\u5236!", "\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F"],
        "zh-tw": ["\u8907\u88FD", "\u5DF2\u8907\u88FD!", "\u5DF2\u8907\u88FD\u5230\u526A\u8CBC\u7C3F"]
      };
    }
  });
  return require_highlightjs_copy();
})();
