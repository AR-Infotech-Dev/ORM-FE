import {
  Clock3,
  UserX,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "Orders awaiting approval",
    count: 3,
    countColor: "text-[#F59E0B]",
    icon: ClipboardList,
    bg: "bg-[#FFF7ED]",
    iconColor: "text-[#F59E0B]",
  },
  {
    id: 2,
    title: "Follow-ups due",
    count: 7,
    countColor: "text-[#EF4444]",
    icon: Clock3,
    bg: "bg-[#FEF2F2]",
    iconColor: "text-[#EF4444]",
  },
  {
    id: 3,
    title: "Inactive members",
    count: 1,
    countColor: "text-[#3B82F6]",
    icon: UserX,
    bg: "bg-[#EFF6FF]",
    iconColor: "text-[#3B82F6]",
  },
];

export default function TeamAlertsCard() {
  return (
    <div className="rounded-sm border border-[#E5E7EB] bg-white shadow-sm mt-2">
      <div className=" border-[#E5E7EB] px-5 py-1.5 pb-1">
        <h3 className="text-sm ml-0.5 font-bold text-[#374151]">Team Alerts</h3>
      </div>

      <div className="px-5 py-1.5 space-y-1.5 pb-2">
        {alerts.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`flex w-full items-center justify-between rounded-sm px-3 py-2 transition hover:opacity-90 ${item.bg}`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${item.iconColor}`} />
                <span className="text-xs text-[#4B5563]">{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${item.countColor}`}>{item.count}</span>
                <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}