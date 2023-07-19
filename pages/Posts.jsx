import React from "react";
import firebase from '../untils/firebase';
import 'firebase/compat/firestore';

import { Item } from "semantic-ui-react";
import { Waypoint } from "react-waypoint";
import Post from "../components/Post";

function Posts() {
    const [posts, setPosts] = React.useState([]);
    // const lastPostSnapshotRef = React.useRef();

    React.useEffect(() => {
        firebase
            .firestore()
            .collection("posts")
            .orderBy('createAt', 'desc')
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map(docSnapshot => {
                    const id = docSnapshot.id;
                    return { ...docSnapshot.data(), id };
                });
                // lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                setPosts(data);
                console.log(data);
            })
    }, [])
    return (
        <>
            <Item.Group>
                {posts.map((post) => {
                    return (
                        <Post post={post} key={post.id} />
                    );
                })}
            </Item.Group>
            {/* <Waypoint onEnter={() => {
                if (lastPostSnapshotRef.current) {
                    firebase
                        .firestore()
                        .collection("posts")
                        .orderBy('createAt', 'desc')
                        .startAfter(lastPostSnapshotRef.current)
                        .limit(3)
                        .get()
                        .then((collectionSnapshot) => {
                            const data = collectionSnapshot.docs.map(docSnapshot => {
                                const id = docSnapshot.id;
                                return { ...docSnapshot.data(), id };
                            });
                            lastPostSnapshotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1];
                            setPosts([...posts,...data]);
                            console.log(data);
                        })
                }
            }} /> */}
        </>
    );
}

export default Posts;