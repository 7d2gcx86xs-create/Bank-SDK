import React from "react";
import { createRoot } from "react-dom/client";
import { useWidgetProps } from "../use-widget-props";
import { Globe2, Newspaper, Share2 } from "lucide-react";

const FALLBACK_NEWS = {
  symbols: ["AAPL", "MSFT", "GOOGL"],
  news: [
    {
      title: "Tech giants lead market rebound",
      source: "Financial Times",
      url: "https://example.com/news/tech-rebound",
      publishedAt: new Date().toISOString(),
      snippet:
        "AAPL, MSFT, and GOOGL drive gains as investors rotate back into mega-cap tech ahead of earnings.",
    },
    {
      title: "Cloud investments accelerate for Microsoft",
      source: "Bloomberg",
      url: "https://example.com/news/msft-cloud",
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      snippet:
        "Azure revenue growth surprises to the upside as enterprise demand remains resilient.",
    },
  ],
};

function formatRelativeTime(dateLike) {
  const date = dateLike ? new Date(dateLike) : null;
  if (!date || Number.isNaN(date.getTime())) {
    return "Just now";
  }

  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.round(diff / (1000 * 60));
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function openExternal(url) {
  if (!url) return;
  if (window.openai?.openExternal) {
    window.openai.openExternal({ href: url });
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

function NewsFeedApp() {
  const props =
    useWidgetProps(() => ({ news: FALLBACK_NEWS.news, symbols: FALLBACK_NEWS.symbols })) ?? {};
  const news = props.news ?? FALLBACK_NEWS.news;
  const symbols = props.symbols ?? FALLBACK_NEWS.symbols;

  return (
    <div className="min-h-full w-full rounded-3xl bg-[#0b1426] p-5 text-white">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Portfolio news radar</h1>
          <p className="text-sm text-white/70">
            Tracking headlines for {symbols.join(", ")}
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/80">
          <Globe2 className="h-3.5 w-3.5" strokeWidth={1.75} />
          Live market coverage
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {news.map((article) => (
          <article
            key={`${article.source}-${article.title}`}
            className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-white/60">
                <Newspaper className="h-3.5 w-3.5" strokeWidth={1.75} />
                {article.source}
                <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
                {formatRelativeTime(article.publishedAt)}
              </div>
              <h2 className="text-lg font-semibold leading-tight text-white">
                {article.title}
              </h2>
              <p className="text-sm text-white/70">{article.snippet}</p>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-white/70">
              <div className="flex flex-wrap items-center gap-2">
                {symbols.map((symbol) => (
                  <span
                    key={`${article.title}-${symbol}`}
                    className="rounded-full bg-white/10 px-2 py-1 text-xs font-medium"
                  >
                    {symbol}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => openExternal(article.url)}
                className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/25"
              >
                Read more
                <Share2 className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function render() {
  const container = document.getElementById("news-feed-root");
  if (!container) return;

  createRoot(container).render(<NewsFeedApp />);
}

render();

export { NewsFeedApp as App };
export default NewsFeedApp;
