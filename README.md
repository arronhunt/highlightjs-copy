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

Basic usage

```javascript
hljs.addPlugin(CopyButtonPlugin());
```

With a callback

```javascript
hljs.addPlugin(
  CopyButtonPlugin(function (el, text) {
    console.log("Copied to clipboard", text);
  })
);
```

## Customization

| CSS selector           | Details                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `.hljs-copy-wrapper`   | Applied to the parent `<pre>` element that wraps the .hljs code.                                                          |
| `.hljs-copy-button`    | The copy button itself.                                                                                                   |
| `[data-copied='true']` | This data attribute is applied to the copy button and is set to `true` for two seconds when the copy action is performed. |
| `.hljs-copy-alert`     | A visually hidden status element that announces the copy confirmation to screen readers.                                  |
