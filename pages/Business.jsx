import firebase from '../untils/firebase';
import 'firebase/compat/firestore';

import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Item } from "semantic-ui-react";
import Post from "../components/Post";

function Business() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    //下方為分類文章列表
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        firebase
            .firestore()
            .collection("posts")
            .where("topic", "==", "商管學院")
            .orderBy('createAt','desc')
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map(docSnapshot => {
                    const id = docSnapshot.id;
                    return { ...docSnapshot.data(), id };
                })
                setPosts(data);
            })
    }, [])
    //

    return (
        <div>
            <div style={{ textAlign: 'center', }}>
                <div style={{ marginLeft: '15%', margiTop: '2%', float: 'left', }}>

                </div>
                <marquee direction="left" height="35" scrollamount="5" width="90%" behavior="alternate" bgcolor="#f08da3" style={{ borderRadius: '10px', }}>
                    <b><img src={require("../images/4.png")} width="45" height="45" alt="" />嶺東看板!!商管學院來留言~</b>
                </marquee><br />

                <Carousel activeIndex={index} onSelect={handleSelect} className='img_change'>
                    <Carousel.Item>
                        <img src={require("../images/13.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../images/14.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../images/15.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                </Carousel>


            </div>

            <div className="department">
                <ul>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/29.jpg")} alt="img06" width='60%' height='60%' />
                            <figcaption>
                                <h3><span>企業管理系</span></h3>
                                <p>Department of Business Administration</p>
                                <a href="https://ba.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/29.jpg")} alt="img03" width='60%' height='60%' />
                            <figcaption>
                                <h2><span>財務金融系</span></h2>
                                <p>Department of Finance</p>
                                <a href="https://fin.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/29.jpg")} alt="img03" width='60%' height='60%' />
                            <figcaption>
                                <h2><span>會計資訊系</span></h2>
                                <p>Department of Accounting and Information Technology</p>
                                <a href="https://ait.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla" as>
                            <img src={require("../images/29.jpg")} alt="img06" width='60%' height='60%' />
                            <figcaption>
                                <h2><span>行銷管理系</span></h2>
                                <p>Department of Marketing and Logistics Management</p>
                                <a href="https://ml.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/29.jpg")} alt="img03" width='60%' height='60%' />
                            <figcaption>
                                <h2><span>國際企業系</span></h2>
                                <p>Department of International Business</p>
                                <a href="https://ib.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/29.jpg")} alt="img03" width='60%' height='60%' />
                            <figcaption>
                                <h2><span>商管碩士班</span></h2>
                                <p>Master of Business Administration M.B.A.</p>
                                <a href="https://bm.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
            </div>

            {/* <div className="grid" >
                <figure className="effect-layla">
                    <img src={require("../images/28.jpg")} alt="img06" width='20%' height='20%' />
                    <figcaption>
                        <h2><span>企業管理系</span></h2>
                        <p>Department of Business Administration</p>
                        <a href="https://ba.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src={require("../images/30.jpg")} alt="img03" width='20%' height='20%' />
                    <figcaption>
                        <h2><span>財務金融系</span></h2>
                        <p>Department of Finance</p>
                        <a href="https://fin.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src={require("../images/29.jpg")} alt="img03" width='20%' height='20%' />
                    <figcaption>
                        <h2><span>會計資訊系</span></h2>
                        <p>Department of Accounting and Information Technology</p>
                        <a href="https://ait.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src={require("../images/31.jpg")} alt="img06" width='20%' height='20%' />
                    <figcaption>
                        <h2><span>行銷管理系</span></h2>
                        <p>Department of Marketing and Logistics Management</p>
                        <a href="https://ml.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src="https://tympanus.net/Development/HoverEffectIdeas/img/3.jpg" alt="img03" width='20%' height='20%' />
                    <figcaption>
                        <h2><span>國際企業系</span></h2>
                        <p>Department of International Business</p>
                        <a href="https://ib.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src={require("../images/32.jpg")} alt="img03" width='20%' height='20%' />
                    <figcaption>
                        <h2><span>商管碩士班</span></h2>
                        <p>Master of Business Administration M.B.A.</p>
                        <a href="https://bm.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
            </div> */}

            <br />

            <div className='news'>
                <h2>文章列表</h2>
                <Item.Group style={{ textAlign: 'left' }}>
                    {posts.map((post) => {
                        return (
                            <Post post={post} key={post.id} />
                        );
                    })}
                </Item.Group>
            </div>

        </div>
    );
}

export default Business;