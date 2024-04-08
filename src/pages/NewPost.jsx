import React from "react";
import firebase from "../untils/firebase";
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import { Container, Header, Form, Image, Button } from "semantic-ui-react";
import { useNavigate } from 'react-router-dom';


function NewPost() {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    // const [topics, setTopics] = React.useState('');
    const [topicsName, setTopicsName] = React.useState('');
    const [file, setFile] = React.useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState('');

    const previewUrl = file ? URL.createObjectURL(file) : "https://semantic-ui.com/images/wireframe/image.png";

    function onSubmit() {
        setIsLoading(true);
        const ducumentRef = firebase.firestore().collection("posts").doc();
        const fileRef = firebase.storage().ref('post-images/' + file.name);
        const metadata = {
            contentType: file.type
        };
        fileRef.put(file, metadata).then(() => {
            fileRef.getDownloadURL().then((imageUrl) => {
                ducumentRef.set({
                    title,
                    content,
                    topic: topicsName,
                    createAt: firebase.firestore.Timestamp.now(),
                    author: {
                        displayName: firebase.auth().currentUser.displayName || "",
                        photoURL: firebase.auth().currentUser.photoURL || "",
                        uid: firebase.auth().currentUser.uid,
                        email: firebase.auth().currentUser.email,
                    },
                    imageUrl,
                }).then(() => {
                    alert('文章發表完成，可進入到各學院查看先前所發表的文章');
                    setIsLoading(false);
                    navigate('/');
                });
            });
        });
    }

    return (
        <Container>
            <Header>發表文章</Header>
            <Form onSubmit={onSubmit}>
                <Image src={previewUrl} size="small" floated="left" />
                <Button basic as="label" htmlFor="post-image" >上傳文章圖片</Button>
                {/* <p style={{color:'red',}}>*可上傳多張圖片</p> */}
                <Form.Input type="file" id="post-image" style={{ display: 'none', }}
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <Form.Input placeholder="輸入文章標題" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Form.TextArea placeholder="輸入文章內容" value={content} onChange={(e) => setContent(e.target.value)} />
                <Form.Dropdown
                    placeholder="選擇文章投稿學院"
                    options={[
                        {
                            text: '商管學院',
                            value: '商管學院'
                        },
                        {
                            text: '設計學院',
                            value: '設計學院'
                        },
                        {
                            text: '時尚學院',
                            value: '時尚學院'
                        },
                        {
                            text: '資訊學院',
                            value: '資訊學院'
                        },
                        {
                            text: '民生學院',
                            value: '民生學院'
                        },
                    ]}
                    selection
                    value={topicsName}
                    onChange={(e, { value }) => setTopicsName(value)}
                />
                <Form.Button loading={isLoading}>送出</Form.Button>
            </Form>
        </Container>
    );
}

export default NewPost;