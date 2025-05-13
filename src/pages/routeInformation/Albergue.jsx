import React, { useEffect, useState } from 'react';
import Navbar from "../../features/navbar/Navbar1.jsx"
import Footer from "../../features/footer/Footer.jsx"
import Topimg from '../../features/albergue/shlter.png'
import { useNavigate } from 'react-router-dom';
import Card from '../../features/albergue/card.jsx'

const Albergue = () => {
  // 返回路線資訊的button
  const navigate = useNavigate();
  function Routes() {
    navigate("/")
  }

  // 抓取庇護所的資料(先設定為空陣列)
  const [albergue, SetAlbergue] = useState([])

  // fetch庇護所
  useEffect(() => {
    fetch('https://test-camino.onrender.com/data?table=albergue')
      .then(res => res.json())
      .then(SetAlbergue)

  }, [])
  return (
    <>
      <div style={{ fontFamily: "sans-serif", padding: "10px", paddingLeft: "20px" }}>
        <nav><Navbar /> </nav>
        <img src={Topimg} alt='上方' style={{ width: '600px', marginTop: '30px' }}></img>
      </div>
      <div style={{
        display: 'flex',
        width: '150px',
        height: '30px',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: "rgb(104,175,69)",
        color: "rgb(255, 255, 255)",
        border: "rgb(104,175,69) solid 2px",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: '16px'
      }} onClick={Routes}>←返回路線資訊</div>
      <hr />
      <div style={{ fontSize: '20px',marginBottom:'20px' }}>城市:Saint-Jean-Pied-de-Port</div>
      

        <div style={{
          display: 'flex',
          width: '1000px',
          gap: '20px',
          marginTop: '40px',
          // border: '3px solid red',
          flexWrap: 'wrap',
          padding: '10px',
          justifyContent: 'center',
          margin:'auto'
        }}>
          {/* 顯示1~3筆資料 */}
          {albergue.slice(0, 3).map((item, index) => (
            <Card
              key={`group1-${item.Aid || index}`}
              name={item.name}
              type={item.type}
              address={item.address}
              features={item.feature}
              link={item.link}
              imgUrl={item.img_url}
            />
          ))}
        </div>

      <hr />
      <div style={{fontSize:'20px',marginTop:'20px',marginBottom:'20px'}}>城市:Roncesvalles（羅恩塞斯瓦列斯）</div>

      <div style={{
        display: 'flex',
        width: '1000px',
        gap: '20px',
        marginTop: '40px',
        flexWrap: 'wrap',
        padding: '10px',
        justifyContent: 'center',
        margin:'auto',
      }}>
        {/* 顯示4~6筆資料 */}
        {albergue.slice(3,6).map((item, index) => (
          <Card
          
            key={`group1-${item.Aid || index}`}
            name={item.name}
            type={item.type}
            address={item.address}
            features={item.feature}
            link={item.link}
            imgUrl={item.img_url}
          />
        ))}
      </div>
      <footer><Footer /></footer>
    </>
  )
}

export default Albergue