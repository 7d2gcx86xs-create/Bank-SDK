import React from "react";
import { createRoot } from "react-dom/client";
import { useWidgetProps } from "../use-widget-props";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const FALLBACK_HOLDINGS = [
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
];

function formatCurrency(value) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

function formatPercent(value) {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return "0%";
  }
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function HoldingsDetailApp() {
  const props = useWidgetProps(() => ({ holdings: FALLBACK_HOLDINGS })) ?? {};
  const holdings = props.holdings ?? FALLBACK_HOLDINGS;

  const totalValue = holdings.reduce((sum, holding) => sum + (holding.value ?? 0), 0);
  const totalDayChange = holdings.reduce(
    (sum, holding) => sum + (holding.change ?? 0),
    0
  );

  return (
    <div className="min-h-full w-full rounded-3xl bg-white p-5 text-black">
      <div className="mb-4 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Holdings detail</h1>
        <p className="text-sm text-black/60">
          {holdings.length} positions · {formatCurrency(totalValue)} total value
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-black/5 shadow-sm">
        <table className="min-w-full divide-y divide-black/5">
          <thead className="bg-black/3 text-left text-xs font-medium uppercase tracking-wide text-black/70">
            <tr>
              <th className="px-4 py-3">Symbol</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3 text-right">Shares</th>
              <th className="px-4 py-3 text-right">Avg price</th>
              <th className="px-4 py-3 text-right">Last price</th>
              <th className="px-4 py-3 text-right">Value</th>
              <th className="px-4 py-3 text-right">Day change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 text-sm">
            {holdings.map((holding) => {
              const changePositive = (holding.change ?? 0) >= 0;
              const ChangeIcon = changePositive ? ArrowUpRight : ArrowDownRight;

              return (
                <tr key={holding.symbol} className="hover:bg-black/3">
                  <td className="px-4 py-3 font-semibold tracking-tight">
                    {holding.symbol}
                  </td>
                  <td className="px-4 py-3 text-black/70">{holding.name}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    {holding.shares?.toLocaleString() ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-right text-black/70">
                    {formatCurrency(holding.avgPrice)}
                  </td>
                  <td className="px-4 py-3 text-right text-black/70">
                    {formatCurrency(holding.currentPrice)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatCurrency(holding.value)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`inline-flex items-center justify-end gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                        changePositive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <ChangeIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {formatCurrency(holding.change)}
                      <span className="opacity-70">
                        ({formatPercent(holding.changePercent)})
                      </span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-black/60">
        <div>
          Total day change:
          <span
            className={`${
              totalDayChange >= 0 ? "text-emerald-600" : "text-red-600"
            } font-semibold ml-1`}
          >
            {formatCurrency(totalDayChange)}
          </span>
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-black/20" aria-hidden="true" />
        <div>Prices delayed ~15 minutes</div>
      </div>
    </div>
  );
}

function render() {
  const container = document.getElementById("holdings-detail-root");
  if (!container) return;

  createRoot(container).render(<HoldingsDetailApp />);
}

render();

export { HoldingsDetailApp as App };
export default HoldingsDetailApp;
