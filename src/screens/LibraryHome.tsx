import { useState } from "react";
import {
  characterNotes,
  loreNoteDetails,
  type CompanionItem
} from "../content/companion";
import { getChapter, getFirstChapter, getPart, novelParts } from "../content/novel";
import { uiCopy } from "../content/uiCopy";
import { Button } from "../components/Button";
import { ContinueReadingCard } from "../components/ContinueReadingCard";
import { Layout } from "../components/Layout";
import { PartShelf } from "../components/PartShelf";
import { Sheet } from "../components/Sheet";
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

const COMPANION_PREVIEW_LIMIT = 6;

export function LibraryHome({
  lastRead,
  progressMap,
  onContinue,
  onOpenPart,
  onOpenSettings
}: LibraryHomeProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCompanionItem, setSelectedCompanionItem] =
    useState<CompanionItem | null>(null);
  const [showAllCharacters, setShowAllCharacters] = useState(false);
  const [showAllLoreNotes, setShowAllLoreNotes] = useState(false);
  const fallback = getFirstChapter();
  const activePart = lastRead ? getPart(lastRead.partId) ?? fallback.part : fallback.part;
  const activeChapter = lastRead
    ? getChapter(lastRead.partId, lastRead.chapterId) ?? fallback.chapter
    : fallback.chapter;
  const visibleCharacters = showAllCharacters
    ? characterNotes
    : characterNotes.slice(0, COMPANION_PREVIEW_LIMIT);
  const visibleLoreNotes = showAllLoreNotes
    ? loreNoteDetails
    : loreNoteDetails.slice(0, COMPANION_PREVIEW_LIMIT);

  function closeMenu() {
    setMenuOpen(false);
  }

  function scrollToSection(id: string) {
    closeMenu();
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
  }

  return (
    <Layout>
      <TopBar onMenu={() => setMenuOpen(true)} onSettings={onOpenSettings} />
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
            <span>
              {visibleCharacters.length} of {characterNotes.length} biographies
            </span>
          </div>
          <div className="mini-rail">
            {visibleCharacters.map((item) => (
              <button
                aria-label={`Open biography for ${item.name}`}
                className="mini-card"
                key={item.id}
                onClick={() => setSelectedCompanionItem(item)}
                type="button"
              >
                <span className="mini-card__sigil">{item.initial}</span>
                <span className="mini-card__category">{item.origin}</span>
                <strong>{item.name}</strong>
                <small>{item.role}</small>
                <em>{item.subtitle}</em>
              </button>
            ))}
          </div>
          {characterNotes.length > COMPANION_PREVIEW_LIMIT ? (
            <div className="shelf-actions">
              <Button
                aria-expanded={showAllCharacters}
                onClick={() => setShowAllCharacters((isOpen) => !isOpen)}
                type="button"
                variant="secondary"
              >
                {showAllCharacters ? "Show Fewer" : "Show All Characters"}
              </Button>
            </div>
          ) : null}
        </section>
        <section className="shelf shelf--compact" aria-labelledby="lore-heading">
          <div className="section-heading">
            <h2 id="lore-heading">Lore Notes</h2>
            <span>
              {visibleLoreNotes.length} of {loreNoteDetails.length} field notes
            </span>
          </div>
          <div className="mini-rail">
            {visibleLoreNotes.map((item) => (
              <button
                aria-label={`Open lore note for ${item.name}`}
                className="mini-card mini-card--note"
                key={item.id}
                onClick={() => setSelectedCompanionItem(item)}
                type="button"
              >
                <span className="mini-card__sigil">{item.initial}</span>
                <span className="mini-card__category">{item.origin}</span>
                <strong>{item.name}</strong>
                <small>{item.role}</small>
                <em>{item.subtitle}</em>
              </button>
            ))}
          </div>
          {loreNoteDetails.length > COMPANION_PREVIEW_LIMIT ? (
            <div className="shelf-actions">
              <Button
                aria-expanded={showAllLoreNotes}
                onClick={() => setShowAllLoreNotes((isOpen) => !isOpen)}
                type="button"
                variant="secondary"
              >
                {showAllLoreNotes ? "Show Fewer" : "Show All Lore Notes"}
              </Button>
            </div>
          ) : null}
        </section>
        <p className="library-note">{uiCopy.noProgress}</p>
      </main>
      <Sheet
        description="Move through the Morningstar manuscript."
        onClose={closeMenu}
        open={menuOpen}
        title="Library Menu"
      >
        <nav aria-label="Library sections" className="library-menu">
          <Button
            onClick={() => {
              closeMenu();
              onContinue();
            }}
            type="button"
          >
            {lastRead ? uiCopy.continueReading : uiCopy.startReading}
          </Button>
          <button onClick={() => scrollToSection("parts-heading")} type="button">
            <span>Parts</span>
            <small>{novelParts.length} volumes</small>
          </button>
          <button onClick={() => scrollToSection("characters-heading")} type="button">
            <span>Characters</span>
            <small>Novel universe</small>
          </button>
          <button onClick={() => scrollToSection("lore-heading")} type="button">
            <span>Lore Notes</span>
            <small>Reading companions</small>
          </button>
          <button
            onClick={() => {
              closeMenu();
              onOpenSettings();
            }}
            type="button"
          >
            <span>Reader Settings</span>
            <small>Theme and reading style</small>
          </button>
        </nav>
      </Sheet>
      <Sheet
        className="sheet--biography"
        description={selectedCompanionItem?.role}
        onClose={() => setSelectedCompanionItem(null)}
        open={Boolean(selectedCompanionItem)}
        title={selectedCompanionItem?.name ?? "Biography"}
      >
        {selectedCompanionItem ? (
          <article className="companion-detail" aria-label={`${selectedCompanionItem.name} biography`}>
            <header className="companion-detail__hero">
              <span className="companion-detail__sigil" aria-hidden="true">
                {selectedCompanionItem.initial}
              </span>
              <div>
                <p className="eyebrow">{selectedCompanionItem.category}</p>
                <p className="companion-detail__tagline">
                  {selectedCompanionItem.subtitle}
                </p>
                <p className="companion-detail__origin">
                  {selectedCompanionItem.origin}
                </p>
              </div>
            </header>

            <section className="companion-detail__section" aria-labelledby="biography-heading">
              <h3 id="biography-heading">Biography</h3>
              {selectedCompanionItem.biography.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>

            <dl className="companion-profile-grid">
              {selectedCompanionItem.profile.map((detail) => (
                <div className="companion-profile-card" key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>

            <section className="companion-detail__section" aria-labelledby="relationships-heading">
              <h3 id="relationships-heading">Relationships</h3>
              <ul>
                {selectedCompanionItem.relationships.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </section>

            <section className="companion-detail__section" aria-labelledby="morningstar-heading">
              <h3 id="morningstar-heading">In Morningstar</h3>
              <ul>
                {selectedCompanionItem.inMorningstar.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </section>
          </article>
        ) : null}
      </Sheet>
    </Layout>
  );
}
