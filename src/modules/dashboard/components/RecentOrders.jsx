



// // import { MoreVertical, ChevronRight } from "lucide-react";

// // const orders = [
// //   {
// //     id: 1,
// //     orderNo: "ORD-2025-1287",
// //     dealer: "Shree Ganesh Traders",
// //     salesperson: "Rohit Sharma",
// //     value: "₹1.25L",
// //     status: "DRAFT",
// //   },
// //   {
// //     id: 2,
// //     orderNo: "ORD-2025-1286",
// //     dealer: "Maa Durga Enterprises",
// //     salesperson: "Priya Nair",
// //     value: "₹85,000",
// //     status: "SUBMITTED",
// //   },
// //   {
// //     id: 3,
// //     orderNo: "ORD-2025-1285",
// //     dealer: "Kesar Distributors",
// //     salesperson: "Amit Verma",
// //     value: "₹1.75L",
// //     status: "APPROVED",
// //   },
// //   {
// //     id: 4,
// //     orderNo: "ORD-2025-1284",
// //     dealer: "S.V. Traders",
// //     salesperson: "Nisha Iyer",
// //     value: "₹65,500",
// //     status: "SUBMITTED",
// //   },
// //   {
// //     id: 5,
// //     orderNo: "ORD-2025-1283",
// //     dealer: "Jai Mata Di Sales",
// //     salesperson: "Rohit Sharma",
// //     value: "₹2.10L",
// //     status: "APPROVED",
// //   },
// // ];

// // const statusStyles = {
// //   DRAFT: "bg-gray-100 text-gray-500",
// //   SUBMITTED: "bg-purple-100 text-purple-600",
// //   APPROVED: "bg-green-100 text-green-600",
// // };

// // const RecentOrders = () => {
// //   return (
// //     <section className="w-full overflow-hidden rounded-sm border border-gray-200 bg-white">
// //       {/* Header */}
// //       <div className="flex h-[42px] items-center justify-between border-b border-gray-100 px-3">
// //         <h2 className="text-[10px] font-semibold text-gray-800">
// //           Recent Orders
// //         </h2>

// //         <div className="flex items-center gap-2">
// //           <select className="h-[22px] rounded-sm border border-gray-200 bg-white px-2 text-[7px] text-gray-600 outline-none">
// //             <option>All Status</option>
// //             <option>Draft</option>
// //             <option>Submitted</option>
// //             <option>Approved</option>
// //           </select>

// //           <button className="text-gray-400">
// //             <MoreVertical size={13} />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <table className="w-full table-fixed border-collapse">
// //         <thead>
// //           <tr className="border-b border-gray-100">
// //             <th className="px-3 py-2 text-left text-[7px] font-medium uppercase text-gray-400">
// //               Order No.
// //             </th>

// //             <th className="px-3 py-2 text-left text-[7px] font-medium uppercase text-gray-400">
// //               Dealer
// //             </th>

// //             <th className="px-3 py-2 text-left text-[7px] font-medium uppercase text-gray-400">
// //               Salesperson
// //             </th>

// //             <th className="px-3 py-2 text-left text-[7px] font-medium uppercase text-gray-400">
// //               Value
// //             </th>

// //             <th className="px-3 py-2 text-left text-[7px] font-medium uppercase text-gray-400">
// //               Status
// //             </th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {orders.map((order) => (
// //             <tr
// //               key={order.id}
// //               className="h-[29px] border-b border-gray-100"
// //             >
// //               <td className="truncate px-3 text-[7px] text-gray-600">
// //                 {order.orderNo}
// //               </td>

// //               <td className="truncate px-3 text-[7px] font-medium text-gray-700">
// //                 {order.dealer}
// //               </td>

// //               <td className="truncate px-3 text-[7px] text-gray-600">
// //                 {order.salesperson}
// //               </td>

// //               <td className="px-3 text-[7px] text-gray-600">
// //                 {order.value}
// //               </td>

// //               <td className="px-3">
// //                 <span
// //                   className={`rounded px-2 py-[2px] text-[6px] font-medium ${
// //                     statusStyles[order.status]
// //                   }`}
// //                 >
// //                   {order.status}
// //                 </span>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       {/* Footer */}
// //       <div className="flex h-[28px] items-center justify-center border-t border-gray-100">
// //         <button className="flex items-center gap-1 text-[8px] font-medium text-indigo-500">
// //           View all orders
// //           <ChevronRight size={10} />
// //         </button>
// //       </div>
// //     </section>
// //   );
// // };

// // export default RecentOrders;




// import { ChevronDown, MoreVertical, ChevronRight } from "lucide-react";

// const orders = [
//   {
//     orderNo: "ORD-2025-1287",
//     dealer: "Shree Ganesh Traders",
//     salesperson: "Rohit Sharma",
//     value: "₹1.25L",
//     status: "Draft",
//   },
//   {
//     orderNo: "ORD-2025-1286",
//     dealer: "Maa Durga Enterprises",
//     salesperson: "Priya Nair",
//     value: "₹85,000",
//     status: "Submitted",
//   },
//   {
//     orderNo: "ORD-2025-1285",
//     dealer: "Kesar Distributors",
//     salesperson: "Amit Verma",
//     value: "₹1.75L",
//     status: "Approved",
//   },
//   {
//     orderNo: "ORD-2025-1284",
//     dealer: "S.V. Traders",
//     salesperson: "Neha Iyer",
//     value: "₹65,500",
//     status: "Submitted",
//   },
//   {
//     orderNo: "ORD-2025-1283",
//     dealer: "Jai Mata Di Sales",
//     salesperson: "Rohit Sharma",
//     value: "₹2.10L",
//     status: "Approved",
//   },
// ];

// const badge = {
//   Draft: "bg-[#F3F4F6FF] text-[ #6B7280FF]" ,
//   Submitted: "bg-[#E5E2FCFF] text-[#5344D0FF]",
//   Approved: "bg-[#E4F4E7FF] text-[#469557FF]",
// };

// export default function RecentOrders() {
//   return (
//     <div className="w-full overflow-hidden  border border-[#E5E7EB] bg-white shadow-xs">

//       {/* Header */}
//       <div className="flex items-center justify-between border-b border-[#EEF2F7] px-5 py-4">
//         <h2 className="font-['Inter'] text-[18px] leading-[28px] font-semibold text-[#2A2B2F]">
//           Recent Orders
//         </h2>

//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 rounded-md border border-[#E5E7EB] px-4 py-2 text-sm text-[#475569]">
//             All Status
//             <ChevronDown size={16} />
//           </button>

//           <button>
//             <MoreVertical
//               size={18}
//               className="text-[#94A3B8]"
//             />
//           </button>
//         </div>
//       </div>

//       {/* Grid Header */}

//       <div className="bg-[#FAFAFB]">

//         <div className="grid grid-cols-[1.4fr_1.8fr_1.4fr_0.9fr_0.9fr] items-center px-5 h-12 border-b uppercase  border-[#EEF2F7]">

//           <div className="font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
//             Order No.
//           </div>

//           <div className="font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
//             Dealer
//           </div>

//           <div className="font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
//             Salesperson
//           </div>

//           <div className="font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
//             Value
//           </div>

//           <div className="font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
//             Status
//           </div>

//         </div>

//       </div>

//       {/* Grid Rows */}

//       {orders.map((item) => (
//         <div
//           key={item.orderNo}
//           className="grid grid-cols-[1.4fr_1.8fr_1.4fr_0.9fr_0.9fr] items-center px-5 h-[55px] border-b border-[#F1F5F9] hover:bg-[#FAFAFA] transition-all"
//         >
//           <div className="font-['Inter'] text-[12px] leading-[16px] font-medium text-[#4D4F53]">
//             {item.orderNo}
//           </div>

//           <div className="font-['Inter'] text-[12px] leading-[16px] font-semibold text-[#2A2B2F]">
//             {item.dealer}
//           </div>

//           <div className="font-['Inter'] text-[12px] leading-[16px] font-normal text-[#4D4F53]">
//             {item.salesperson}
//           </div>

//           <div className="font-['Inter'] text-[12px] leading-[16px] font-bold text-[#2A2B2F]">
//             {item.value}
//           </div>

//           <div>
//             <span
//               className={`inline-flex rounded-md px-3 py-1 text-[10px] font-semibold uppercase ${badge[item.status]}`}
//             >
//               {item.status}
//             </span>
//           </div>
//         </div>
//       ))}

//       {/* Footer */}

//       <div className="flex items-center justify-center py-4">
//         <button className="flex items-center gap-1 font-['Inter'] text-[14px] leading-[20px] font-[5px] text-[#5344D0]">
//           View all orders
//           <ChevronRight size={16} />
//         </button>
//       </div>
//     </div>
//   );
// }

import { ChevronDown, MoreVertical, ChevronRight } from "lucide-react";

const orders = [
  {
    orderNo: "ORD-2025-1287",
    dealer: "Shree Ganesh Traders",
    salesperson: "Rohit Sharma",
    value: "₹1.25L",
    status: "Draft",
  },
  {
    orderNo: "ORD-2025-1286",
    dealer: "Maa Durga Enterprises",
    salesperson: "Priya Nair",
    value: "₹85,000",
    status: "Submitted",
  },
  {
    orderNo: "ORD-2025-1285",
    dealer: "Kesar Distributors",
    salesperson: "Amit Verma",
    value: "₹1.75L",
    status: "Approved",
  },
  {
    orderNo: "ORD-2025-1284",
    dealer: "S.V. Traders",
    salesperson: "Neha Iyer",
    value: "₹65,500",
    status: "Submitted",
  },
  {
    orderNo: "ORD-2025-1283",
    dealer: "Jai Mata Di Sales",
    salesperson: "Rohit Sharma",
    value: "₹2.10L",
    status: "Approved",
  },
];

const badge = {
  Draft: "bg-[#F3F4F6FF] text-[#6B7280FF]",
  Submitted: "bg-[#E5E2FCFF] text-[#5344D0FF]",
  Approved: "bg-[#E4F4E7FF] text-[#469557FF]",
};

export default function RecentOrders() {
  return (
    <div className="w-full overflow-hidden border border-[#E5E7EB] bg-white shadow-xs">

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-[#EEF2F7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

        <h2 className="font-['Inter'] text-[14px] leading-[28px] font-semibold text-[#2A2B2F]">
          Recent Orders
        </h2>

        <div className="flex items-center gap-3">

          <button className="flex items-center gap-2 rounded-md border border-[#E5E7EB] px-4 py-2 text-sm text-[#475569]">
            All Status
            <ChevronDown size={16} />
          </button>

          <button>
            <MoreVertical
              size={18}
              className="text-[#94A3B8]"
            />
          </button>

        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block">

        {/* Grid Header */}
        <div className="grid grid-cols-[1.4fr_1.8fr_1.4fr_0.9fr_0.9fr] items-center px-5 h-12 border-b uppercase border-[#EEF2F7] bg-[#FAFAFB]">

          <div className="whitespace-nowrap font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
            Order No.
          </div>

          <div className="whitespace-nowrap font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
            Dealer
          </div>

          <div className="whitespace-nowrap font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
            Salesperson
          </div>

          <div className="whitespace-nowrap font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
            Value
          </div>

          <div className="whitespace-nowrap font-['Inter'] text-[11px] leading-[17px] font-bold text-[#919192]">
            Status
          </div>

        </div>

        {/* Grid Rows */}
        {orders.map((item) => (
          <div
            key={item.orderNo}
            className="grid grid-cols-[1.4fr_1.8fr_1.4fr_0.9fr_0.9fr] items-center px-5 h-[55px] border-b border-[#F1F5F9] hover:bg-[#FAFAFA] transition-all"
          >

            <div className="font-['Inter'] text-[12px] leading-[16px] font-medium text-[#4D4F53]">
              {item.orderNo}
            </div>

            <div className="font-['Inter'] text-[12px] leading-[16px] font-semibold text-[#2A2B2F]">
              {item.dealer}
            </div>

            <div className="font-['Inter'] text-[12px] leading-[16px] font-normal text-[#4D4F53]">
              {item.salesperson}
            </div>

            <div className="font-['Inter'] text-[12px] leading-[16px] font-bold text-[#2A2B2F]">
              {item.value}
            </div>

            <div>
              <span
                className={`inline-flex rounded-md px-3 py-1 text-[10px] font-semibold uppercase ${badge[item.status]}`}
              >
                {item.status}
              </span>
            </div>

          </div>
        ))}

      </div>

      
      {/* ================= MOBILE CARD VIEW ================= */}
<div className="block sm:hidden">

  {orders.map((item) => (
    <div
      key={item.orderNo}
      className="border-b border-[#F1F5F9] px-4 py-4 last:border-b-0"
    >

      {/* Top Row */}
      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">
          <div className="font-['Inter'] text-[12px] font-semibold text-[#2A2B2F]">
            {item.orderNo}
          </div>

          <div className="mt-1 truncate font-['Inter'] text-[12px] text-[#64748B]">
            {item.dealer}
          </div>
        </div>

        <span
          className={`shrink-0 rounded-md px-2.5 py-1 text-[9px] font-semibold uppercase ${badge[item.status]}`}
        >
          {item.status}
        </span>

      </div>

      {/* Details */}
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">

        {/* Salesperson */}
        <div className="min-w-0">
          <div className="font-['Inter'] text-[9px] font-semibold uppercase tracking-wide text-[#94A3B8]">
            Salesperson
          </div>

          <div className="mt-1 truncate font-['Inter'] text-[11px] font-medium text-[#475569]">
            {item.salesperson}
          </div>
        </div>

        {/* Value */}
        <div className="text-right">
          <div className="font-['Inter'] text-[9px] font-semibold uppercase tracking-wide text-[#94A3B8]">
            Order Value
          </div>

          <div className="mt-1 font-['Inter'] text-[12px] font-bold text-[#2A2B2F]">
            {item.value}
          </div>
        </div>

      </div>

    </div>
  ))}

</div>

      {/* Footer */}
      <div className="flex items-center justify-center py-4">

        <button className="flex items-center gap-1 font-['Inter'] !text-[14px] leading-[20px] font-medium text-[#5344D0]">
          View all orders
          <ChevronRight size={16} />
        </button>

      </div>

    </div>
  );
}