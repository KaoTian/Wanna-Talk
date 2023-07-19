import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Item } from "semantic-ui-react";

import firebase from '../untils/firebase';
import Post from "../components/Post";


function Person() {

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
            .where("topic", "==", "民生學院")
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
                    <b><img src={require("../images/4.png")} width="45" height="45" alt="" />嶺東看板!!民生學院來留言~</b>
                </marquee><br />

                <Carousel activeIndex={index} onSelect={handleSelect} className='img_change'>
                    <Carousel.Item>
                        <img src={require("../images/48.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={require("../images/49.jpg")} className="d-block w-100" alt="..." style={{ borderRadius: '10px', }} />
                    </Carousel.Item>
                </Carousel>
            </div>


            <div className="department">
                <ul>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/50.jpg")} alt="img50" width='30%' height='30%' />
                            <figcaption>
                                <h2><span>觀光與休閒管理</span></h2>
                                <p>Tourism and Leisure Management</p>
                                <a href="https://tlm.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/51.jpg")} alt="img51" width='30%' height='30%' />
                            <figcaption>
                                <h2><span>應用外語系</span></h2>
                                <p>Applied Foreign Languages</p>
                                <a href="https://afl.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                    <li>
                        <figure className="effect-layla">
                            <img src={require("../images/52.jpg")} alt="img52" width='30%' height='30%' />
                            <figcaption>
                                <h2><span>幼兒保育系</span></h2>
                                <p>Child Care and Education</p>
                                <a href="https://cce.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                            </figcaption>
                        </figure>
                    </li>
                </ul>
            </div>

            {/* <div className="grid">
                <figure className="effect-layla">
                    <img src={require("../images/50.jpg")} alt="img50" />
                    <figcaption>
                        <h2><span>觀光與休閒管理</span></h2>
                        <p>Department of Tourism and Leisure Management</p>
                        <a href="https://tlm.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src={require("../images/51.jpg")} alt="img51" />
                    <figcaption>
                        <h2><span>應用外語系</span></h2>
                        <p>Department of Applied Foreign Languages</p>
                        <a href="https://afl.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
                    </figcaption>
                </figure>
                <figure className="effect-layla">
                    <img src={require("../images/52.jpg")} alt="img52" />
                    <figcaption>
                        <h2><span>幼兒保育系</span></h2>
                        <p>Department of Child Care and Education</p>
                        <a href="https://cce.ltu.edu.tw/" target="_blank" rel="noreferrer">View more</a>
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

export default Person;