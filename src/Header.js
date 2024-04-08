import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";
import React from "react";

import firebase from "./untils/firebase";
import 'firebase/compat/auth';
import { Container, Nav, Navbar} from "react-bootstrap";

function Header({ user }) {
    return (
        <div>
            <div className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#d9efff', }}>
                <div className="container">
                    <Link to='/'>
                        <h3>
                            <img className="img" src={require("./images/ltu.png")} width='80px' height='80px' alt='' />
                            <font style={{ color: 'black' }}><b>&nbsp;嶺東科技大學&nbsp;網Talk論壇</b></font>
                        </h3>
                    </Link>
                    <br /><Search />
                    <Menu style={{ backgroundColor: '#d9efff', border: 'none', }}>
                        {/* <Menu.Item>
                            <Search />
                        </Menu.Item> */}
                        
                        <Menu.Menu position="right">
                            {user ?
                                <>
                                    <Menu.Item as={Link} to="NewPost">發表文章</Menu.Item>
                                    <Menu.Item as={Link} to="Member">會員</Menu.Item>
                                    <Menu.Item onClick={() => firebase.auth().signOut()} as={Link} to="/" >登出</Menu.Item>
                                </> :
                                <Menu.Item as={Link} to="Login">註冊/登入</Menu.Item>
                            }
                        </Menu.Menu>
                    </Menu>
                </div>
            </div>
            {/* <Menu style={{ backgroundColor: '#d9efff', }}>

                <Menu.Item as={Link} to="/"><img className="img" src={require("./images/ltu.png")} alt=''></img>&nbsp;嶺東科技大學<br />&nbsp;網Talk論壇</Menu.Item>
                <Menu.Item>
                    <Search />
                </Menu.Item>
                <Menu.Menu position="right ">

                    {user ?
                        <>
                            <Menu.Item as={Link} to="NewPost">發表文章</Menu.Item>
                            <Menu.Item as={Link} to="member">會員</Menu.Item>
                            <Menu.Item onClick={() => firebase.auth().signOut()}>登出</Menu.Item>
                        </> :
                        <Menu.Item as={Link} to="Login">註冊/登入</Menu.Item>
                    }

                </Menu.Menu>
            </Menu> */}
            <header>
                <Container>
                    <div id="top-menu">
                        <h4>MENU</h4>
                    </div>
                    <nav id="top-nav">
                        <ul>
                            <Link to='Posts'><li><b>所有看板</b></li></Link>
                            <Link to='Business'><li><b>商管學院</b></li></Link>
                            <Link to='Design'><li><b>設計學院</b></li></Link>
                            <Link to='Fashion'><li><b>時尚學院</b></li></Link>
                            <Link to='Information'><li><b>資訊學院</b></li></Link>
                            <Link to='Person'><li><b>民生學院</b></li></Link>
                        </ul>
                    </nav>
                    <Navbar bg="light" expand="lg" className="phone_menu">
                        <Container>
                            <Navbar.Brand href="#home"></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="Posts">所有看板</Nav.Link>
                                    <Nav.Link href="Business">商管學院</Nav.Link>
                                    <Nav.Link href="Design">設計學院</Nav.Link>
                                    <Nav.Link href="Fashion">時尚學院</Nav.Link>
                                    <Nav.Link href="Information">資訊學院</Nav.Link>
                                    <Nav.Link href="Person">民生學院</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </header>

            <br />
        </div>
    );
}

export default Header;