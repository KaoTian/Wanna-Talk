import React from "react";
import firebase from '../untils/firebase';
import 'firebase/compat/firestore';

import { Item, Header } from "semantic-ui-react";
import Post from "../components/Post";

function MyPosts() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        firebase
            .firestore()
            .collection("posts")
            .where("author.uid", "==", firebase.auth().currentUser.uid || {})
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map(docSnapshot => {
                    const id = docSnapshot.id;
                    return { ...docSnapshot.data(), id };
                })
                setPosts(data);
                console.log(data);
            })
    }, [])
    return (
        <Item.Group>
            <Header textAlign="center">我的文章</Header>
            <hr />
            {posts.map((post) => {
                return (
                    <Post post={post} key={post.id}/>
                );
            })}
        </Item.Group>
    );
}

export default MyPosts;