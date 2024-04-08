import React from 'react';
import { Menu, Form, Container, Message } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import firebase from '../untils/firebase';
import 'firebase/compat/auth';

function Login() {

    const navigate = useNavigate();
    const [activeItem, setActiveItem] = React.useState("login");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [isLoading,setIsLoading] = React.useState('');

    function onSubmit() {
        setIsLoading(true);
        if (activeItem === 'register') {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigate('/');
                    setIsLoading(false);
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/email-already-in-use":
                            setErrorMessage('信箱已存在');
                            break;
                        case "auth/invalid-email":
                            setErrorMessage('信箱格式不正確');
                            break;
                        case "auth/weak-password":
                            setErrorMessage('密碼強度不足');
                            break;
                        default:
                    }
                    setIsLoading(false);
                })
        } else if (activeItem === 'login') {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    navigate('/');
                    setIsLoading(false);
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/invalid-email":
                            setErrorMessage('信箱格式不正確');
                            break;
                        case "auth/user-not-found":
                            setErrorMessage('信箱不存在');
                            break;
                        case "auth/wrong-password":
                            setErrorMessage('密碼錯誤');
                            break;
                        default:
                    }
                    setIsLoading(false);
                })
        }
    }

    return (
        <Container>
            <Menu widths={2}>
                <Menu.Item active={activeItem === 'login'} onClick={() => {
                    setErrorMessage('');
                    setActiveItem("login");
                }}>登入</Menu.Item>
                <Menu.Item active={activeItem === 'register'} onClick={() => {
                    setErrorMessage('');
                    setActiveItem("register");
                }}>註冊</Menu.Item>
            </Menu>
            <Form onSubmit={onSubmit}>
                <Form.Input label="信箱" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="請輸入信箱"></Form.Input>
                <Form.Input label="密碼" value={password} onChange={(p) => setPassword(p.target.value)} placeholder="請輸入密碼" type='password'></Form.Input>
                {errorMessage && <Message negative>{errorMessage}</Message>}
                <Form.Button loading={isLoading}>
                    {activeItem === 'register' && '註冊'}
                    {activeItem === 'login' && '登入'}
                </Form.Button>
            </Form>
        </Container>
    );
}

export default Login;