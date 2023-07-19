import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import firebase from './untils/firebase';

import './css/style.css';

import Header from './Header';
import Footer from './Footer';
import Login from './pages/Login';
import Home from './Home';
import Business from './pages/Business';
import Design from './pages/Design';
import Fashion from './pages/Fashion';
import Information from './pages/Information';
import Person from './pages/Person';
import NewPost from './pages/NewPost';
import Posts from './pages/Posts';
import Post_detail from './pages/Posts_detail';
import Announcement_detail from './announcement/Announcement_detail';
import MemberNavigate from './pages/MemberNavigate';


function App() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    })
  }, []);
  return (  
    <BrowserRouter>
      <Header user={user} />
      <Container>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Login' element={user ? <Navigate to="/" /> : <Login />}></Route>
          <Route path='/Posts' element={<Posts />}></Route>
          <Route path='/Business' element={<Business />}></Route>
          <Route path='/Design' element={<Design />}></Route>
          <Route path='/Fashion' element={<Fashion />}></Route>
          <Route path='/Information' element={<Information />}></Route>
          <Route path='/Person' element={<Person />}></Route>
          <Route path='/NewPost' element={user ? <NewPost /> : <Navigate to="/" />}></Route>
          <Route path='/Posts/:postId' element={user ? <Post_detail /> : <Navigate to="/" />}></Route>
          <Route path='/Announcement/:postId' element={<Announcement_detail />}></Route>
          <Route path='/Member/*' element={user ? <MemberNavigate />:<Navigate to="/" />}></Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
