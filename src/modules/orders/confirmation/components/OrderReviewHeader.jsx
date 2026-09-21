// import { formatCurrency, formatDate, formatNumber } from '@/utils/common';
import { formatCurrency, formatNumber, buildOrderSummary } from "../utils/orders.utils";
import { formatDate } from "./ConfirmationUI";
import React from 'react';

const DetailCell = ({ label, value, highlight }) => (
  <div className="rounded-xs  bg-slate-50 px-2.5 py-1 gap">
    <p className="text-[8px] font-medium uppercase text-slate-400">{label}</p>
    <p className={`mt-0.5 truncate text-sm font-semibold ${highlight ? "text-orange-600" : "text-slate-700"}`}>{value || "-"}</p>
  </div>
);

const itemGridClass = "grid w-full grid-cols-[38px_minmax(170px,2fr)_minmax(100px,1fr)_80px_70px_100px_70px_130px] items-center";

function OrderReviewHeader({ order = {}, items = [], remarks = "", actionLoading = false, onRemarksChange, onAction }) {
  const summary = buildOrderSummary(items, order);
  return (
    <div className="px-3">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <section className="rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
          <h3 className="mb-1.5 text-sm font-bold text-slate-800">Order Header</h3>
          <div className="grid grid-cols-2 gap-0">
            <DetailCell label="Order No" value={order?.order_no} highlight />
            <DetailCell label="Status" value={order?.order_status || "waiting"} />
            <DetailCell label="Priority" value={order?.priority || "normal"} />
            <DetailCell label="Order Date" value={formatDate(order?.order_date)} />
            <DetailCell label="Expected Delivery" value={formatDate(order?.expected_delivery_date)} />
            <DetailCell label="Sales Person" value={order?.sales_person_name || order?.sales_person_id} />
          </div>
        </section>

        <section className="rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
          <h3 className="mb-1.5 text-sm font-bold text-slate-800">Dealer Details</h3>
          <div className="grid grid-cols-2 gap-0">
            <DetailCell label="Dealer" value={order?.dealer_name || order?.dealer_id} />
            <DetailCell label="Contact" value={order?.dealer_mobile || "-"} />
            <DetailCell label="Email" value={order?.dealer_email || "-"} />
            <DetailCell label="Location" value={order?.dealer_address || "-"} />
          </div>
        </section>
      </div>

      <section className="mt-2 overflow-hidden rounded-sm border border-slate-100 bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-1.5">
          <h3 className="text-sm font-bold text-slate-800">Order Items</h3>
          <p className="text-xs text-slate-400">All values in INR</p>
        </div>

        <div className="w-full overflow-hidden text-left text-sm">
          <div className={`${itemGridClass} bg-slate-50 text-[10px] font-bold uppercase text-slate-500`}>
            <div className="px-2 py-2">#</div>
            <div className="px-2 py-2">Product / Model</div>
            {/* <div className="px-2 py-2">Series</div>
            <div className="px-2 py-2 text-right">Weight</div> */}
             <div className="px-2 py-2 text-right">Rate</div>
            <div className="px-2 py-2 text-right">Qty</div>
            <div className="px-2 py-2 text-right">Unit</div>
             <div className="px-2 py-2 text-right">Dis</div>
            <div className="px-2 py-2 text-right">GST</div>
            <div className="px-2 py-2 text-right">Amount</div>
          </div>

          <div className="divide-y divide-slate-100">
            {items.map((item, index) => (
              <div className={itemGridClass} key={item.item_id || index}>
                <div className="px-2 py-1.5 text-slate-400">{index + 1}</div>
                <div className="truncate px-2 py-1.5 font-semibold text-slate-700">{item.product_name_snapshot || item.product || item.product_name || "-"}</div>
                {/* <div className="truncate px-2 py-1.5 text-slate-500">{item.brand_snapshot || item.brand || "-"}</div> */}
                {/* <div className="px-2 py-1.5 text-right text-slate-500">{formatNumber(item.weight)}</div> */}
                <div className="px-2 py-1.5 text-right text-slate-600"> {formatCurrency(Number(item.unitRate) || 0)} </div>
                <div className="px-2 py-1.5 text-right font-semibold text-slate-700">{formatNumber(item.qty)}</div>
                <div className="truncate px-2 py-1.5 text-right text-slate-600"> {item.unit || "-"} </div>
                <div className="px-2 py-1.5 text-right text-slate-600"> {Number(item.discount) || 0}% </div>
                <div className="px-2 py-1.5 text-right text-slate-600">{Number(item.gst || 0)}%</div>
                <div className="px-2 py-1.5 text-right font-bold text-slate-800">{formatCurrency(Number(item.amount))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-[1fr_1fr]">
        <section className="rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800">Order Summary</h3>
          <div className="mt-2 space-y-1.5 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">Total Items</span><strong>{formatNumber(items.length)}</strong></div>
            <div className="flex justify-between"><span className="text-slate-500">Total Qty</span><strong>{formatNumber(summary.totalQty)}</strong></div>
            {/* <div className="flex justify-between"> <span className="text-slate-500"> Total Qty </span> <strong>{formatNumber( items.reduce((total, item) => total + (Number(item.qty) || 0), 0) )} </strong> </div> */}
            <div className="flex justify-between"><span className="text-slate-500">Subtotal</span><strong>{formatCurrency(order?.subtotal)}</strong></div>
            <div className="border-t border-dashed border-slate-200 pt-1.5 flex justify-between"><span className="font-semibold text-slate-700">Grand Total</span><strong className="text-md text-orange-600">{formatCurrency(order?.total_amount)}</strong></div>
          </div>
        </section>

        <section className="rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
          <h3 className="text-sm font-bold text-slate-800">Sales Remarks</h3>
          <p className="mt-2 min-h-16 rounded-sm bg-slate-50 p-2 text-sm leading-5 text-slate-500">{order?.remarks || "No remarks added."}</p>
        </section>
      </div>

      <section className="mt-2 rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
        <label className="text-xs font-semibold text-slate-500">Remarks / Reason <span className="text-red-500">required for Hold or Send Back</span></label>
        <div className="mt-2">
          <textarea
            value={remarks}
            onChange={(event) => onRemarksChange?.(event.target.value)}
            rows={2}
            className="w-full resize-none rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
            placeholder="Enter reason for holding/sending back this order..."
          />

        </div>
      </section>
    </div>
  );
}

export default OrderReviewHeader;




// import { formatCurrency, formatNumber } from "../utils/orders.utils";
// import { formatDate } from "./ConfirmationUI";
// import React from "react";

// const DetailCell = ({ label, value, highlight }) => (
//   <div className="rounded-xs bg-slate-50 px-2.5 py-1 gap">
//     <p className="text-[8px] font-medium uppercase text-slate-400">
//       {label}
//     </p>

//     <p
//       className={`mt-0.5 truncate text-sm font-semibold ${
//         highlight ? "text-orange-600" : "text-slate-700"
//       }`}
//     >
//       {value || "-"}
//     </p>
//   </div>
// );

// const itemGridClass =
//   "grid w-full grid-cols-[38px_minmax(170px,2fr)_minmax(100px,1fr)_80px_100px_70px_70px_130px] items-center";

// function OrderReviewHeader({
//   order = {},
//   items = [],
//   remarks = "",
//   actionLoading = false,
//   onRemarksChange,
//   onAction,
// }) {
//   // Total quantity calculate from API items
//   const totalQty = items.reduce(
//     (total, item) => total + (Number(item.qty) || 0),
//     0
//   );

//   return (
//     <div className="px-3">
//       <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
//         {/* Order Header */}
//         <section className="rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
//           <h3 className="mb-1.5 text-sm font-bold text-slate-800">
//             Order Header
//           </h3>

//           <div className="grid grid-cols-2 gap-0">
//             <DetailCell
//               label="Order No"
//               value={order?.order_no}
//               highlight
//             />

//             <DetailCell
//               label="Status"
//               value={order?.order_status || "waiting"}
//             />

//             <DetailCell
//               label="Priority"
//               value={order?.priority || "normal"}
//             />

//             <DetailCell
//               label="Order Date"
//               value={formatDate(order?.order_date)}
//             />

//             <DetailCell
//               label="Expected Delivery"
//               value={formatDate(order?.expected_delivery_date)}
//             />

//             <DetailCell
//               label="Sales Person"
//               value={order?.sales_person_name || order?.userName || "-"}
//             />
//           </div>
//         </section>

//         {/* Dealer Details */}
//         <section className="rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
//           <h3 className="mb-1.5 text-sm font-bold text-slate-800">
//             Dealer Details
//           </h3>

//           <div className="grid grid-cols-2 gap-0">
//             <DetailCell
//               label="Dealer"
//               value={order?.dealer_name || order?.dealer_id}
//             />

//             <DetailCell
//               label="Contact"
//               value={order?.dealer_mobile || "-"}
//             />

//             <DetailCell
//               label="Email"
//               value={order?.dealer_email || "-"}
//             />

//             <DetailCell
//               label="Location"
//               value={order?.dealer_address || "-"}
//             />
//           </div>
//         </section>
//       </div>

//       {/* Order Items */}
//       <section className="mt-2 overflow-hidden rounded-sm border border-slate-100 bg-white shadow-xs">
//         <div className="flex items-center justify-between border-b border-slate-100 px-3 py-1.5">
//           <h3 className="text-sm font-bold text-slate-800">
//             Order Items
//           </h3>

//           <p className="text-xs text-slate-400">
//             All values in INR
//           </p>
//         </div>

//         <div className="w-full overflow-hidden text-left text-sm">

//           {/* Header */}
//           <div
//             className={`${itemGridClass} bg-slate-50 text-[10px] font-bold uppercase text-slate-500`}
//           >
//             <div className="px-2 py-2">#</div>

//             <div className="px-2 py-2">
//               Product / Model
//             </div>

//             <div className="px-2 py-2 text-right">
//               Rate
//             </div>

//             <div className="px-2 py-2 text-right">
//               Qty
//             </div>

//             <div className="px-2 py-2 text-right">
//               Unit
//             </div>

//             <div className="px-2 py-2 text-right">
//               Dis
//             </div>

//             <div className="px-2 py-2 text-right">
//               GST
//             </div>

//             <div className="px-2 py-2 text-right">
//               Amount
//             </div>
//           </div>

//           {/* Items */}
//           <div className="divide-y divide-slate-100">
//             {items.map((item, index) => (
//               <div
//                 className={itemGridClass}
//                 key={item.item_id || index}
//               >
//                 {/* # */}
//                 <div className="px-2 py-1.5 text-slate-400">
//                   {index + 1}
//                 </div>

//                 {/* Product */}
//                 <div className="truncate px-2 py-1.5 font-semibold text-slate-700">
//                   {item.product_name || item.item_name || "-"}
//                 </div>

//                 {/* Rate */}
//                 <div className="px-2 py-1.5 text-right text-slate-600">
//                   {formatCurrency(Number(item.rate) || 0)}
//                 </div>

//                 {/* Qty */}
//                 <div className="px-2 py-1.5 text-right font-semibold text-slate-700">
//                   {formatNumber(Number(item.qty) || 0)}
//                 </div>

//                 {/* Unit */}
//                 <div className="truncate px-2 py-1.5 text-right text-slate-600">
//                   {item.unit || "-"}
//                 </div>

//                 {/* Discount */}
//                 <div className="px-2 py-1.5 text-right text-slate-600">
//                   {Number(item.discount) || 0}%
//                 </div>

//                 {/* GST */}
//                 <div className="px-2 py-1.5 text-right text-slate-600">
//                   {Number(item.gst) || 0}%
//                 </div>

//                 {/* Amount */}
//                 <div className="px-2 py-1.5 text-right font-bold text-slate-800">
//                   {formatCurrency(Number(item.amount) || 0)}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Summary + Remarks */}
//       <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-[1fr_1fr]">

//         {/* Order Summary */}
//         <section className="rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
//           <h3 className="text-sm font-bold text-slate-800">
//             Order Summary
//           </h3>

//           <div className="mt-2 space-y-1.5 text-sm">

//             {/* Total Items */}
//             <div className="flex justify-between">
//               <span className="text-slate-500">
//                 Total Items
//               </span>

//               <strong>
//                 {formatNumber(items.length)}
//               </strong>
//             </div>

//             {/* Total Qty */}
//             <div className="flex justify-between">
//               <span className="text-slate-500">
//                 Total Qty
//               </span>

//               <strong>
//                 {formatNumber(totalQty)}
//               </strong>
//             </div>

//             {/* Subtotal */}
//             <div className="flex justify-between">
//               <span className="text-slate-500">
//                 Subtotal
//               </span>

//               <strong>
//                 {formatCurrency(Number(order?.subtotal) || 0)}
//               </strong>
//             </div>

//             {/* Grand Total */}
//             <div className="flex justify-between border-t border-dashed border-slate-200 pt-1.5">
//               <span className="font-semibold text-slate-700">
//                 Grand Total
//               </span>

//               <strong className="text-md text-orange-600">
//                 {formatCurrency(Number(order?.total_amount) || 0)}
//               </strong>
//             </div>
//           </div>
//         </section>

//         {/* Sales Remarks */}
//         <section className="rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
//           <h3 className="text-sm font-bold text-slate-800">
//             Sales Remarks
//           </h3>

//           <p className="mt-2 min-h-16 rounded-sm bg-slate-50 p-2 text-sm leading-5 text-slate-500">
//             {order?.remarks || "No remarks added."}
//           </p>
//         </section>
//       </div>

//       {/* Action Remarks */}
//       <section className="mt-2 rounded-sm border border-slate-100 bg-white p-2.5 shadow-xs">
//         <label className="text-xs font-semibold text-slate-500">
//           Remarks / Reason{" "}
//           <span className="text-red-500">
//             required for Hold or Send Back
//           </span>
//         </label>

//         <div className="mt-2">
//           <textarea
//             value={remarks}
//             onChange={(event) =>
//               onRemarksChange?.(event.target.value)
//             }
//             rows={2}
//             className="w-full resize-none rounded-sm border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-2 focus:ring-orange-100"
//             placeholder="Enter reason for holding/sending back this order..."
//           />
//         </div>
//       </section>
//     </div>
//   );
// }

// export default OrderReviewHeader;