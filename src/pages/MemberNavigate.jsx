import React from "react";
import { Grid } from "semantic-ui-react";
import { Routes, Route } from "react-router-dom";
import firebase from '../untils/firebase';

import MyMenu from "../components/MyMenu";
import MyPosts from "./MyPosts";
import MyCollections from "./MyCollections";
import MySettings from "./MySettings";

function MemberNavigate() {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        })
    }, []);
    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <MyMenu />
                    </Grid.Column>
                    <Grid.Column width={10} textAlign="left">
                        <Routes>
                            <Route path='/posts' element={<MyPosts />}>
                            </Route>
                            <Route path='/collections' element={<MyCollections />}>
                            </Route>
                            <Route path='/settings' element={<MySettings user={user} />}>
                            </Route>
                        </Routes>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
        </>

    );
}

export default MemberNavigate