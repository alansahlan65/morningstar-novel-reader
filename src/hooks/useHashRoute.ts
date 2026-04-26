export type Route =
  | { name: "library" }
  | { name: "part"; partId: string }
  | { name: "reader"; partId: string; chapterId: string };

export function parseHashRoute(hash: string): Route {
  const path = hash.replace(/^#\/?/, "");
  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "part" && segments[1]) {
    return { name: "part", partId: segments[1] };
  }

  if (segments[0] === "read" && segments[1] && segments[2]) {
    return { name: "reader", partId: segments[1], chapterId: segments[2] };
  }

  return { name: "library" };
}

export function toPartPath(partId: string): string {
  return `#/part/${partId}`;
}

export function toReaderPath(partId: string, chapterId: string): string {
  return `#/read/${partId}/${chapterId}`;
}

export function navigateTo(hash: string): void {
  if (window.location.hash === hash) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return;
  }

  window.location.hash = hash;
}
