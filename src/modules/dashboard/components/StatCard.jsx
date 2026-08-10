

import {
  Activity,
  Info,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useRedirectFilter } from "../hooks/useRedirectFilter";

export function StatCard({ stat }) {
  const navigate = useNavigate();
  const { applyTicketRedirectFilter } = useRedirectFilter();

  const Icon = stat.icon || Activity;

  // delta value read करून condition
  const isNegative = String(stat.delta).trim().startsWith("-");

  const DeltaIcon = isNegative
    ? TrendingDown
    : TrendingUp;

  const deltaColor = isNegative
    ? "text-[#CE3F49FF]"
    : "text-[#469557FF]";

  const handleNavigate = () => {
    if (stat.redirectTo) {
      applyTicketRedirectFilter(stat.label, stat.redirectTo);
      navigate(stat.redirectTo);
    }
  };

  return (
    <article
      onClick={handleNavigate}
      className="group relative min-h-[100px] cursor-pointer border border-[#e5e7eb] bg-white px-5 py-4 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sm"
    >
      {/* Top Content */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-normal text-[#555]">
            {stat.label}
          </span>

          <strong className="text-[15px] font-bold leading-7 text-[#303030]">
            {stat.value}
          </strong>
        </div>

        <div className="flex items-center gap-3">
          <Info
            size={11}
            strokeWidth={1.5}
            className="mt-1 text-[#777]"
          />

          <div
            className={`
              flex h-7 w-7 items-center justify-center rounded-full
              ${
                stat.tone === "purple"
                  ? "bg-[#f0edff] text-[#6555c9]"
                  : stat.tone === "green"
                  ? "bg-[#e5f5e9] text-[#38a169]"
                  : stat.tone === "Blue"
                  ? "bg-[#eef4ff] text-[#5953B5]"
                  : "bg-[#fff3df] text-[#e99a32]"
              }
            `}
          >
            <Icon size={12} strokeWidth={1.8} />
          </div>
        </div>
      </div>

      {/* Bottom Delta */}
      <div className="absolute bottom-4 left-4.5 flex items-center gap-1">
        <DeltaIcon
          size={13}
          strokeWidth={2}
          className={deltaColor}
        />

        <span
          className={`text-[12px] font-medium ${deltaColor}`}
        >
          {stat.delta}
        </span>

        <span className="text-[11px] text-[#999]">
          vs last month
        </span>
      </div>
    </article>
  );
}