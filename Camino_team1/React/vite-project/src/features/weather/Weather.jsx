import React, { useState, useEffect } from "react";
import MapRoute from "./map";
import styles from "./weather.module.css";

const apiKey = "35fae4f05f310f219494cc8d0e369ac4";
const cities = [
  "TaiChung",
  "Saint-Jean-Pied-de-Port",
  "Roncesvalles",
  "Zubiri",
  "Pamplona",
  "Puente la Reina",
  "Estella",
  "Los Arcos",
  "Logroño",
  "Nájera",
  "Santo Domingo de la Calzada",
  "Belorado",
  "San Juan de Ortega",
  "Burgos",
  "Hornillos del Camino",
  "Castrojeriz",
  "Frómista",
  "Carrión de los Condes",
  "Terradillos de los Templarios",
  "Sahagún",
  "El Burgo Ranero",
  "Mansilla de las Mulas",
  "León",
  "Hospital de Órbigo",
  "Astorga",
  "Rabanal del Camino",
  "Ponferrada",
  "Villafranca del Bierzo",
  "O Cebreiro",
  "Triacastela",
  "Sarria",
  "Portomarín",
  "Palas de Rei",
  "Arzúa",
  "O Pedrouzo",
  "Santiago de Compostela",
];

const WeatherMap = () => {
  const [weatherList, setWeatherList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false); // loading 狀態

  useEffect(() => {
    if (selectedCity) {
      // 自動載入選取城市的天氣
      (async () => {
        const current = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            selectedCity
          )}&appid=${apiKey}&units=metric&lang=zh_tw`
        ).then((res) => res.json());
        setCurrentWeather(current);
        fetchForecast(selectedCity);
      })();
    }
  }, [selectedCity]);

  useEffect(() => {
    if (!selectedCity) {
      fetchCurrentWeather();
    }
  }, [selectedCity]);

  const fetchCurrentWeather = () => {
    Promise.all(
      cities.map((city) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`
        ).then((res) => res.json())
      )
    ).then((results) => {
      setWeatherList(results);
    });
  };

  const fetchForecast = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`
    )
      .then((res) => res.json())
      .then((data) => {
        const grouped = {};
        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(item.main.temp);
        });

        const forecast = Object.entries(grouped)
          .slice(0, 5)
          .map(([date, temps]) => ({
            date,
            min: Math.min(...temps).toFixed(1),
            max: Math.max(...temps).toFixed(1),
          }));

        setForecastData(forecast);
      });
  };

  const handleCityClick = async (cityObj) => {
    const cityName = cityObj.name;
    setSelectedCity(cityName);

    // 抓即時天氣
    const current = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        cityName
      )}&appid=${apiKey}&units=metric&lang=zh_tw`
    ).then((res) => res.json());
    setCurrentWeather(current);

    // 抓未來預報
    fetchForecast(cityName);
  };

  const handleBack = () => {
    setSelectedCity(null);
    setForecastData([]);
    setCurrentWeather(null);
  };

  const downloadWeatherData = async () => {
    setIsDownloading(true);
    const weatherData = await Promise.all(
      cities.map(async (city) => {
        const current = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&appid=${apiKey}&units=metric&lang=zh_tw`
        ).then((res) => res.json());

        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            city
          )}&appid=${apiKey}&units=metric&lang=zh_tw`
        ).then((res) => res.json());

        const grouped = {};
        forecastRes.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(item.main.temp);
        });

        const forecast = Object.entries(grouped)
          .slice(0, 5)
          .map(([date, temps]) => ({
            date,
            min: Math.min(...temps).toFixed(1),
            max: Math.max(...temps).toFixed(1),
          }));

        return {
          city,
          current: {
            temp: current.main.temp,
            description: current.weather[0].description,
            icon: current.weather[0].icon,
          },
          forecast,
        };
      })
    );

    const html = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Camino 天氣離線資料</title>
      <style>
        body { font-family: sans-serif; padding: 1rem; line-height: 1.5; }
        h1 { color: #2b7a78; }
        h2 { margin-top: 1.2rem; color: #333; }
        ul { padding-left: 1.2rem; }
        li { margin-bottom: 0.3rem; }
        .current { margin-bottom: 0.5rem; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>Camino 天氣離線資料</h1>
      ${weatherData
        .map(
          (city) => `
        <h2>${city.city}</h2>
        <div class="current">現在：${city.current.temp}°C，${
            city.current.description
          }</div>
        <ul>
          ${city.forecast
            .map(
              (day) => `
            <li>${day.date}：${day.min}°C ~ ${day.max}°C</li>
          `
            )
            .join("")}
        </ul>
      `
        )
        .join("")}
    </body>
  </html>
`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "camino_weather.html";
    link.click();
    URL.revokeObjectURL(url);
    setIsDownloading(false);
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.map}>
        <MapRoute onCityClick={setSelectedCity} />
      </div>

      <div className={styles.sidebar}>
        <div className={styles.rowControls}>
          <button
            onClick={downloadWeatherData}
            disabled={isDownloading}
            className={styles.downloadBtn}
          >
            {isDownloading ? "下載中..." : "下載天氣地圖"}
          </button>

          <select
            onChange={async (e) => {
              const city = e.target.value;
              if (city) {
                setSelectedCity(city);
                const current = await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                    city
                  )}&appid=${apiKey}&units=metric&lang=zh_tw`
                ).then((res) => res.json());
                setCurrentWeather(current);
                fetchForecast(city);
              }
            }}
            defaultValue=""
          >
            <option value="" disabled>
              查看天氣預報
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        {!selectedCity ? (
          <>
            <div className={styles.cityList}>
              {weatherList.map((city) => (
                <div
                  key={city.id}
                  className={styles.cityCard}
                  onClick={() => handleCityClick(city)}
                >
                  <strong>{city.name}</strong>
                  <br />
                  🌡️ {city.main.temp.toFixed(1)}°C
                  <br />
                  <div className={styles.weatherInfo}>
                    <span>{city.weather[0].description}</span>
                    {city.weather[0].icon && (
                      <img
                        src={`/weather-icons/${city.weather[0].icon}.png`}
                        alt="weather icon"
                        className={styles.weatherIcon}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <button className={styles.backBtn} onClick={handleBack}>
              ← 回到城市列表
            </button>
            {currentWeather && (
              <div className={styles.todayWeather}>
                <h3>目前天氣</h3>
                🌡️ {currentWeather.main.temp.toFixed(1)}°C
                <div className={styles.weatherInfo}>
                  <span>{currentWeather.weather[0].description}</span>
                  {currentWeather.weather[0].icon && (
                    <img
                      src={`/weather-icons/${currentWeather.weather[0].icon}.png`}
                      alt="weather icon"
                      className={styles.weatherIcon}
                    />
                  )}
                </div>
              </div>
            )}
            <h3>未來五天天氣</h3>
            {forecastData.map((day) => {
              const dayOfWeek = new Date(day.date).toLocaleDateString("zh-TW", {
                weekday: "long",
              });

              return (
                <div key={day.date} className={styles.forecastDay}>
                  🌞 {dayOfWeek}
                  <br />
                  🌡️ 最高：{day.max}°C
                  <br />
                  🌡️ 最低：{day.min}°C
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherMap;
