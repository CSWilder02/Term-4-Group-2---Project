# solid-simple-code-editor

[![Build Status][build-badge]][build]
[![MIT License][license-badge]][license]
[![Version][version-badge]][package]
[![Bundle size (minified + gzip)][bundle-size-badge]][bundle-size]

> A port of [react-simple-code-editor](https://react-simple-code-editor.github.io/react-simple-code-editor/) written in [Solid JS](https://solidjs.com)

## Installation

```sh
npm install solid-simple-code-editor
```

or

```sh
yarn add solid-simple-code-editor
```

## Usage

You need to use the editor with a third party library which provides syntax highlighting. For example, it'll look like following with [`prismjs`](https://prismjs.com):

```tsx
import { createSignal } from 'solid-js';
import Editor from 'solid-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-jsx';

const code = `
function add(a, b) {
  return a + b;
}
`;

export const App = () => {
  const [code, setCode] = createSignal(code);
  
  return (
    <Editor
      value={code()}
      onValueChange={code => setCode(code)}
      highlight={code => highlight(code, languages.jsx, 'jsx')}
      padding="10px"
      style={{
        'font-family': '"Fira code", "Fira Mono", monospace',
        'font-size': 12,
      }}
    />
  );
}
```

Note that depending on your syntax highlighter, you might have to include additional CSS for syntax highlighting to work.

## Props

The editor accepts all the props accepted by the `textarea` element. In addition, the following props are also supported:

| Name          |                     Type                     | Required |   Default   | Description                                                                                                                                                                                    |
|---------------|:--------------------------------------------:|:--------:|:-----------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| highlight     |        `(value: string) => JSXElement`       |    Yes   |             | Callback which will receive text to highlight. You'll need to return an HTML string or a React element with syntax highlighting using a library such as prismjs.                               |
| ignoreTabKey  |                   `boolean`                  |    No    |   `false`   | Whether the editor should ignore tab key presses so that keyboard users can tab past the editor. Users can toggle this behavior using Ctrl+Shift+M (Mac) / Ctrl+M manually when this is false. |
| insertSpaces  |                   `boolean`                  |    No    |    `true`   | Whether to use spaces for indentation. If you set it to false, you might also want to set tabSize to 1.                                                                                        |
| padding       | `0 \| string \| Record<string, 0 \| string>` |    No    |     `0`     | Optional padding for code. When provided as an object, the key needs to be one of the valid padding CSS attribute.                                                                             |
| style         |              `JSX.CSSProperties`             |    No    | `undefined` | Custom styles for the component.                                                                                                                                                               |
| tabSize       |                   `number`                   |    No    |     `2`     | The number of characters to insert when pressing tab key. For example, for 4 space indentation, tabSize will be 4 and insertSpaces will be true.                                               |
| value         |                   `string`                   |    Yes   |             | The current value of the editor i.e. the code to display. This must be a controlled prop.                                                                                                      |
| onValueChange |           `(value: string) => void`          |    Yes   |             | Callback which is called when the value of the editor changes. You'll need to update the value prop when this is called.                                                                       |
| textareaId    |                   `string`                   |    No    |             | The id for the underlying textarea element. This can be used for linking the text area to a label or other accessibility related mapping.                                                      |
| textareaClass |                   `string`                   |    No    |             | A class name for the underlying textarea element. Can be useful for more precise control of its styles.                                                                                        |
| preClass      |                   `string`                   |    No    |             | A class name for the underlying pre element. Can be useful for more precise control of its styles.                                                                                             |

## Demo

https://solid-simple-code-editor.vercel.app

## How it works

It works by overlaying a syntax highlighted `<pre>` block over a `<textarea>`. When you type, select, copy text etc., you interact with the underlying `<textarea>`, so the experience feels native. This is a very simple approach compared to other editors which re-implement the behaviour.

The syntax highlighting can be done by any third party library as long as it returns HTML and is fully controllable by the user.

The vanilla `<textarea>` doesn't support inserting tab characters for indentation, so we re-implement it by listening to `keydown` events and programmatically updating the text. One caveat with programmatically updating the text is that we lose the undo stack, so we need to maintain our own undo stack. As a result, we can also implement improved undo behaviour such as undoing whole words similar to editors like VSCode.

## Limitations

Due to the way it works, it has certain limitations:

- The syntax highlighted code cannot have different font family, font weight, font style, line height etc. for its content. Since the editor works by aligning the highlighted code over a `<textarea>`, changing anything that affects the layout can misalign it.
- The custom undo stack is incompatible with undo/redo items browser's context menu. However, other full featured editors don't support browser's undo/redo menu items either.
- The editor is not optimized for performance and large documents can affect the typing speed.
- We hide text in the textarea using `-webkit-text-fill-color: transparent`, which works in all modern browsers (even non-webkit ones such as Firefox and Edge). On IE 10+, we use `color: transparent` which doesn't hide the cursor. Text may appear bolder in unsupported browsers.

<!-- badges -->

[build-badge]: https://img.shields.io/circleci/build/github/raghavan-renganathan/solid-simple-code-editor/master.svg?style=flat-square
[build]: https://circleci.com/gh/raghavan-renganathan/solid-simple-code-editor
[license-badge]: https://img.shields.io/npm/l/solid-simple-code-editor.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[version-badge]: https://img.shields.io/npm/v/solid-simple-code-editor.svg?style=flat-square
[package]: https://www.npmjs.com/package/solid-simple-code-editor
[bundle-size-badge]: https://img.shields.io/bundlephobia/minzip/solid-simple-code-editor.svg?style=flat-square
[bundle-size]: https://bundlephobia.com/result?p=solid-simple-code-editor
