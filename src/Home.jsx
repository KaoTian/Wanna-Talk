import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

import Announcement from './announcement/announcement';


function Home() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <div className='wrapper'>
            <div className='fullpage'>
                <div style={{ textAlign: 'center' }}>
                    <marquee className='marquee'>
                        <b><img src={require("./images/4.png")} width="30px" height="30px" alt=''></img>嶺東看板!!各系來留言~</b>
                    </marquee>
                </div>

                <Carousel activeIndex={index} onSelect={handleSelect} className='img_change'>
                    <Carousel.Item>
                        <img src={require("./images/home_image3.jpg")} className="d-block w-100" alt="..." style={{borderRadius: '10px',}} height='100%' />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("./images/home_image2.jpg")} className="d-block w-100" alt="..." style={{borderRadius: '10px',}} height='100%'/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("./images/home_image_1.jpg")} className="d-block w-100" alt="..." style={{borderRadius: '10px',}} height='100%'/>
                    </Carousel.Item>
                </Carousel>

                <br />

                <div className='news'>
                    <h2>最新公告</h2>
                    <Announcement />
                </div>
            </div>

            <div className="small-img img1">
                <div style={{ marginLeft: '10%', marginBottom: '5%', lineHeight: '70px', }}>
                    <div style={{fontFamily: 'arial, sansserif',borderCollapse: 'collapse', width: '100%',margin : 'auto',}}><br /><br />
                        <ul>
                            <li className="pic" style={{ float: 'left', }}>
                                <img src={require("./images/5.jpg")} width="100%" height="100%" alt='' style={{padding:'10px',}} />
                            </li>
                            <li className="pic" style={{ float: 'left', }}>
                                <img src={require("./images/6.jpg")} width="100%" height="100%" alt='' style={{padding:'10px',}} />
                            </li>
                            <li className="pic" style={{ float: 'left', }}>
                                <img src={require("./images/7.jpg")} width="100%" height="100%" alt='' style={{padding:'10px',}} />
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            

        </div>
    );
}

export default Home;