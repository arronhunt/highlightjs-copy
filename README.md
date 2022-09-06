# highlightjs-copy

[![Netlify Status](https://api.netlify.com/api/v1/badges/6b2257bf-a914-4f05-8166-a678eaff9fe8/deploy-status)](https://app.netlify.com/sites/highlightjs-copy/deploys)

A simple, accessible [highlightjs](https://github.com/highlightjs/highlight.js) plugin to add a copy button to your codeblocks.

![Preview](https://repository-images.githubusercontent.com/376601151/45b9bc80-cc37-11eb-936c-c3a55741bf77)

## Demo

[Check out the demo](https://highlightjs-copy.netlify.app)

## Install

### Using a CDN

```html
<script src="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.js"></script>
```

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/highlightjs-copy/dist/highlightjs-copy.min.css"
/>
```

### NPM

```bash
npm install highlightjs-copy
```

## Usage

### Basic usage

```javascript
hljs.addPlugin(new CopyButtonPlugin());
```

### With a callback

```javascript
hljs.addPlugin(
  new CopyButtonPlugin({
    callback: (text, el) => console.log("Copied to clipboard", text),
  })
);
```

### Modify copied text with hooks

```javascript
hljs.addPlugin(
  new CopyButtonPlugin({
    hook: (text, el) => text + "\nCopied from my cool website.",
  })
);
```

### Advanced hook example

```html
<!-- Code block example -->
<pre>
  <code class="language-bash" data-replace="{{YOUR_API_KEY}}" data-replaceWith="grtf32a35bbc...">
    gretel configure --key {{YOUR_API_KEY}}
  </code>
</pre>

<script>
  hljs.addPlugin(
    new CopyButtonPlugin({
      hook: (text, el) => {
        let { replace, replacewith } = el.dataset;
        if (replace && replacewith) {
          return text.replace(replace, replacewith);
        }
        return text;
      },
      callback: (text, el) => {
        /* logs `gretel configure --key grtf32a35bbc...` */
        console.log(text);
      },
    })
  );
  hljs.highlightAll();
</script>
```

## Localization

highlightjs-copy supports multiple locales by providing the correct language for accessibility.

```js
hljs.addPlugin(
  new CopyButtonPlugin({
    lang: "es", // The copy button now says "Copiado!" when selected.
  })
);
```

This option is unnecessary if you correctly add the lang attribute to your document. You can override this behavior by providing the `lang` option as described above.

```html
<html lang="es">
  <body>
    <!-- The plugin language defaults to `es` to match the document, so manually setting it is unnecessary. -->
    <script>
      hljs.addPlugin(new CopyButtonPlugin());
    </script>
  </body>
</html>
```

If the document has no `lang` set and the `lang` option is not provided, it will default to `en`.

## Customization

| CSS selector           | Details                                                                                                                                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.hljs-copy-wrapper`   | Applied to the parent `<pre>` element that wraps the .hljs code.                                                                                                                               |
| `.hljs-copy-button`    | The copy button itself.<br /><br />The variable `--hljs-theme-background` is automatically applied to the parent element. This allows the button to inherit the code block's background color. |
| `[data-copied='true']` | This data attribute is applied to the copy button and is set to `true` for two seconds when the copy action is performed.                                                                      |
| `.hljs-copy-alert`     | A visually hidden status element that announces the copy confirmation to screen readers.                                                                                                       |
