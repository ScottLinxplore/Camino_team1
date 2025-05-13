import React, { useEffect, useState } from 'react'

export const IntroFooter = () => {
    const [cimg_1, setCimg_1] = useState(null) //抓圖片=>葡萄牙之路
    const [cityIntro, setCityIntro] = useState(null)    //抓intro=>葡萄牙之路


    //圖片=>葡萄牙之路
    useEffect(() => {
        fetch('https://test-camino.onrender.com/data?table=img')
            .then(res => res.json())
            .then(data => {
                
                const ImgData = data.find(item => item.target_id === 3)
                if (ImgData && ImgData.img_url) {
                    setCimg_1(ImgData.img_url);
                } else {
                    console.warn("找不到 route_id === 3 的圖片資料");
                }
            })
            .catch(err => {
                console.error("圖片資料抓取錯誤：", err);
            })

    }, [])
    //抓intro
    useEffect(() => {
        fetch('https://test-camino.onrender.com/data?table=routes')
            .then(res => res.json())
            .then((data) => {
                //篩選此json檔案的route_id = 5的那筆資料(葡萄牙之路)
                const intro = data.find(item => item.route_id === 6)
                setCityIntro(intro)
            })
    }, [])

    return (
        <div style={{ width: '400px' }}>
            <h2 style={{ justifyContent:'center',display:'flex' }}>葡萄牙之路</h2>
            {cimg_1 ? (
                <img
                    src={cimg_1}
                    alt="底部圖片"
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px'
                    }}
                />
            ) : (
                '圖片載入中...'
            )}
            {/* 加入防呆=>避免初始狀態null被抓取導致報錯 */}
            <p>{cityIntro ? cityIntro.intro : "資料載入中"}</p>
        </div>
    );
};

