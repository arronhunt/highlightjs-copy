# highlightjs-copy

A simple, accessible [highlightjs](https://github.com/highlightjs/highlight.js) plugin to add a copy button to your codeblocks.

![](./assets/preview.png)

## Install

```html
<script src="path/to/highlightjs-copy.min.js">
```

```html
<link rel="stylesheet" href="path/to/highlight-copy.css" />
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
