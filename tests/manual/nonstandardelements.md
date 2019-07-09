1. Click "Init editors".
2. Expected:
  * Two inline editor should be created.
  * Elements used as editables should remain visible.
    * They should preserve `.custom-class`.
  * There should be floating toolbars with "Bold", "Italic", "Undo", "Redo", "Link", "Unlink",
  "Font size", "Font Family", "Font Color" and "Font Backround Color" buttons.
3. Left editor is created over a `<p>` element with `$inlineRoot`. It allows only on creating inline content.
4. Right editor is classic inline editor created over a `<div>` with all regular features.

## Notes:

* You can play with:
  * `window.editables[ N ].isReadOnly`,
* Changes to `window.editors[ name ].focusTracker.isFocused` should be logged to the console.
* Features should work.
