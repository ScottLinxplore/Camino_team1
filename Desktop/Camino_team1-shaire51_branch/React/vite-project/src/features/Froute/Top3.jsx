import React, { useEffect, useState } from 'react'
import "./Top3.css"

export default function Top3() {
    const [routeData, setRouteData] = useState(null)
    useEffect(() => {
        fetch("https://test-camino.onrender.com/data?table=routes")
            .then((res) => res.json())  //  正確寫法=>用大括號{}會視作默認return，會報錯(return空值或undefined)

            .then((data) => {
                //找到id=0(法國之路)
                const route = data.find(item => item.route_id === 1)
                setRouteData(route)
            })
    }, []);

    const difficultyText = (level) => {
        if (level === 3) { return "簡易" }
        if (level === 2) { return "普通" }
        if (level === 1) { return "困難" }
    }

    return (
        <div className='boxContainer'>
            <div className='box'>
                <div className="tooltip-container">
                    <div className="box-icon">?</div>
                    <div className="box-text">綜合整條路線的坡度、公里數及沿路補給多寡</div>
                </div>
                難易度<br />
                {routeData ? difficultyText(routeData.difficulty) : "資料載入中"}
            </div>
            <div className='box'>
            <div className="tooltip-container">
                    <div className="box-icon">?</div>
                    <div className="box-text">依路況及困難度估算的建議步行天數</div>
                </div>
                建議天數<br />
                {routeData ? `${routeData.days}天` : "資料載入中"}
            </div>
            <div className='box'>
                                <div className="tooltip-container">
                    <div className="box-icon">?</div>
                    <div className="box-text">從起點到終點的實際公里總長度</div>
                </div>
                路線長度<br />
                {routeData ? `${routeData.length}公里` : "資料載入中"}
            </div>
        </div>
    )

}
