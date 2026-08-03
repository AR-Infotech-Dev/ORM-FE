// import React from "react";
// import { MoreVertical } from "lucide-react";

// const collectionHealthItems = [
//   {
//     label: "Collected",
//     percentage: 70,
//     amount: "₹8.70L",
//     color: "#469557",
//   },
//   {
//     label: "Outstanding",
//     percentage: 30,
//     amount: "₹3.70L",
//     color: " #D39857FF",
//   },
//   {
//     label: "Overdue",
//     percentage: 8,
//     amount: "₹0.99L",
//     color: " #CE3F49FF",
//   },
// ];

// const CollectionHealth = ({
//   title = "Collection Health",
//   items = collectionHealthItems,
//   onMenuClick,
// }) => {
//   return (
//     <div className="flex h-full min-h-[320px] w-full flex-col  border border-[#E5E7EB] bg-white p-5 shadow-xs">
//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between">
//         <h3 className="font-['Inter'] text-[18px] leading-[28px] font-semibold text-[#2A2B2F]">
//           {title}
//         </h3>

//         <button
//           type="button"
//           onClick={onMenuClick}
//           className="flex h-8 w-8 items-center justify-center rounded-md text-[#94A3B8] transition hover:bg-gray-100"
//         >
//           <MoreVertical size={18} />
//         </button>
//       </div>

//       {/* Body */}
//       <div className="flex flex-1 flex-col justify-start gap-7">
//         {items.map((item, index) => (
//           <div key={index}>
//             <div className="mb-2 flex items-center justify-between">
//               <span className="font-['Inter'] text-[12px] leading-[16px] font-medium text-[#646468]">
//                 {item.label}
//               </span>

//               <div className="flex items-center gap-3">
//                 <span className="font-['Inter'] text-[12px] leading-[16px] font-bold text-[#2A2B2F]">
//                   {item.percentage}%
//                 </span>

//                 <span
//                   className="font-['Inter'] text-[12px] leading-[16px] font-bold "
//                   style={{ color: item.color }}
//                 >
//                   {item.amount}
//                 </span>
//               </div>
//             </div>

//             <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#ECEFF3]">
//               <div
//                 className="h-full rounded-full"
//                 style={{
//                   width: `${item.percentage}%`,
//                   backgroundColor: item.color,
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function CollectionHealthDemo() {
//   return (
//     <div className="h-full w-full">
//       <CollectionHealth />
//     </div>
//   );
// }
import React from "react";
import { MoreVertical } from "lucide-react";

const collectionHealthItems = [
  {
    label: "Collected",
    percentage: 70,
    amount: "₹8.70L",
    color: "#469557",
  },
  {
    label: "Outstanding",
    percentage: 30,
    amount: "₹3.70L",
    color: " #D39857FF",
  },
  {
    label: "Overdue",
    percentage: 8,
    amount: "₹0.99L",
    color: " #CE3F49FF",
  },
];

const CollectionHealth = ({
  title = "Collection Health",
  items = collectionHealthItems,
  onMenuClick,
}) => {
  return (
    <div className="flex h-full min-h-[320px] w-full flex-col border border-[#E5E7EB] bg-white p-4 sm:p-5 shadow-xs">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <h3 className="font-['Inter'] text-[14px] leading-[28px] font-semibold text-[#2A2B2F]">
          {title}
        </h3>

        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#94A3B8] transition hover:bg-gray-100"
        >
          <MoreVertical size={18} />
        </button>

      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-start gap-7">

        {items.map((item, index) => (

          <div key={index} className="w-full min-w-0">

            <div className="mb-2 flex items-center justify-between gap-3">

              <span className="min-w-0 truncate font-['Inter'] text-[12px] leading-[16px] font-medium text-[#646468]">
                {item.label}
              </span>

              <div className="flex shrink-0 items-center gap-3">

                <span className="font-['Inter'] text-[12px] leading-[16px] font-bold text-[#2A2B2F]">
                  {item.percentage}%
                </span>

                <span
                  className="font-['Inter'] text-[12px] leading-[16px] font-bold"
                  style={{ color: item.color }}
                >
                  {item.amount}
                </span>

              </div>

            </div>

            <div className="h-[6px] w-full overflow-hidden rounded-full bg-[#ECEFF3]">

              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default function CollectionHealthDemo() {
  return (
    <div className="h-full w-full">
      <CollectionHealth />
    </div>
  );
}