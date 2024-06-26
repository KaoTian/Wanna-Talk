import React from "react";
import { Header, Button, Segment, Modal, Input, Image } from "semantic-ui-react";
import firebase from "../untils/firebase";

function MyName({ user }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [displayName, setDisplayName] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    function onSubmit() {
        setIsLoading(true);
        user.updateProfile({
            displayName,
        }).then(() => {
            setIsLoading(false);
            setDisplayName('');
            setIsModalOpen(false);
        });
    }

    return (
        <>
            <Header size="samll">
                會員名稱
                <Button floated="right" onClick={() => setIsModalOpen(true)}>
                    修改
                </Button>
            </Header>
            <Segment vertical>
                {user.displayName}
            </Segment>
            <Modal open={isModalOpen} size="mini" className="modal_name">
                <Modal.Header>修改會員名稱</Modal.Header>
                <Modal.Content>
                    <Input placeholder="輸入新的會員名稱"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        fluid
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setIsModalOpen(false)}>取消</Button>
                    <Button onClick={onSubmit} loading={isLoading}>修改</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

function MyPhoto({ user }) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const previewImageURL = file ? URL.createObjectURL(file) : user.photoURL

    function onSubmit() {
        setIsLoading(true);
        const fileRef = firebase.storage().ref('user-photos/' + user.uid);
        const metadata = {
            contentType: file.type
        };
        fileRef.put(file, metadata).then(() => {
            fileRef.getDownloadURL().then((imageUrl) => {
                user.updateProfile({
                    photoURL: imageUrl,
                }).then(() => {
                    setIsLoading(false);
                    setFile(null);
                    setIsModalOpen(false);
                });
            });
        });
    }

    return (
        <>
            <Header size="samll">
                會員照片
                <Button floated="right" onClick={() => setIsModalOpen(true)}>修改</Button>
            </Header>
            <Segment vertical>
                <Image src={user.photoURL} avatar></Image>
            </Segment>
            <Modal open={isModalOpen} className="modal_photo" size="mini">
                <Modal.Header>修改會員照片</Modal.Header>
                <Modal.Content image>
                    <Image src={previewImageURL} avatar wrapped></Image>
                    <Modal.Description>
                        <Button as="label" htmlFor="post-image">上傳</Button>
                        <Input type="file" id="post-image" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setIsModalOpen(false)}>取消</Button>
                    <Button onClick={onSubmit} loading={isLoading}>修改</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

function MyPassword({user}) {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword,setNewPassword] = React.useState('');

    function onSubmit() {
        setIsLoading(true);
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
        user.reauthenticateWithCredential(credential).then(()=>{
            user.updatePassword(newPassword).then(()=>{
                setIsModalOpen(false);
                setOldPassword('');
                setNewPassword('');
                setIsLoading(false);
            });
        });
        
    }

    return (
        <>
            <Header size="samll">
                會員密碼
                <Button floated="right" onClick={() => { setIsModalOpen(true) }}>修改</Button>
            </Header>
            <Segment vertical>
                *****
            </Segment>
            <Modal open={isModalOpen} size="mini" className="modal_password">
                <Modal.Header>修改會員密碼</Modal.Header>
                <Modal.Content>
                    <Header>目前密碼</Header>
                    <Input placeholder="輸入舊密碼"
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        fluid
                    />
                    <Header>新密碼</Header>
                    <Input placeholder="輸入新密碼"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        fluid
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setIsModalOpen(false)}>取消</Button>
                    <Button onClick={onSubmit} loading={isLoading}>修改</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

function MySettings({user}) {
    return (
        <div style={{ TextAlign: 'left' }}>
            <Header textAlign="center">會員資料</Header>
            <hr />
            <MyName user={user} />
            <MyPhoto user={user} />
            <MyPassword user={user}/>
        </div>
    );
}

export default MySettings;