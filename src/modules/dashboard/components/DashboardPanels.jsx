import { ActivityList } from "./ActivityList";
import { AmcAlerts } from "./AmcAlerts";
import { BarChart } from "./BarChart";
import { DonutChart } from "./DonutChart";
import { ProductExpiryAlerts } from "./ProductExpiryAlerts";
import TrendChart from "./TrendChart";
import ActionCenter from "./ActionCenter";
import RecentOrders from "./RecentOrders";
import TeamPerformance from "./TeamPerformance";

import CollectionHealth from "./CollectionHealth";
import TopDealersDemo from "./TopDealersDemo";


export function DashboardPanels({
  dashboard,
  adminView,
  onNavigateTickets,
  onNavigateProductExpiry,
  onRenewAmc,
  onUpdateProductExpiry,
}) {
  return (
   <section>
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

    {/* Sales Trend */}
    <div className="col-span-1 lg:col-span-7">
      <article
        className="bg-white border border-[#e4e1f8] shadow-xs p-4"
        onClick={onNavigateTickets}
      >
        <div className="dashboard-panel-head">

          <div>
            <h2 className="mb-4 text-[15px] font-semibold text-gray-800">
              {adminView ? "Ticket volume" : "Sales Trend"}
            </h2>

            <p className="text-[9px] text-gray-500 mt-1">
              Daily order value (₹)
            </p>
          </div>

          <div className="flex border border-[#e4e1f8] text-[9px]">
            <button className="px-3 py-1 text-[#6655d9] bg-white border-r border-[#e4e1f8]">
              Value
            </button>

            <button className="px-3 py-1 text-gray-500 bg-[#f3f1fc]">
              Orders
            </button>
          </div>

        </div>

        <TrendChart data={dashboard.trend} />
      </article>
    </div>

    {/* Action Center */}
    <div className="col-span-1 lg:col-span-5">
      <ActionCenter />
    </div>

    {/* Recent Orders */}
    <div className="col-span-1 lg:col-span-8">
      <RecentOrders />
    </div>

    {/* Collection Health */}
    <div className="col-span-1 lg:col-span-4">
      <CollectionHealth />
    </div>

    {/* Team Performance */}
    <div className="col-span-1 mb-4 lg:col-span-8">
      <TeamPerformance />
    </div>

    {/* Top Dealers */}
    <div className="col-span-1 mb-4 lg:col-span-4">
      <TopDealersDemo />
    </div>

  </div>



 {/* ************************************************************************************************ */}


      {/* <article className="dashboard-panel" onClick={onNavigateTickets}>
        <div className="dashboard-panel-head">
          <div>
            <span className="dashboard-section-label">Status</span>
            <h2>{adminView ? "All tickets" : "My tickets"}</h2>
          </div>
        </div>
        <DonutChart data={dashboard.ticketStatus} />
      </article> */}

      {/* <article className="bg-white border border-[#e4e1f8] rounded-lg p-4" onClick={onNavigateTickets}>
        <div className="dashboard-panel-head">

          <div>
            <h2 className="mb-4 text-[15px] font-semibold text-gray-800">
              {adminView ? "Ticket volume" : "Sales Trend"}
            </h2>

            <p className="text-[9px] text-gray-500 mt-1">
              Daily order value (₹)
            </p>
          </div>

          <div className="flex border border-[#e4e1f8] text-[9px]">
            <button className="px-3 py-1 text-[#6655d9] bg-white border-r border-[#e4e1f8]">
              Value
            </button>

            <button className="px-3 py-1 text-gray-500 bg-[#f3f1fc]">
              Orders
            </button>
          </div>

        </div>
        <TrendChart data={dashboard.trend} />

      </article>
      <article className="action-center">
        <ActionCenter
        onAction={(item) => {
          console.log("Clicked:", item);
        }}
      />
     </article>  */}

      {/* <article className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <span className="dashboard-section-label">Focus</span>
            <h2>{adminView ? "Operational pressure" : "Daily workload"}</h2>
          </div>
        </div>
        <BarChart data={dashboard.bars} />
      </article>

      <article className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <span className="dashboard-section-label">AMC</span>
            <h2>AMC Health</h2>
          </div>
        </div>
        <DonutChart data={dashboard.amcHealth} />
      </article>

      <article className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <span className="dashboard-section-label">AMC</span>
            <h2>Upcoming Renewals</h2>
          </div>
        </div>
        <AmcAlerts items={dashboard.amcAlerts} onRenew={onRenewAmc} />
      </article>

      <article className="dashboard-panel">
        <div className="dashboard-panel-head">
          <div>
            <span className="dashboard-section-label">Products</span>
            <h2>Expiry Alerts</h2>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700" onClick={onNavigateProductExpiry}>
            view all
          </button>
        </div>
        <ProductExpiryAlerts items={dashboard.productExpiryAlerts} onUpdate={onUpdateProductExpiry} />
      </article>

      <article className="dashboard-panel dashboard-panel-tall">
        <div className="dashboard-panel-head">
          <div>
            <span className="dashboard-section-label">Activity</span>
            <h2>{adminView ? "Recent updates" : "My updates"}</h2>
          </div>
        </div>
        <ActivityList items={dashboard.activity} />
      </article> */}
     
    </section>
  );
}
