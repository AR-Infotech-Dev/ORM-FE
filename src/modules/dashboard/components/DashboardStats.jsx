
import { Activity, IndianRupee, Wallet, ShoppingBag, ClipboardList, TrendingUp, TrendingDown, } from "lucide-react";
import { StatCard } from "./StatCard";

const EMPTY_STATS = [

  {
    key: "order-value",
    label: "Order Value",
    value: "₹12.40L",
    delta: "+18.6%",
    tone: "purple",
    icon: IndianRupee,
    deltaIcon: TrendingUp,
  },


  {
    key: "collections",
    label: "Collections",
    value: "₹8.70L",
    delta: "+15.3%",
    tone: "green",
    icon: Wallet,
    deltaIcon: TrendingUp,
  },
  {
    key: "outstanding",
    label: "Outstanding",
    value: "₹3.70L",
    delta: "+8.7%",
    tone: "orange",
    icon: ShoppingBag,
    redirectTo: "/outstanding",
    deltaIcon: TrendingUp,
  },
  {
    key: "Awaiting Approval",
    label: "Awaiting Approval",
    value: "₹12.40L",
    delta: "-14.3%",
    tone: "Blue",
    icon: ClipboardList,
    deltaIcon: TrendingDown,
    deltaColor: "text-red-500",
  },
];

export function DashboardStats({ stats = [] }) {
  const displayStats = stats.length ? stats : EMPTY_STATS;

  return (
    <section
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
      aria-label="Dashboard summary"
    >
      {displayStats.map((stat) => (
        <StatCard key={stat.key || stat.label} stat={stat} />
      ))}
    </section>
  );
}
