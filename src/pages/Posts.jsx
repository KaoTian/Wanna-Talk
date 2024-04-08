import React from "react";
import firebase from '../untils/firebase';
import 'firebase/compat/firestore';

import { Item } from "semantic-ui-react";
import Post from "../components/Post";

function Posts() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        firebase.firestore().collection("posts").orderBy('createAt','desc').get().then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(docSnapshot => {
                const id = docSnapshot.id;
                return {...docSnapshot.data(),id};
            })
            setPosts(data);
            console.log(data);
        })
    }, [])
    return (
            <Item.Group>
                {posts.map((post) => {
                    return (
                        <Post post={post} key={post.id}/>
                    );
                })}
            </Item.Group>
    );
}

export default Posts;