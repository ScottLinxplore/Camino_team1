import React, { useEffect, useState } from 'react'
import Navbar from "./components/navbar/Navbar1"
import Footer from "./components/footer/Footer"
import { useNavigate } from 'react-router-dom';
import Topimg from './components/stamp/Stamp.png'
import './Stamp.css'

const Albergue = () => {
  //抓stamp資料表
  const [stamp, SetStamp] = useState([])


  // 返回路線資訊的button
  const navigate = useNavigate();
  function Routes() {
    navigate("/")
  }

  //抓stamp資料表
  useEffect(() => {
    fetch('https://test-camino.onrender.com/data?table=stamp')
      .then(res => res.json())
      .then(SetStamp)

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

      {/* 最外層 */}
      <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>

        {/* 第二層-第一排 */}
        <div style={{ width: '1000px', marginBottom: '100px',backgroundColor:'white',borderRadius:'10px',boxShadow:'0 4px 8px rgba(0,0,0,0.1)' }}>
          {/* 第三層-第一排-區塊title */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
            {/* 左上圖片 */}
            <img style={{ width: '150px', height: '120px' }}
              //等第一筆資料stamp[0]跑出來之後才顯示img避免報錯
              src={stamp[0]?.stamp_img}
              alt="stampimg" />
            {/* 中間標題文字 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }}>
              <p style={{ margin: 'auto' }}>{stamp[0]?.city_name}</p>
              <p style={{ margin: 0 }}>{stamp[0]?.stamp_location}</p>
            </div>
            {/* 右上圖片 */}
            <img style={{ width: '100px', height: '120px' }}
              src={stamp[0]?.type_img}
              alt="icon" />

            <br />
          </div>
          <br />

          {/* 第二層-第二排(主體) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img style={{ width: '80%' }} src={stamp[0]?.stamp_location_image} alt="" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'left', flexDirection: 'column' }}>
            {/* 功能 */}
            <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
              功能:{stamp[0]?.function}
            </div>
            {/* 蓋章特色 */}
            <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
              <div style={{ marginBottom: '5px' }}>蓋章特色：</div>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                <li>{stamp[0]?.feature}</li>
              </ul>
            </div>
            {/* 連結 */}
            <div style={{ width: '80%', margin: 'auto', marginTop: '20px',marginBottom:'30px' }}>
              連結:<a className='link' href={stamp[0]?.link}>{stamp[0]?.link}</a>
            </div>
          </div>
        </div>

{/* ------------------------------------------------------------------------------------------------- */}

        {/* 第二層-第三排 */}
        <div style={{ width: '1000px', marginBottom: '100px',backgroundColor:'white',borderRadius:'10px',boxShadow:'0 4px 8px rgba(0,0,0,0.1)'  }}>
          {/* 第三層-第一排-區塊title */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
            {/* 左上圖片 */}
            <img style={{ width: '150px', height: '120px' }}
              //等第一筆資料stamp[0]跑出來之後才顯示img避免報錯
              src={stamp[1]?.stamp_img}
              alt="stampimg" />
            {/* 中間標題文字 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }}>
              <p style={{ margin: 'auto' }}>{stamp[1]?.city_name}</p>
              <p style={{ margin: 0 }}>{stamp[1]?.stamp_location}</p>
            </div>
            {/* 右上圖片 */}
            <img style={{ width: '100px', height: '120px' }}
              src={stamp[1]?.type_img}
              alt="icon" />

            <br />
          </div>
          <br />

          {/* 第二層-第二排(主體) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img style={{ width: '80%' }} src={stamp[1]?.stamp_location_image} alt="" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'left', flexDirection: 'column' }}>
            {/* 功能 */}
            <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
              功能:{stamp[1]?.function}
            </div>
            {/* 蓋章特色 */}
            <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
              <div style={{ marginBottom: '5px' }}>蓋章特色：</div>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                <li>{stamp[1]?.feature}</li>
              </ul>
            </div>
            {/* 連結 */}
            <div style={{ width: '80%', margin: 'auto', marginTop: '20px',marginBottom:'30px' }}>
              連結:<a className='link' href={stamp[1]?.link}>{stamp[1]?.link}</a>
            </div>
          </div>
        </div>
{/* ------------------------------------------------------------------------------------------------- */}

        <div style={{ width: '1000px', marginBottom: '100px',backgroundColor:'white',borderRadius:'10px',boxShadow:'0 4px 8px rgba(0,0,0,0.1)'  }}>
          {/* 第二層-第三排-區塊title */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
            {/* 左上圖片 */}
            <img style={{ width: '150px', height: '120px' }}
              //等第一筆資料stamp[0]跑出來之後才顯示img避免報錯
              src={stamp[2]?.stamp_img}
              alt="stampimg" />
            {/* 中間標題文字 */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '30px', fontWeight: 'bold' }}>
              <p style={{ margin: 'auto' }}>{stamp[2]?.city_name}</p>
              <p style={{ margin: 0 }}>{stamp[2]?.stamp_location}</p>
            </div>
            {/* 右上圖片 */}
            <img style={{ width: '100px', height: '120px' }}
              src={stamp[2]?.type_img}
              alt="icon" />

            <br />
          </div>
          <br />

          {/* 第二層-第三排(主體) */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img style={{ width: '80%' }} src={stamp[2]?.stamp_location_image} alt="" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'left', flexDirection: 'column' }}>
            {/* 功能 */}
            <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
              功能:{stamp[2]?.function}
            </div>
            {/* 蓋章特色 */}
            <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
              <div style={{ marginBottom: '5px' }}>蓋章特色：</div>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                <li>{stamp[2]?.feature}</li>
              </ul>
            </div>
            {/* 連結 */}
            <div style={{ width: '80%', margin: 'auto', marginTop: '20px',marginBottom:'30px' }}>
              連結:<a className='link' href={stamp[2]?.link}>{stamp[2]?.link}</a>
            </div>
          </div>
        </div>
      </div>
      <footer><Footer /></footer>
    </>
  )
}

export default Albergue