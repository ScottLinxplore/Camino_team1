import React, { useState } from 'react';
import styles from "./Froute.module.css";
import Map from "../../features/Froute/map"
import City1 from '../../weatherAPI/Saint-Jean-Pied-de-Port';
import City2 from '../../weatherAPI/Roncesvalles';
import City3 from '../../weatherAPI/Zubiri';
import City4 from '../../weatherAPI/Pamplona';
import City5 from "../../weatherAPI/Puente la Reina";
import City6 from "../../weatherAPI/Estella";
import City7 from "../../weatherAPI/Los Arcos";
import City8 from "../../weatherAPI/Viana";
import City9 from "../../weatherAPI/Logrono";
import City10 from "../../weatherAPI/Navarrete";
import City11 from "../../weatherAPI/Najera";
import City12 from "../../weatherAPI/Santo Domingo de la Calzada";
import City13 from "../../weatherAPI/Granon";
import City14 from "../../weatherAPI/Belorado";
import City15 from "../../weatherAPI/Villafranca Montes de Oca";
import City16 from "../../weatherAPI/San Juan de Ortega";
import City17 from "../../weatherAPI/Burgos";
import City18 from "../../weatherAPI/Hornillos del Camino";
import City19 from "../../weatherAPI/Castrojeriz";
import City20 from "../../weatherAPI/Fromista";
import City21 from "../../weatherAPI/Carrion de los Condes";
import City22 from "../../weatherAPI/Calzadilla de la Cueza";
import City23 from "../../weatherAPI/Sahagun";
import City24 from "../../weatherAPI/El Burgo Ranero";
import City25 from "../../weatherAPI/Mansilla de las Mulas";
import City26 from "../../weatherAPI/Leon";
import City27 from "../../weatherAPI/Hospital de Orbigo";
import City28 from "../../weatherAPI/Astorga";
import City29 from "../../weatherAPI/Ponferrada";
import City30 from "../../weatherAPI/Sarria";

const cities = [
    { label: "Saint-Jean-Pied-de-Port", value: "SaintJean", component: <City1 /> },
    { label: "Roncesvalles", value: "Roncesvalles", component: <City2 /> },
    { label: "Zubiri", value: "Zubiri", component: <City3 /> },
    { label: "Pamplona", value: "Pamplona", component: <City4 /> },
    { label: "Puente la Reina", value: "Puente la Reina", component: <City5 /> },
    { label: "Estella", value: "Estella", component: <City6 /> },
    { label: "Los Arcos", value: "Los Arcos", component: <City7 /> },
    { label: "Viana", value: "Viana", component: <City8 /> },
    { label: "Logroño", value: "Logroño", component: <City9 /> },
    { label: "Navarrete", value: "Navarrete", component: <City10 /> },
    { label: "Nájera", value: "Nájera", component: <City11 /> },
    { label: "Santo Domingo de la Calzada", value: "Santo Domingo de la Calzada", component: <City12 /> },
    { label: "Grañón", value: "Grañón", component: <City13 /> },
    { label: "Belorado", value: "Belorado", component: <City14 /> },
    { label: "Villafranca Montes de Oca", value: "Villafranca Montes de Oca", component: <City15 /> },
    { label: "San Juan de Ortega", value: "San Juan de Ortega", component: <City16 /> },
    { label: "Burgos", value: "Burgos", component: <City17 /> },
    { label: "Hornillos del Camino", value: "Hornillos del Camino", component: <City18 /> },
    { label: "Castrojeriz", value: "Castrojeri", component: <City19 /> },
    { label: "Frómista", value: "Frómista", component: <City20 /> },
    { label: "Carrión de los Condes", value: "Carrión de los Condes", component: <City21 /> },
    { label: "Calzadilla de la Cueza", value: "Calzadilla de la Cueza", component: <City22 /> },
    { label: "Sahagún", value: "Sahagún", component: <City23 /> },
    { label: "El Burgo Ranero", value: "El Burgo Ranero", component: <City24 /> },
    { label: "Mansilla de las Mulas", value: "Mansilla de las Mulas", component: <City25 /> },
    { label: "León", value: "León", component: <City26 /> },
    { label: "Hospital de Órbigo", value: "Hospital de Órbigo", component: <City27 /> },
    { label: "Astorga", value: "Astorga", component: <City28 /> },
    { label: "Ponferrada", value: "Ponferrada", component: <City29 /> },
    { label: "Sarria", value: "Sarria", component: <City30 /> }
];

const ShowCanvas = () => {
    //預設第一個城市為:SaintJeanPiedDePort
    const [selectedCity, setSelectedCity] = useState('SaintJean');
    //顯示1~30個天氣的資料
    const renderCityChart = () => {
        const found = cities.find(city => city.value === selectedCity);
        return found ? found.component : <div>城市清單載入中</div>;
    }

    //顯示城市名稱
    const foundCity = cities.find(city => city.value === selectedCity);


    return (
        <div style={{ width: "100%", boxSizing: "border-box" }}>
            {/* 中央置中的主標題 */}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <h2 style={{ fontSize: '35px', zIndex: 2, position: 'relative' }}>
                    {foundCity?.label + " 每月平均氣候圖"}
                </h2>
            </div>

            {/* 地圖 + 圖表 + 城市選擇 */}
            <div style={{
                display: 'flex',
                position: 'relative',
                height: '500px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
            }}>
                {/* 城市天氣中的左側地圖 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Map
                        className={styles.map}
                        // 將資料反向傳送給紅色景點icon(selectedCity的useState)
                        selectedCityLabel={selectedCity}
                        // 接收onCityClick事件，將從map內傳出的label接收
                        // 並對應到option內的值，找到該值並顯示城市名稱
                        onCityClick={(label) => {
                            // 找到對應 value
                            const found = cities.find(city => city.label === label);
                            if (found) {
                                setSelectedCity(found.value);
                            }
                        }}
                    />
                </div>

                {/* 城市天氣中的右側 chart + 選單 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* 選擇城市欄位 (靠右) */}
                    <div style={{ textAlign: 'right', paddingRight: '30px', marginBottom: '10px' }}>
                        <h3 style={{ marginBottom: '10px', marginLeft: 'auto', marginRight: 'auto' }}>選擇城市</h3>
                        <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                            {cities.map(city => (
                                <option key={city.value} value={city.value}>
                                    {city.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 圖表 */}
                    <div style={{ maxWidth: '100%', height: '100%' }}>
                        {renderCityChart()}
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ShowCanvas
