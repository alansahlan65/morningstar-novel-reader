import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  reader?: boolean;
};

export function Layout({ children, reader = false }: LayoutProps) {
  return (
    <div className={reader ? "app-shell app-shell--reader" : "app-shell"}>
      {children}
    </div>
  );
}
