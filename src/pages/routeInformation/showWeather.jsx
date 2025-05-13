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
        <div style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <h2 style={{ fontSize: '35px' }}>{foundCity?.label + "每月平均氣候圖" || "城市名稱載入中"}</h2>
                <h3 style={{ marginRight: '-550px' }}>選擇城市</h3>

                {/* <Map className={styles.map} /> */}
                <select style={{ marginRight: '-550px' }} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    {cities.map(city => (
                        <option key={city.value} value={city.value}>
                            {city.label}
                        </option>
                    ))}
                </select>

            </div>
            <div style={{
                display: 'flex',
                border: 'black 3px solid',
                overflow:'hidden',
                height: '500px',
                width: '1300px',
                maxWidth: '1000px',
                margin: '0 auto',
            }}>
                <Map className={styles.map} />
                <div className={styles.chartWrapper}>
                    {renderCityChart()}
                </div>
            </div>


        </div>
    )
}
export default ShowCanvas
