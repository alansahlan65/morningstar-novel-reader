import { uiCopy } from "../content/uiCopy";
import { IconButton } from "./Button";
import { BackIcon, MenuIcon, MoreIcon } from "./icons";

type TopBarProps = {
  eyebrow?: string;
  title?: string;
  onBack?: () => void;
  onSettings?: () => void;
};

export function TopBar({
  eyebrow = uiCopy.libraryEyebrow,
  title = uiCopy.appTitle,
  onBack,
  onSettings
}: TopBarProps) {
  return (
    <header className="top-bar">
      <IconButton
        label={onBack ? "Back to library" : "Open menu"}
        onClick={onBack}
        type="button"
      >
        {onBack ? <BackIcon /> : <MenuIcon />}
      </IconButton>
      <div className="top-bar__title">
        <p>{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      <IconButton label="Reader settings" onClick={onSettings} type="button">
        <MoreIcon />
      </IconButton>
    </header>
  );
}
