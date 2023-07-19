import React from "react";
import { Link } from "react-router-dom";
import firebase from '../untils/firebase';

import { Item } from "semantic-ui-react";

function Announcement() {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        firebase.firestore().collection("announcement").orderBy('date', 'desc').get().then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(docSnapshot => {
                const id = docSnapshot.id;
                return { ...docSnapshot.data(), id };
            })
            setPosts(data);
            console.log(data);
        })
    }, [])
    return (
        <>
            <Item.Group>
                {posts.map((posts) => {
                    return (
                        <>
                            <Item as={Link} to={`/Announcement/${posts.id}`} key={posts.id}>
                                <Item.Content>
                                    <Item.Header>
                                        {posts.type}　|　{posts.title}　|　{posts.date?.toDate().toLocaleDateString()}
                                    </Item.Header>
                                </Item.Content>
                            </Item>
                            <hr />
                        </>
                    );
                })}
            </Item.Group>

        </>

    );
}

export default Announcement;