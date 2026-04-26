import { getChapter, getFirstChapter, getPart, novelParts } from "../content/novel";
import { uiCopy } from "../content/uiCopy";
import { ContinueReadingCard } from "../components/ContinueReadingCard";
import { Layout } from "../components/Layout";
import { PartShelf } from "../components/PartShelf";
import { TopBar } from "../components/TopBar";
import type { ReadingProgress } from "../types/novel";
import type { ProgressMap } from "../utils/storage";

type LibraryHomeProps = {
  lastRead: ReadingProgress | null;
  progressMap: ProgressMap;
  onContinue: () => void;
  onOpenPart: (partId: string) => void;
  onOpenSettings: () => void;
};

const characters = ["Jack Morningstar", "Asha", "Ciri", "Geralt", "Yennefer"];
const loreNotes = ["The Path", "The Chain", "The Korath", "The Obsidian Crown"];

export function LibraryHome({
  lastRead,
  progressMap,
  onContinue,
  onOpenPart,
  onOpenSettings
}: LibraryHomeProps) {
  const fallback = getFirstChapter();
  const activePart = lastRead ? getPart(lastRead.partId) ?? fallback.part : fallback.part;
  const activeChapter = lastRead
    ? getChapter(lastRead.partId, lastRead.chapterId) ?? fallback.chapter
    : fallback.chapter;

  return (
    <Layout>
      <TopBar onSettings={onOpenSettings} />
      <main className="page page--library">
        <ContinueReadingCard
          chapterTitle={activeChapter.title}
          hasProgress={Boolean(lastRead)}
          onContinue={onContinue}
          partTitle={activePart.title}
          progressPercent={lastRead?.progressPercent ?? 0}
        />
        <PartShelf
          onOpenPart={onOpenPart}
          parts={novelParts}
          progressMap={progressMap}
        />
        <section className="shelf shelf--compact" aria-labelledby="characters-heading">
          <div className="section-heading">
            <h2 id="characters-heading">Characters</h2>
            <span>Novel universe</span>
          </div>
          <div className="mini-rail">
            {characters.map((name) => (
              <article className="mini-card" key={name}>
                <span>{name.slice(0, 1)}</span>
                <strong>{name}</strong>
              </article>
            ))}
          </div>
        </section>
        <section className="shelf shelf--compact" aria-labelledby="lore-heading">
          <div className="section-heading">
            <h2 id="lore-heading">Lore Notes</h2>
            <span>Reading companions</span>
          </div>
          <div className="mini-rail">
            {loreNotes.map((name) => (
              <article className="mini-card mini-card--note" key={name}>
                <span>M</span>
                <strong>{name}</strong>
              </article>
            ))}
          </div>
        </section>
        <p className="library-note">{uiCopy.noProgress}</p>
      </main>
    </Layout>
  );
}
