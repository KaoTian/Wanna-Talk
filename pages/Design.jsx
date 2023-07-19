import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Item } from "semantic-ui-react";

import firebase from '../untils/firebase';
import Post from "../components/Post";


function Design() {

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
            .where("topic", "==", "設計學院")
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
                    <b><img src={require("../images/4.png")} width="45" height="45" alt="" />嶺東看板!!設計學院來留言~</b>
                </marquee><br />

                <Carousel activeIndex={index} onSelect={handleSelect} className='img_change'>
                    <Carousel.Item>
                        <img src={require("../images/23.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../images/24.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../images/22.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                </Carousel>

            </div>

            <div className="department">
                <ul>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/25.jpg")} alt="img25" width='60%' height='60%' />
                            <figcaption>
                                <h2><span>視覺傳達設計</span></h2>
                                <p>Department of Visual Communication Design</p>
                                <a href="https://vcd.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/25.jpg")} alt="img26" width='60%' height='60%' />
                            <figcaption>
                                <h2><span>數位媒體設計</span></h2>
                                <p>Department of Digital Content Design</p>
                                <a href="https://dcd.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/25.jpg")} alt="img27" width='60%' height='60%' />
                            <figcaption>
                                <h2><span>創意產品設計</span></h2>
                                <p>Department of Creative Product Design</p>
                                <a href="https://cpd.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
            </div>

            {/* <div className="grid">
                <figure className="effect-layla">
                    <img src={require("../images/25.jpg")} alt="img25" />
                    <figcaption>
                        <h2><span>視覺傳達設計</span></h2>
                        <p>Department of Visual Communication Design</p>
                        <a href="https://vcd.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src={require("../images/26.jpg")} alt="img26" />
                    <figcaption>
                        <h2><span>數位媒體設計</span></h2>
                        <p>Department of Digital Content Design</p>
                        <a href="https://dcd.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src={require("../images/27.jpg")} alt="img27" />
                    <figcaption>
                        <h2><span>創意產品設計</span></h2>
                        <p>Department of Creative Product Design</p>
                        <a href="https://cpd.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
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

export default Design;