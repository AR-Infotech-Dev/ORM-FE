import {
  UserPlus,
  Users,
  UserCheck,
  Clock,
} from "lucide-react";

const cards = [
  {
    title: "Direct Reports",
    value: "2",
    subtitle: "Reports Directly To You",
    icon: UserPlus,
    color: "bg-blue-200",
    iconColor: "text-blue-500",
  },
  {
    title: "Total Team",
    value: "12",
    subtitle: "Across All Levels",
    icon: Users,
    color: "bg-green-200",
    iconColor: "text-green-500",
  },
  {
    title: "Active Members",
    value: "11",
    subtitle: "Currently Active",
    icon: UserCheck,
    color: "bg-purple-200",
    iconColor: "text-purple-500",
  },
  {
    title: "Pending Follow-ups",
    value: "7",
    subtitle: "Across Your Team",
    icon: Clock,
    color: "bg-orange-200",
    iconColor: "text-orange-500",
  },
];

const MyTeamCards = () => {

  return (
    <div className="my-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="w-full min-h-fit rounded-sm bg-white px-4 py-1 shadow-xs border border-slate-50 transition hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${card.color}`}>
                  <Icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs m-0 font-medium text-gray-500">{card.title}</p>
                  <h6 className="text-sm font-bold">{card.value}</h6>
                  <p className="truncate m-0 text-xs text-gray-400">{card.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyTeamCards;