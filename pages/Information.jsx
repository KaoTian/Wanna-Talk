import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Item } from "semantic-ui-react";

import firebase from '../untils/firebase';
import Post from "../components/Post";

function Information() {
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
            .where("topic", "==", "資訊學院")
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
                    <b><img src={require("../images/4.png")} width="45" height="45" alt="" />嶺東看板!!資訊學院來留言~</b>
                </marquee><br />

                <Carousel activeIndex={index} onSelect={handleSelect} className='img_change'>
                    <Carousel.Item>
                        <img src={require("../images/39.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../images/40.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../images/41.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                </Carousel>

            </div>

            <div className="department">
                <ul>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/44.jpg")} alt="img06" width='40%' height='40%' />
                            <figcaption>
                                <h2><span>資訊科技系</span></h2>
                                <p>Information Technology</p>
                                <a href="https://itec.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/44.jpg")} alt="img03" width='40%' height='40%' />
                            <figcaption>
                                <h2><span>資訊管理系</span></h2>
                                <p>Information Management</p>
                                <a href="https://im.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
            </div>

            {/* <div className="grid">
                <figure className="effect-layla">
                    <img src={require("../images/42.jpg")} alt="img06" />
                    <figcaption>
                        <h2><span>資訊科技系</span></h2>
                        <p>Department of Information Technology</p>
                        <a href="https://itec.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src={require("../images/44.jpg")} alt="img03" />
                    <figcaption>
                        <h2><span>資訊管理系</span></h2>
                        <p>Department of Information Management</p>
                        <a href="https://im.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
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

export default Information;