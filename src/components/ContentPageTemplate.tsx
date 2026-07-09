import type { ReactNode } from "react";
import { Breadcrumbs } from "./CategoryHero";

interface ContentPageTemplateProps {
  title: string;
  intro?: string;
  children: ReactNode;
}

export function ContentPageTemplate({ title, intro, children }: ContentPageTemplateProps) {
  return (
    <div>
      <header className="border-b bg-card">
        <div className="container-wk space-y-3 py-8 md:py-12">
          <Breadcrumbs items={[{ label: title }]} />
          <h1 className="text-2xl md:text-4xl">{title}</h1>
          {intro && <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{intro}</p>}
        </div>
      </header>
      <div className="container-wk py-8 md:py-12">
        <div className="prose-wk max-w-3xl">{children}</div>
      </div>
    </div>
  );
}
