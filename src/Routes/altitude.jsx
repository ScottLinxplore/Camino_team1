import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

// ✅ 註冊需要的組件
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
  Tooltip,
  Legend
);

const ElevationChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const elevationData = {
      labels: [
        "0", "24", "46", "67", "90", "111", "133", "160", "190", "211", "233", "257",
        "282", "303", "323", "348", "384", "406", "423", "442", "461", "482", "513",
        "533", "565", "589", "617", "638", "657", "678", "703", "732", "749", "770"
      ],
      datasets: [
        {
          label: "海拔 (m)",
          data: [
            170, 600, 1507, 800, 600, 900, 500, 400, 700, 650, 900, 800,
            1000, 1200, 1100, 900, 950, 1300, 1250, 1100, 1000, 950, 1500,
            1200, 850, 900, 1400, 800, 950, 1000, 750, 600, 500, 400
          ],
          fill: true,
          backgroundColor: "rgba(255, 206, 86, 0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          tension: 0.4,
          pointRadius: 0
        }
      ]
    };

    const chart = new Chart(ctx, {
      type: "line",
      data: elevationData,
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            title: {
              display: true,
              text: "海拔 (m)"
            },
            min: 0,
            max: 1600
          },
          x: {
            title: {
              display: true,
              text: "距離 (km)"
            },
            ticks: {
              font: {
                style: "normal",
                size: 12,
                family: "Noto Sans TC, sans-serif"
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    return () => chart.destroy();
  }, []);

  return (
    <div  style={{ width: "100%", height: "100%", boxSizing: "border-box"}}>
      <canvas  id="elevationChart" ref={chartRef} width={800} height={400}></canvas>
    </div>
  );
};

export default ElevationChart;
