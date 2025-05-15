import React, { useEffect, useRef, useState } from 'react';
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

const SaintJeanPiedDePort = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const fetchDataAndDrawChart = async () => {
      try {
        const response = await fetch('https://test-camino.onrender.com/data?table=weather');
        const rawData = await response.json();

        // 選取城市名稱=Saint-Jean-Pied-de-Port的資料
        const cityData = rawData.filter(item => item.city.trim() === "Saint-Jean-Pied-de-Port");

        // 排序月份順序
        // 宣告一個照著jan、feb這個手動排列順序的(月份)陣列
        // sort() =>陣列變數.sort():
        // trim() =>移除空白
        // toLowerCase() =>將字母轉為小寫 
        const monthOrder = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const sortedData = cityData.sort((a, b) =>
          monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
        );

        //slice(1,3) =>取 2~3個字元
        const months = sortedData.map(d => d.month.trim().charAt(0).toUpperCase() + d.month.trim().slice(1, 3));
        //準備白天、晚上平均氣溫和降雨機率
        const dayTemps = sortedData.map(d => d.day_avg_temp);
        const nightTemps = sortedData.map(d => d.night_avg_temp);
        const rainProb = sortedData.map(d => d.rain_probability * 100);

        
        //準備chart.js的x軸
        const ctx = chartRef.current.getContext("2d");
        const newChart = new Chart(ctx, {
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
                data: rainProb,
                backgroundColor: "#009498",
                yAxisID: "y1"
              }
            ]          },
          options: {
            responsive: true,
            
            plugins: {
              title: {
                display: true
              }
            },
            scales: {
              y: {
                position: "left",
                title: {
                  display: true,
                  text: "溫度 (°C)"
                }
              },
              y1: {
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
        if (chartInstance) {
          chartInstance.destroy(); // 清除舊圖表
        }
        setChartInstance(newChart);
      } catch (error) {
        console.error("資料載入失敗:", error);
      }
    };

    fetchDataAndDrawChart();
  }, []);

  return (
    <div style={{ width: "800px", height: "300px", margin: "auto",marginLeft:'-100px',marginTop:'50px' }}>
      <canvas style={{ margin: "auto" }} ref={chartRef} width={700} height={400}></canvas>
    </div>
  );
};

export default SaintJeanPiedDePort;
