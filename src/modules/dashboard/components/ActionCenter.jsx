// import {
//   Clock3,
//   FileCheck2,
//   Users,
//   ArrowRight,
// } from "lucide-react";


// const defaultActions = [
//   {
//     id: 1,
//     title: "Orders awaiting approval",
//     count: 12,
//     icon: FileCheck2,
//     iconClass: "text-indigo-500 bg-indigo-50",
//     actionText: "Review Orders",
//   },
//   {
//     id: 2,
//     title: "Follow-ups due today",
//     count: 7,
//     icon: Clock3,
//     iconClass: "text-green-500 bg-green-50",
//     actionText: "View Follow-ups",
//   },
//   {
//     id: 3,
//     title: "Dealers near credit limit",
//     count: 4,
//     icon: Users,
//     iconClass: "text-orange-500 bg-orange-50",
//     actionText: "View Dealers",
//   },
// ];

// const ActionCenter = ({
//   title = "Action Center",
//   items = defaultActions,
//   onAction,
// }) => {
//   return (
//     <div className="flex h-full min-h-[420px] flex-col  border border-[#E5E7EB] bg-white p-5 shadow-xs">
//       {/* Header */}
//       <h3 className="mb-4 text-[15px] font-semibold text-gray-800">
//         {title}
//       </h3>

//       {/* Action Items */}
//       <div className="space-y-4">
//         {items.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.id}
//               className="flex items-center justify-between gap-3"
//             >
//               {/* Left Content */}
//               <div className="flex min-w-0 items-center gap-3">
//                 {/* Icon */}
//                 <div
//                   className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
//                 >
//                   <Icon size={20} strokeWidth={1.8} />
//                 </div>

//                 {/* Text */}
//                 <div className="min-w-0">
//                   <p className="font-['Inter'] text-[16px] leading-[24px] font-bold text-[#2A2B2F]">
//                     {item.count}
//                   </p>

//                   <p className="truncate text-[12px] leading-[16px] font-normal font-['Inter'] text-[#7F7F81]">
//                     {item.title}
//                   </p>
//                 </div>
//               </div>

//               {/* Action Button */}
//               <button
//                 type="button"
//                 onClick={() => onAction?.(item)}
//                 className="flex shrink-0 items-center gap-1 font-['Inter'] text-[12px] leading-[20px] font-medium text-[#5344D0] transition hover:text-indigo-700"
//               >
//                 {item.actionText}
//                 <ArrowRight size={9} />
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default ActionCenter;


import {
  Clock3,
  FileCheck2,
  Users,
  ArrowRight,
} from "lucide-react";

const defaultActions = [
  {
    id: 1,
    title: "Orders awaiting approval",
    count: 12,
    icon: FileCheck2,
    iconClass: "text-indigo-500 bg-indigo-50",
    actionText: "Review Orders",
  },
  {
    id: 2,
    title: "Follow-ups due today",
    count: 7,
    icon: Clock3,
    iconClass: "text-green-500 bg-green-50",
    actionText: "View Follow-ups",
  },
  {
    id: 3,
    title: "Dealers near credit limit",
    count: 4,
    icon: Users,
    iconClass: "text-orange-500 bg-orange-50",
    actionText: "View Dealers",
  },
];

const ActionCenter = ({
  title = "Action Center",
  items = defaultActions,
  onAction,
}) => {
  return (
    <div className="flex h-full min-h-[420px] w-full flex-col border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-xs">

      {/* Header */}
      <h3 className="mb-4 text-[14px] font-semibold text-gray-800">
        {title}
      </h3>

      {/* Desktop View */}
      <div className="hidden space-y-4 sm:block">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3"
            >
              {/* Left Content */}
              <div className="flex min-w-0 items-center gap-3">

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">

                  <p className="font-['Inter'] text-[16px] leading-[24px] font-bold text-[#2A2B2F]">
                    {item.count}
                  </p>

                  <p className="truncate font-['Inter'] text-[12px] leading-[16px] font-normal text-[#7F7F81]">
                    {item.title}
                  </p>

                </div>

              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => onAction?.(item)}
                className="flex shrink-0 items-center gap-1 whitespace-nowrap  ransition hover:bg-indigo-700 hover:text-white font-['Inter'] text-[12px] leading-[20px] font-medium text-[#5344D0] px-3 py-1 rounded-md border border-[#E5E7EB]"
              >
                <span className="font-['Inter'] text-[12px] leading-[20px] font-medium text-[#5344D0] hover:text-white">
                  {item.actionText}
                </span>
                <ArrowRight size={9} />
              </button>

            </div>
          );
        })}

      </div>

      {/* Mobile View */}
      <div className="space-y-3 sm:hidden">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="grid grid-cols-[48px_1fr] gap-3"
            >

              {/* Icon */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${item.iconClass}`}
              >
                <Icon size={20} strokeWidth={1.8} />
              </div>

              {/* Content */}
              <div className="min-w-0">

                {/* Count */}
                <p className="font-['Inter'] text-[16px] leading-[24px] font-bold text-[#2A2B2F]">
                  {item.count}
                </p>

                {/* Title */}
                <p className="truncate font-['Inter'] text-[12px] leading-[16px] font-normal text-[#7F7F81]">
                  {item.title}
                </p>

                {/* Action */}
                <button
                  type="button"
                  onClick={() => onAction?.(item)}
                  className="mt-2 flex items-center gap-1 whitespace-nowrap font-['Inter'] !text-[12px] leading-[20px] font-medium text-[#5344D0] transition hover:text-indigo-700"
                >
                  {item.actionText}
                  <ArrowRight size={9} />
                </button>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default ActionCenter;