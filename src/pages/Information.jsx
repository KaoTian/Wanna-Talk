import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

function Information(){
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return(
        <div>
            <div style={{textAlign: 'center',}}>
                <div style={{marginLeft: '15%', margiTop:'2%', float: 'left',}}>

                </div>
                <marquee direction="left" height="35" scrollamount="5" width="90%" behavior="alternate" bgcolor="#f08da3" style={{borderRadius: '10px',}}>
                    <b><img src={require("../images/4.png")} width="45" height="45" alt="" />嶺東看板!!資訊學院來留言~</b>
                </marquee><br />

                <Carousel activeIndex={index} onSelect={handleSelect} className='img_change'>
                    <Carousel.Item>
                        <img src={require("../images/39.jpg")} className="d-block w-100" alt="..." />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../images/40.jpg")} className="d-block w-100" alt="..." />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../images/41.jpg")} className="d-block w-100" alt="..." />
                    </Carousel.Item>
                </Carousel>

                <br />

                <div className='news'>
                    <h2>文章列表</h2>
                    {/* <iframe src="" /> */}
                </div>

            </div>

            <div className="grid">
                <figure className="effect-romeo">
                    <img src={require("../images/25.jpg")} alt="img06" />
                    <figcaption>
                        <h2><span>資訊科技系</span></h2>
                        <p>Department of Information Technology</p>
                        <a href="https://itec.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-romeo">
                    <img src={require("../images/26.jpg")} alt="img03" />
                    <figcaption>
                        <h2><span>資訊管理系</span></h2>
                        <p>Department of Information Management</p>
                        <a href="https://im.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
            </div>
        </div>
    );
}

export default Information;