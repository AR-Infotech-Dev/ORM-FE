

import React from "react";
import { ChevronRight } from "lucide-react";

const dealerData = [
  { rank: 1, name: "Shree Ganesh Traders", amount: "₹2.35L" },
  { rank: 2, name: "Kesar Distributors", amount: "₹2.10L" },
  { rank: 3, name: "Maa Durga Enterprises", amount: "₹1.80L" },
  { rank: 4, name: "S.V. Traders", amount: "₹1.45L" },
  { rank: 5, name: "Jai Mata Di Sales", amount: "₹1.20L" },
];

const TopDealers = ({
  title = "Top Dealers",
  dealers = dealerData,
  selectedSort = "By Order Value",
  onSortChange,
  onViewAll,
}) => {
  return (
    <div className="flex h-full min-h-[320px] w-full flex-col overflow-hidden border border-[#E5E7EB] bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-[#F1F5F9] px-5 py-4">

        <h3 className="min-w-0 font-['Inter'] text-[14px] leading-[28px] font-semibold text-[#2A2B2F]">
          {title}
        </h3>

        <button
          onClick={() => onSortChange?.(selectedSort)}
          className="flex items-center gap-1 rounded-md border border-[#E5E7EB] px-3 py-2 !text-[12px] text-[#475569] hover:bg-gray-50" >
          {selectedSort}

          <ChevronRight
            className="h-[12px] w-[12px] text-[#2A2B2F]"
            size={14}
          />
        </button>

      </div>

      {/* List */}
      <div className="flex-1 px-5 py-3">

        {dealers.map((dealer) => (
          <div
            key={dealer.rank}
            className="grid grid-cols-[28px_1fr_auto] items-center gap-3 py-3"
          >
            <span className="font-['Inter'] text-[14px] leading-[20px] font-normal text-[#919192]">
              {dealer.rank}
            </span>

            <span className="font-['Inter'] text-[14px] leading-[20px] font-medium text-[#2A2B2F]">
              {dealer.name}
            </span>

            <span className="font-['Inter'] text-[14px] leading-[20px] font-bold text-[#2A2B2F]">
              {dealer.amount}
            </span>
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="border-t border-[#E5E7EB]">

        <button
          onClick={onViewAll}
          className="flex h-12 w-full items-center justify-center gap-2 font-['Inter'] !text-[14px] leading-[20px] font-medium text-[#5344D0] 
          "
        >
          View all dealers
          <ChevronRight size={16} />
        </button>

      </div>
    </div>
  );
};

export default function TopDealersDemo() {
  return (
    <div className="h-full w-full">
      <TopDealers />
    </div>
  );
}