import React from 'react'
import Navbar from "./components/navbar/Navbar1"
import Topimg from "./components/homeRoute/homeRoute.png"
import Footer from "./components/footer/Footer"
import RouteInfo1 from "./components/homeRoute/homeRoute_1"
import RouteInfo2 from "./components/homeRoute/homeRoute_2"
import RouteInfo3 from "./components/homeRoute/homeRoute_3"
import RouteInfo4 from "./components/homeRoute/homeRoute_4"
import RouteInfo5 from "./components/homeRoute/homeRoute_5"
import RouteInfo6 from "./components/homeRoute/homeRoute_6"

const homeRoute = () => {
    return (
        <>
            <div style={{ fontFamily: "sans-serif", padding: "10px", paddingLeft: "20px" }}>
                <nav><Navbar /> </nav>
                <div>
                    <img alt="圖片載入中" src={Topimg} style={{ width: '600px', marginTop: '30px' }}></img>
                </div>

                <div style={{ position: 'relative' }}>
                    <button style={{
                        position: 'absolute',
                        width: '150px',
                        height: '60px',
                        top: '0',
                        right: '220px',
                        margin: '10px',
                        padding: '8px 12px',
                        fontWeight: 'bold',
                        backgroundColor: "rgb(104,175,69)",
                        color: "rgb(255, 255, 255)",
                        border: "rgb(104,175,69) solid 2px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: '16px'
                    }}>規劃路線
                    </button>
                    <RouteInfo1 />
                </div>
                <div><RouteInfo2 /></div>
                <div><RouteInfo3 /></div>
                <div><RouteInfo4 /></div>
                <div><RouteInfo5 /></div>
                <div><RouteInfo6 /></div>
            </div>
            
            <footer><Footer /></footer>
        </>
    )
}
export default homeRoute