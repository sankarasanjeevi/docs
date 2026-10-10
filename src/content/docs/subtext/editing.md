---
title: Editing captions
description: Word-level caption editing in Subtext — fixing words, splitting and merging lines, adding and deleting captions.
---

Subtext is built for fast, word-level fixes. Everything is a click or a keystroke away, and every change is undoable.

## Selecting and navigating

- **Single-click a line** — moves Premiere's playhead to that caption, so you can see it in context.
- **↑ / ↓** — walk the selection through the captions; the playhead follows along.
- **Enter** — edit the selected line.
- **F** — flag the selected line for review.

## Editing text

- **Double-click a word** — edit just that word. Press **Enter** to commit or **Esc** to cancel.
- **Double-click the empty area of a line** — edit the whole line as one field.

## Splitting and merging lines

- While editing a word, press **Space** to **split the line into two captions** at the caret.
- **Click a "/" between words** to split the line exactly there.
- The **trailing "/"** at the end of a line **merges it with the next** line.

Splitting divides the caption's time range at the split point; merging joins the ranges. This lets you fix badly-broken auto-generated lines without touching timecodes by hand.

## Adding and deleting

- **Add** a new caption anywhere in the list.
- **Delete** any line. Emptying a line's text also deletes it.

## Undo and redo

Every edit is undoable with **Ctrl+Z** / **Ctrl+Y**. Work is also **auto-saved** continuously — see [History](/docs/subtext/output/#history).

## Next steps

- [Cleanup](/docs/subtext/cleanup/)
- [Review & search](/docs/subtext/review-and-search/)
