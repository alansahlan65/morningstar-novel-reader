import { useEffect, useState } from "react";
import { getChapter, getFirstChapter, getPart } from "./content/novel";
import { ReaderSettingsSheet } from "./components/ReaderSettingsSheet";
import {
  navigateTo,
  parseHashRoute,
  toPartPath,
  toReaderPath
} from "./hooks/useHashRoute";
import { useReaderSettings } from "./hooks/useReaderSettings";
import { useTheme } from "./hooks/useTheme";
import { LibraryHome } from "./screens/LibraryHome";
import { PartDetail } from "./screens/PartDetail";
import { Reader } from "./screens/Reader";
import { getLastRead, getProgressMap } from "./utils/storage";

function getStoredReadingState() {
  return {
    lastRead: getLastRead(),
    progressMap: getProgressMap()
  };
}

export default function App() {
  const [route, setRoute] = useState(() => parseHashRoute(window.location.hash));
  const [{ lastRead, progressMap }, setReadingState] = useState(
    getStoredReadingState
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const theme = useTheme();
  const reader = useReaderSettings();

  useEffect(() => {
    function handleRouteChange() {
      setRoute(parseHashRoute(window.location.hash));
    }

    window.addEventListener("hashchange", handleRouteChange);
    return () => window.removeEventListener("hashchange", handleRouteChange);
  }, []);

  function refreshReadingState() {
    setReadingState(getStoredReadingState());
  }

  function continueReading() {
    const fallback = getFirstChapter();
    navigateTo(
      toReaderPath(
        lastRead?.partId ?? fallback.part.id,
        lastRead?.chapterId ?? fallback.chapter.id
      )
    );
  }

  function renderRoute() {
    if (route.name === "part") {
      const part = getPart(route.partId);

      if (part) {
        return (
          <PartDetail
            onBack={() => navigateTo("#/")}
            onOpenSettings={() => setSettingsOpen(true)}
            onReadChapter={(chapterId) => navigateTo(toReaderPath(part.id, chapterId))}
            part={part}
            progressMap={progressMap}
          />
        );
      }
    }

    if (route.name === "reader") {
      const part = getPart(route.partId);
      const chapter = getChapter(route.partId, route.chapterId);

      if (part && chapter) {
        return (
          <Reader
            chapter={chapter}
            onBack={() => navigateTo(toPartPath(part.id))}
            onOpenChapter={(partId, chapterId) =>
              navigateTo(toReaderPath(partId, chapterId))
            }
            onProgressSaved={refreshReadingState}
            onReaderSettingsChange={reader.setSettings}
            onResetReaderSettings={reader.resetSettings}
            onThemeChange={theme.setPreference}
            onToggleTheme={theme.toggleResolvedTheme}
            part={part}
            progressMap={progressMap}
            readerSettings={reader.settings}
            resolvedTheme={theme.resolvedTheme}
            themePreference={theme.preference}
          />
        );
      }
    }

    return (
      <LibraryHome
        lastRead={lastRead}
        onContinue={continueReading}
        onOpenPart={(partId) => navigateTo(toPartPath(partId))}
        onOpenSettings={() => setSettingsOpen(true)}
        progressMap={progressMap}
      />
    );
  }

  return (
    <>
      {renderRoute()}
      <ReaderSettingsSheet
        onClose={() => setSettingsOpen(false)}
        onReset={reader.resetSettings}
        onSettingsChange={reader.setSettings}
        onThemeChange={theme.setPreference}
        open={settingsOpen}
        settings={reader.settings}
        themePreference={theme.preference}
      />
    </>
  );
}
