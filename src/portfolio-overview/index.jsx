import React from "react";
import { createRoot } from "react-dom/client";
import { useWidgetProps } from "../use-widget-props";
import { DollarSign, LineChart, PiggyBank, TrendingUp } from "lucide-react";

const FALLBACK_PORTFOLIO = {
  totalValue: 125430.5,
  cash: 15230.25,
  dayChange: 2847.32,
  dayChangePercent: 2.32,
  holdings: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 50,
      avgPrice: 145.3,
      currentPrice: 178.25,
      value: 8912.5,
      change: 1647.5,
      changePercent: 22.66,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      shares: 30,
      avgPrice: 310.5,
      currentPrice: 378.85,
      value: 11365.5,
      change: 2050.5,
      changePercent: 22.03,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 75,
      avgPrice: 125.8,
      currentPrice: 142.15,
      value: 10661.25,
      change: 1226.25,
      changePercent: 12.99,
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      shares: 40,
      avgPrice: 220,
      currentPrice: 248.5,
      value: 9940,
      change: 1140,
      changePercent: 12.95,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      shares: 25,
      avgPrice: 450,
      currentPrice: 495.3,
      value: 12382.5,
      change: 1132.5,
      changePercent: 10.07,
    },
  ],
};

function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

function formatPercent(value) {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "0%";
  }
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function StatCard({ icon: Icon, label, value, helper, tone = "neutral" }) {
  const toneClasses = {
    neutral: "bg-white text-black",
    positive: "bg-emerald-50 text-emerald-900",
    accent: "bg-sky-50 text-sky-900",
  };

  const iconClasses = {
    neutral: "bg-black/5 text-black",
    positive: "bg-emerald-100 text-emerald-700",
    accent: "bg-sky-100 text-sky-700",
  };

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-black/5 p-4 shadow-sm ${
        toneClasses[tone]
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium uppercase tracking-wide opacity-70">
          {label}
        </div>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full ${iconClasses[tone]}`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
      </div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      {helper ? (
        <div className="text-sm opacity-70">{helper}</div>
      ) : null}
    </div>
  );
}

function HoldingsList({ holdings }) {
  const topHoldings = [...(holdings ?? [])]
    .sort((a, b) => (b?.value ?? 0) - (a?.value ?? 0))
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight">
          Top holdings
        </h2>
        <span className="text-xs uppercase tracking-wide text-black/50">
          Value
        </span>
      </div>
      <div className="space-y-3">
        {topHoldings.map((holding) => {
          const changePositive = (holding?.change ?? 0) >= 0;
          return (
            <div
              key={holding.symbol}
              className="flex items-center justify-between rounded-xl bg-black/2 px-3 py-2"
            >
              <div>
                <div className="text-sm font-semibold tracking-tight">
                  {holding.symbol}
                </div>
                <div className="text-xs text-black/60">{holding.name}</div>
              </div>
              <div className="text-right text-sm font-medium">
                <div>{formatCurrency(holding.value)}</div>
                <div
                  className={`text-xs ${
                    changePositive ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {formatPercent(holding.changePercent)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PortfolioOverviewApp() {
  const props = useWidgetProps(() => ({ portfolio: FALLBACK_PORTFOLIO })) ?? {};
  const portfolio = props.portfolio ?? FALLBACK_PORTFOLIO;

  const summaryCards = [
    {
      label: "Total portfolio",
      value: formatCurrency(portfolio.totalValue),
      helper: `${formatCurrency(portfolio.dayChange)} today (${formatPercent(
        portfolio.dayChangePercent
      )})`,
      icon: LineChart,
      tone: "accent",
    },
    {
      label: "Cash available",
      value: formatCurrency(portfolio.cash),
      helper: "Ready to invest",
      icon: PiggyBank,
      tone: "neutral",
    },
    {
      label: "Day change",
      value: formatCurrency(portfolio.dayChange),
      helper: formatPercent(portfolio.dayChangePercent),
      icon: TrendingUp,
      tone: "positive",
    },
    {
      label: "Total holdings",
      value: `${portfolio.holdings?.length ?? 0} positions`,
      helper: "Diversified across sectors",
      icon: DollarSign,
      tone: "neutral",
    },
  ];

  return (
    <div className="min-h-full w-full rounded-3xl bg-[#f4f7fb] p-5 text-black">
      <div className="mb-5 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Portfolio snapshot
        </h1>
        <p className="text-sm text-black/60">
          Updated {new Date().toLocaleString(undefined, { hour: "numeric", minute: "2-digit" })}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight">
              Allocation overview
            </h2>
            <span className="text-xs uppercase tracking-wide text-black/50">
              Holdings
            </span>
          </div>
          <div className="space-y-4">
            {(portfolio.holdings ?? []).map((holding) => {
              const weight = Math.max(
                4,
                Math.min(
                  100,
                  Math.round(
                    ((holding.value ?? 0) / (portfolio.totalValue || 1)) * 100
                  )
                )
              );

              return (
                <div key={holding.symbol}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-sm font-semibold tracking-tight">
                        {holding.symbol}
                      </div>
                      <div className="text-xs text-black/60">{holding.name}</div>
                    </div>
                    <div className="text-right text-sm font-medium">
                      {formatCurrency(holding.value)}
                    </div>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-black/5">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500"
                      style={{ width: `${weight}%` }}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <HoldingsList holdings={portfolio.holdings} />
      </div>
    </div>
  );
}

function render() {
  const container = document.getElementById("portfolio-overview-root");
  if (!container) return;

  createRoot(container).render(<PortfolioOverviewApp />);
}

render();

export { PortfolioOverviewApp as App };
export default PortfolioOverviewApp;
