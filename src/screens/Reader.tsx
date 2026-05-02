import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { uiCopy } from "../content/uiCopy";
import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { ReaderBottomBar } from "../components/ReaderBottomBar";
import { ReaderSettingsSheet } from "../components/ReaderSettingsSheet";
import { ReaderTopBar } from "../components/ReaderTopBar";
import { Sheet } from "../components/Sheet";
import { TableOfContentsSheet } from "../components/TableOfContentsSheet";
import type { ResolvedTheme } from "../hooks/useTheme";
import type { NovelBlock, NovelChapter, NovelPart } from "../types/novel";
import { getChapterProgress } from "../utils/progress";
import {
  saveProgress,
  type ProgressMap,
  type ReaderSettings,
  type ThemePreference
} from "../utils/storage";

type ReaderProps = {
  chapter: NovelChapter;
  part: NovelPart;
  progressMap: ProgressMap;
  readerSettings: ReaderSettings;
  resolvedTheme: ResolvedTheme;
  themePreference: ThemePreference;
  onBack: () => void;
  onOpenChapter: (partId: string, chapterId: string) => void;
  onProgressSaved: () => void;
  onReaderSettingsChange: (settings: Partial<ReaderSettings>) => void;
  onResetReaderSettings: () => void;
  onThemeChange: (theme: ThemePreference) => void;
  onToggleTheme: () => void;
};

function calculateProgress(): number {
  const root = document.documentElement;
  const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
  return Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
}

function renderBlock(block: NovelBlock, index: number, blocks: NovelBlock[]) {
  if (block.type === "part-title") {
    return (
      <section className="reader-part-title-page" key={`${block.type}-${index}`}>
        <p className="reader-part-title">{block.number}</p>
        <h1 className="reader-part-name">{block.title}</h1>
        <p className="reader-thematic-line">{block.thematicLine}</p>
      </section>
    );
  }

  if (block.type === "chapter-title") {
    return (
      <h2 className="reader-chapter-title" key={`${block.type}-${index}`}>
        {block.title}
      </h2>
    );
  }

  if (block.type === "section-break") {
    return (
      <div
        aria-hidden="true"
        className="reader-section-break"
        key={`${block.type}-${index}`}
      >
        * &nbsp; * &nbsp; *
      </div>
    );
  }

  const flush = index === 0 || blocks[index - 1].type !== "paragraph";
  return (
    <p
      className={flush ? "reader-paragraph reader-paragraph--flush" : "reader-paragraph"}
      key={`${block.type}-${index}`}
    >
      {block.text}
    </p>
  );
}

export function Reader({
  chapter,
  part,
  progressMap,
  readerSettings,
  resolvedTheme,
  themePreference,
  onBack,
  onOpenChapter,
  onProgressSaved,
  onReaderSettingsChange,
  onResetReaderSettings,
  onThemeChange,
  onToggleTheme
}: ReaderProps) {
  const savedProgress = getChapterProgress(progressMap, part.id, chapter.id);
  const [progressPercent, setProgressPercent] = useState(
    savedProgress?.progressPercent ?? 0
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [listenOpen, setListenOpen] = useState(false);
  const [mode, setMode] = useState<"read" | "listen">("read");
  const lastSavedAt = useRef(0);
  const restoredChapterKey = useRef<string | null>(null);

  const renderedBlocks = useMemo(
    () => chapter.blocks.map((block, index) => renderBlock(block, index, chapter.blocks)),
    [chapter.blocks]
  );

  useLayoutEffect(() => {
    const chapterKey = `${part.id}:${chapter.id}`;
    if (restoredChapterKey.current === chapterKey) {
      return;
    }

    restoredChapterKey.current = chapterKey;
    const targetY = savedProgress?.scrollY ?? 0;
    window.scrollTo(0, targetY);
    setProgressPercent(savedProgress?.progressPercent ?? 0);
  }, [chapter.id, part.id]);

  useEffect(() => {
    let frameId: number | null = null;
    let ticking = false;

    function persistProgress(force = false, updateState = true) {
      const nextPercent = calculateProgress();
      if (updateState) {
        setProgressPercent(nextPercent);
      }

      const now = Date.now();
      if (!force && now - lastSavedAt.current < 500) {
        return;
      }

      lastSavedAt.current = now;
      saveProgress({
        partId: part.id,
        chapterId: chapter.id,
        scrollY: Math.round(window.scrollY),
        progressPercent: Math.round(nextPercent),
        updatedAt: new Date().toISOString()
      });
      onProgressSaved();
    }

    function handleScroll() {
      if (ticking) {
        return;
      }
      ticking = true;
      frameId = window.requestAnimationFrame(() => {
        persistProgress();
        frameId = null;
        ticking = false;
      });
    }

    function handleBeforeUnload() {
      persistProgress(true, false);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);
    persistProgress(true);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      persistProgress(true, false);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [chapter.id, onProgressSaved, part.id]);

  return (
    <Layout reader>
      <ReaderTopBar
        chapter={chapter}
        onBack={onBack}
        part={part}
        progressPercent={progressPercent}
      />
      <main className="reader-page">
        <article
          className="reader-content"
          data-align={readerSettings.textAlign}
          data-font-family={readerSettings.fontFamily}
          data-font-size={readerSettings.fontSize}
          data-line-height={readerSettings.lineHeight}
          data-width={readerSettings.width}
        >
          {renderedBlocks}
        </article>
      </main>
      <ReaderBottomBar
        mode={mode}
        onModeChange={(nextMode) => {
          setMode(nextMode);
          if (nextMode === "listen") {
            setListenOpen(true);
          }
        }}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenToc={() => setTocOpen(true)}
        onToggleTheme={onToggleTheme}
        progressPercent={progressPercent}
        resolvedTheme={resolvedTheme}
      />
      <ReaderSettingsSheet
        onClose={() => setSettingsOpen(false)}
        onReset={onResetReaderSettings}
        onSettingsChange={onReaderSettingsChange}
        onThemeChange={onThemeChange}
        open={settingsOpen}
        settings={readerSettings}
        themePreference={themePreference}
      />
      <TableOfContentsSheet
        currentChapterId={chapter.id}
        currentPartId={part.id}
        onClose={() => setTocOpen(false)}
        onSelectChapter={(targetPart, targetChapter) => {
          setTocOpen(false);
          onOpenChapter(targetPart.id, targetChapter.id);
        }}
        open={tocOpen}
      />
      <Sheet
        description={uiCopy.listenSoon}
        onClose={() => {
          setListenOpen(false);
          setMode("read");
        }}
        open={listenOpen}
        title={uiCopy.listenTitle}
      >
        <div className="listen-placeholder">
          <p>{uiCopy.listenSoon}</p>
          <Button
            onClick={() => {
              setListenOpen(false);
              setMode("read");
            }}
            type="button"
          >
            {uiCopy.readInstead}
          </Button>
        </div>
      </Sheet>
    </Layout>
  );
}
