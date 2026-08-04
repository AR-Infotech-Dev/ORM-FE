// import { Line } from "react-chartjs-2";

// export function TrendChart({ data }) {
//   const safeData = data.length ? data : [{ label: "No Data", value: 0 }];
//   const chartData = {
//     labels: safeData.map((item) => item.label),
//     datasets: [
//       {
//         label: "Tickets",
//         data: safeData.map((item) => item.value),
//         borderColor: "#0078d4",
//         backgroundColor: "rgba(0, 120, 212, 0.14)",
//         pointBackgroundColor: "#ffffff",
//         pointBorderColor: "#0078d4",
//         pointBorderWidth: 2,
//         pointHoverRadius: 5,
//         pointRadius: 3,
//         borderWidth: 3,
//         fill: true,
//         tension: 0.38,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: { intersect: false, mode: "index" },
//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: { color: "#64748b", font: { size: 11, weight: 700 } },
//         border: { display: false },
//       },
//       y: {
//         beginAtZero: true,
//         grid: { color: "#e2e8f0" },
//         ticks: { color: "#64748b", font: { size: 11, weight: 700 }, padding: 8 },
//         border: { display: false },
//       },
//     },
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: "#0f172a",
//         padding: 10,
//         displayColors: false,
//       },
//     },
//   };

//   return (
//     <div className="dashboard-chart-box dashboard-trend-box">
//       <Line data={chartData} options={options} />
//     </div>
//   );
// }


import React from "react";

const chartData = [
  { date: "1 May", value: 0.68 },
  { date: "4 May", value: 0.98 },
  { date: "7 May", value: 0.78 },
  { date: "10 May", value: 1.08 },
  { date: "13 May", value: 0.90 },
  { date: "16 May", value: 0.60 },
  { date: "19 May", value: 0.98 },
  { date: "22 May", value: 0.72 },
  { date: "25 May", value: 0.90 },
  { date: "28 May", value: 0.78 },
  { date: "31 May", value: 1.28 },
];

export default function TrendChart() {
  const pointSpacing = 70;

  const width = Math.max(
    700,
    (chartData.length - 1) * pointSpacing
  );

  const height = 260;

  const minValue = 0.6;
  const maxValue = 1.5;

  const chartLeftPadding = 30;
  const chartRightPadding = 20;

  const getX = (index) =>
    chartLeftPadding +
    (index / (chartData.length - 1)) *
      (width - chartLeftPadding - chartRightPadding);

  const getY = (value) =>
    height -
    ((value - minValue) / (maxValue - minValue)) * height;

  const getSmoothPath = () => {
    return chartData
      .map((item, index) => {
        const x = getX(index);
        const y = getY(item.value);

        if (index === 0) return `M ${x} ${y}`;

        const prevX = getX(index - 1);
        const prevY = getY(chartData[index - 1].value);

        const controlX = (prevX + x) / 2;

        return `C ${controlX} ${prevY},
                ${controlX} ${y},
                ${x} ${y}`;
      })
      .join(" ");
  };

  const smoothPath = getSmoothPath();

  return (
    <div className="w-full p-2 sm:p-4">
      {/* Scroll Container */}
      <div
        className="
          w-full
          overflow-x-auto
          overflow-y-hidden
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <svg
          viewBox={`0 0 ${width} ${height + 55}`}
          preserveAspectRatio="xMinYMin meet"
          className="min-w-[900px] w-full h-[220px] sm:h-[260px] lg:h-[320px]"
        >
          {/* Grid Lines */}
          {[0.6, 0.9, 1.2, 1.5].map((value) => (
            <g key={value}>
              <line
                x1={chartLeftPadding}
                y1={getY(value)}
                x2={width - chartRightPadding}
                y2={getY(value)}
                stroke="#E5E7EB"
                strokeDasharray="4 5"
              />

              <text
                x="0"
                y={getY(value) + 4}
                fontSize="12"
                fill="#6B7280"
              >
                {value.toFixed(1)}
              </text>
            </g>
          ))}

          {/* Smooth Line */}
          <path
            d={smoothPath}
            fill="none"
            stroke="#6154D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {chartData.map((item, index) => (
            <circle
              key={item.date}
              cx={getX(index)}
              cy={getY(item.value)}
              r="2.5"
              fill="#6154D9"
            />
          ))}

          {/* X Axis Labels */}
          {chartData.map((item, index) => (
            <text
              key={item.date}
              x={getX(index)}
              y={height + 32}
              textAnchor="middle"
              fontSize="11"
              fill="#6B7280"
            >
              {item.date}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}