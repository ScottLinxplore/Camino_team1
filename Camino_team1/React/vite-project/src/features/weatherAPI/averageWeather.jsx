import React, { useEffect, useRef } from 'react';
import {
  Chart,
  LineElement,
  LineController,
  BarElement,
  BarController,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';

// 註冊 Chart.js 元件
Chart.register(
  LineElement,
  LineController,
  BarElement,
  BarController,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const WeatherChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                    "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayTemps = [
        7.31 ,9.44 ,10.98 ,13.08 ,15.67 ,20.30 ,24.32 ,24.03 ,17.22 ,15.66 ,12.18 ,7.17     
    ];
    const nightTemps = [3.97 ,5.77 ,5.31 ,7.45 ,9.67 ,12.05 ,15.69 ,15.41 ,11.22 ,9.66 ,6.56 ,3.79 
    ];
    const rainProb = [
        0.1452 ,0.2418 ,0.2527 ,0.1959 ,0.2611 ,0.2094 ,0.0877 ,0.1280 ,0.2208 ,0.2984 ,0.1094 ,0.2601 
    ];

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: months,
        datasets: [
          {
            type: "line",
            label: "白天氣溫 (°C)",
            data: dayTemps,
            borderColor: "#FF8C40",
            backgroundColor: "#FF8C40",
            yAxisID: "y",
            tension: 0.3,
            pointRadius: 4
          },
          {
            type: "line",
            label: "夜間氣溫 (°C)",
            data: nightTemps,
            borderColor: "#4C91FF",
            backgroundColor: "#4C91FF",
            yAxisID: "y",
            tension: 0.3,
            pointRadius: 4
          },
          {
            type: "bar",
            label: "降雨機率 (%)",
            data: rainProb.map(p => p * 100),
            backgroundColor: "#009498",
            yAxisID: "y1"
          }
        ]
      },
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false
        },
        stacked: false,
        plugins: {
          title: {
            display: true
          }
        },
        scales: {
          y: {
            type: "linear",
            position: "left",
            title: {
              display: true,
              text: "溫度 (°C)"
            }
          },
          y1: {
            type: "linear",
            position: "right",
            title: {
              display: true,
              text: "降雨機率 (%)"
            },
            grid: {
              drawOnChartArea: false
            },
            min: 0,
            max: 100
          }
        }
      }
    });

    return () => chart.destroy();
  }, []);

  return (
    <>
    <div  style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
        {/* 加上下拉式選單顯示所有城市的天氣資料 */}
        <h2 style={{margin:'auto' ,textAlign:'center'}}>法國之路每月平均氣溫</h2>
        <canvas style={{margin:"auto"}} ref={chartRef} width={800} height={400}></canvas>
        </div>
    </>
  );
};
export default WeatherChart;