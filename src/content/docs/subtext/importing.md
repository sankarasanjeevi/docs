---
title: Importing captions
description: How to get SRT, VTT, and CSV caption files into Subtext.
---

Subtext works from caption files you already have. There are several ways to bring them in.

## Ways to import

- **Click Import** and pick a file — `.srt`, `.vtt`, or `.csv`.
- **Drag and drop** a caption file straight onto the panel.
- **Import a whole folder** at once, or drop multiple files together.
- **Drag from Premiere's Project panel** — if an SRT is already imported into your project, drag it from the Project panel onto Subtext.

Once imported, captions appear as **editable lines**, each with its timecode.

## CSV timecodes

A CSV with **frame timecodes** needs to know your project's frame rate to convert them correctly. Subtext asks for your frame rate **once** when you import such a file.

## Supported formats

| Format | Notes |
| --- | --- |
| **SRT** | The standard subtitle format. Import and export. |
| **VTT** | WebVTT caption files. |
| **CSV** | Comma-separated captions; supports frame timecodes (you'll be asked for the frame rate). |

## Next steps

- [Editing captions](/docs/subtext/editing/)
