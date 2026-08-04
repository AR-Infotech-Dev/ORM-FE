// const teamData = [
//   {
//     initials: "RS",
//     name: "Rohit Sharma",
//     dealers: 28,
//     orderValue: "₹3.25L",
//     collection: "₹2.40L",
//     percentage: 74,
//   },
//   {
//     initials: "PN",
//     name: "Priya Nair",
//     dealers: 24,
//     orderValue: "₹2.85L",
//     collection: "₹2.15L",
//     percentage: 75,
//   },
//   {
//     initials: "AV",
//     name: "Amit Verma",
//     dealers: 22,
//     orderValue: "₹2.40L",
//     collection: "₹1.65L",
//     percentage: 69,
//   },
//   {
//     initials: "NI",
//     name: "Neha Iyer",
//     dealers: 18,
//     orderValue: "₹1.90L",
//     collection: "₹1.15L",
//     percentage: 61,
//   },
// ];

// export default function TeamPerformance() {
//   return (
//     <div className="w-full overflow-x-auto  border border-[#e5e7eb] bg-white shadow-xs">
//       {/* Header */}
//       <div className="border-b border-[#e5e7eb] px-4 py-4 sm:px-5">
//         <h3 className="font-['Inter'] text-[18px] leading-[28px] font-semibold text-[#2A2B2F]">
//           Team Performance
//         </h3>
//       </div>

//       {/* Table */}
//       <div className="min-w-[720px] px-4">
//         {/* Header */}
//         <div className="grid grid-cols-[1.4fr_0.7fr_1fr_1fr_1.2fr] items-center gap-2 border-b border-[#f0f1f3] py-4 font-['Inter'] text-[11px] leading-[17px] font-bold uppercase tracking-[0.02em] text-[#919192]">
//           <div>Salesperson</div>
//           <div >Dealers</div>
//           <div>Order Value (₹)</div>
//           <div>Collection (₹)</div>
//           <div>Collection %</div>
//         </div>

//         {/* Rows */}
//         {teamData.map((member) => (
//           <div
//             key={member.name}
//             className="
//               grid
//               grid-cols-[1.4fr_0.7fr_1fr_1fr_1.2fr]
//               items-center
//               gap-2
//               border-b
//               border-[#f0f1f3]
//               py-4
//             "
//           >
//             {/* Salesperson */}
//             <div className="flex min-w-0 items-center gap-3">
//               <div
//                 className="
//                   flex
//                   h-6
//                   w-6
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   bg-[#eef2ff]
//                   text-[9px]
//                   font-semibold
//                   text-[#6366f1]
//                 "
//               >
//                 {member.initials}
//               </div>

//               <span className="truncate font-['Inter'] text-[12px] leading-[16px] font-semibold text-[#2A2B2F]">
//                 {member.name}
//               </span>
//             </div>

//             {/* Dealers */}
//             <div className=" font-['Inter'] text-[12px] leading-[16px] font-normal text-[#4D4F53]">
//               {member.dealers}
//             </div>

//             {/* Order Value */}
//             <div className="font-['Inter'] text-[12px] leading-[16px] font-bold text-[#2A2B2F]">
//               {member.orderValue}
//             </div>

//             {/* Collection */}
//             <div className="font-['Inter'] text-[12px] leading-[16px] font-bold text-[#2A2B2F]">
//               {member.collection}
//             </div>

//             {/* Collection % */}
//             <div className="flex items-center gap-3">
//               <span className="w-8 font-['Inter'] text-[12px] leading-[16px] font-normal text-[#4D4F53]">
//                 {member.percentage}%
//               </span>

//               <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#eef0f3]">
//                 <div
//                   className="h-full rounded-full bg-[#469557FF]"
//                   style={{ width: `${member.percentage}%` }}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Footer */}
//       <div className="flex h-12 items-center justify-center border-t border-[#f0f1f3]">
//         <button className="flex items-center gap-2 font-['Inter'] text-[14px] leading-[20px] font-[5px] text-[#5344D0]">
//           View full team report
//           <span className="text-[16px]">›</span>
//         </button>
//       </div>
//     </div>
//   );
// }

const teamData = [
  {
    initials: "RS",
    name: "Rohit Sharma",
    dealers: 28,
    orderValue: "₹3.25L",
    collection: "₹2.40L",
    percentage: 74,
  },
  {
    initials: "PN",
    name: "Priya Nair",
    dealers: 24,
    orderValue: "₹2.85L",
    collection: "₹2.15L",
    percentage: 75,
  },
  {
    initials: "AV",
    name: "Amit Verma",
    dealers: 22,
    orderValue: "₹2.40L",
    collection: "₹1.65L",
    percentage: 69,
  },
  {
    initials: "NI",
    name: "Neha Iyer",
    dealers: 18,
    orderValue: "₹1.90L",
    collection: "₹1.15L",
    percentage: 61,
  },
];

export default function TeamPerformance() {
  return (
    <div className="w-full border border-[#e5e7eb] bg-white shadow-xs">
      {/* Header */}
      <div className="border-b border-[#e5e7eb] px-4 py-4 sm:px-5">
        <h3 className="font-['Inter'] text-[14px] leading-[28px] font-semibold text-[#2A2B2F]">
          Team Performance
        </h3>
      </div>

      {/* Table */}
      <div className="w-full px-3 sm:px-4">
       
       {/* Table Header */}
<div className="grid grid-cols-[1.4fr_0.7fr_1fr_1fr_1.2fr] items-center gap-2 border-b border-[#f0f1f3] py-4 font-['Inter'] text-[8px] leading-[12px] font-bold uppercase tracking-[0.02em] text-[#919192] sm:text-[11px] sm:leading-[17px]">
   <div>Salesperson</div>

  <div>Dealers</div>

  <div>
    <span className="sm:hidden">
      Order
    </span>

    <span className="hidden sm:inline">
      Order Value (₹)
    </span>
  </div>

  <div>
    <span className="sm:hidden">
      Collection
    </span>

    <span className="hidden sm:inline">
      Collection (₹)
    </span>
  </div>

  <div >Collection %</div>
</div>

        {/* Rows */}
        {teamData.map((member) => (
          <div
            key={member.name}
            className="grid grid-cols-[1.8fr_0.6fr_0.9fr_0.9fr_1.2fr] items-center gap-1 border-b border-[#f0f1f3] py-4 sm:grid-cols-[1.4fr_0.7fr_1fr_1fr_1.2fr] sm:gap-2"
          >
            {/* Salesperson */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-[9px] font-semibold text-[#6366f1]">
                {member.initials}
              </div>

              <span className="min-w-0 truncate font-['Inter'] text-[12px] leading-[16px] font-semibold text-[#2A2B2F]">
                {member.name}
              </span>
            </div>

            {/* Dealers */}
            <div className="min-w-0 font-['Inter'] text-[12px] leading-[16px] font-normal text-[#4D4F53]">
              {member.dealers}
            </div>

            {/* Order Value */}
            <div className="min-w-0 truncate font-['Inter'] text-[12px] leading-[16px] font-bold text-[#2A2B2F]">
              {member.orderValue}
            </div>

            {/* Collection */}
            <div className="min-w-0 truncate font-['Inter'] text-[12px] leading-[16px] font-bold text-[#2A2B2F]">
              {member.collection}
            </div>

            {/* Collection Percentage */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="shrink-0 font-['Inter'] text-[12px] leading-[16px] font-normal text-[#4D4F53]">
                {member.percentage}%
              </span>

              <div className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef0f3]">
                <div
                  className="h-full rounded-full bg-[#469557FF]"
                  style={{ width: `${member.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex h-12 items-center justify-center border-t border-[#f0f1f3]">
        <button className="flex items-center gap-2 font-['Inter'] !text-[14px] leading-[20px] font-medium text-[#5344D0]">
          View full team report
          <span className="text-[16px]">›</span>
        </button>
      </div>
    </div>
  );
}