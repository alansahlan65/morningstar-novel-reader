# The Morningstar Novel Reader

A lightweight, static reading app for **The Morningstar Novel** / **Jack Morningstar**.

The app is built with React, Vite, TypeScript, CSS custom properties, and localStorage. It has no backend and no database.

## Run Locally

```bash
npm install
npm run generate:novel
npm run dev
```

Open the local URL printed by Vite.

## Build And Check

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

`npm run lint` currently runs TypeScript checks so the project stays dependency-light.

## Manuscript Import

The exact novel text is generated from these DOCX files:

```text
C:\Users\Asus\Downloads\Part1_revised.docx
C:\Users\Asus\Downloads\Part2_revised.docx
C:\Users\Asus\Downloads\Part3_revised.docx
C:\Users\Asus\Downloads\Part4_revised.docx
C:\Users\Asus\Downloads\Part5_revised.docx
C:\Users\Asus\Downloads\Part6_revised.docx
```

Run this after changing any manuscript file:

```bash
npm run generate:novel
```

The importer writes `src/content/novel.generated.ts`. Do not edit that generated file by hand. Stable app metadata such as tonal subtitles and cover tones lives in `src/content/novel.ts`.

## File Structure

```text
scripts/import_docx.py          DOCX to typed content importer
src/content/novel.generated.ts  Generated manuscript content
src/content/novel.ts            Stable content helpers and part metadata
src/components/                 Shared UI and reader controls
src/screens/                    Library, part detail, and reader screens
src/utils/                      Parser, storage, and progress helpers
src/styles.css                  Design tokens and responsive styling
```

## Reader State

The app stores local reading state in:

```text
morningstar.theme
morningstar.readerSettings
morningstar.progress
morningstar.lastRead
```

These keys preserve theme preference, reading style, chapter scroll positions, progress percentage, and the latest continue-reading target.

## Current Limits

Listen mode is intentionally a placeholder. The full manuscript is bundled into the static app so it works offline after load, which makes the JavaScript bundle larger than a generic shell app.
