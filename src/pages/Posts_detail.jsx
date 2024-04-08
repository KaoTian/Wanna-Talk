import React from "react";
import { useParams } from "react-router-dom";
import { Image, Header, Segment, Icon, Comment, Form } from "semantic-ui-react";

import firebase from "../untils/firebase";

function Post_detail() {
    const { postId } = useParams();
    const [post, setPost] = React.useState({
        author: {},
    });
    const [commentContent, setCommentContent] = React.useState('');
    const [isLoding, setIsLoding] = React.useState(false);
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        firebase.firestore()
            .collection('posts')
            .doc(postId)
            .onSnapshot((docSnapshot) => {
                const data = docSnapshot.data();
                setPost(data);
            });
        // .get()
        // .then((docSnapshot) => {
        //     const data = docSnapshot.data();
        //     setPost(data);
        // });
    }, []);

    React.useEffect(() => {
        firebase.firestore().collection('posts').doc(postId).collection('comments').orderBy('createAt').onSnapshot((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(doc => {
                return doc.data();
            })
            console.log(data);
            setComments(data);
        });
    }, []);

    function toggle(isActive, field) {
        const uid = firebase.auth().currentUser.uid;

        //下方為原始程式碼的二次簡化
        firebase.firestore().collection("posts").doc(postId).update({
            [field]: isActive
                ? firebase.firestore.FieldValue.arrayRemove(uid)
                : firebase.firestore.FieldValue.arrayUnion(uid),
        });

        //下方為原始程式碼的簡化
        // if(isActive){
        //     firebase.firestore().collection("posts").doc(postId).update({
        //         [field]:firebase.firestore.FieldValue.arrayRemove(uid),
        //     });
        // }else{
        //     firebase.firestore().collection("posts").doc(postId).update({
        //         [field]:firebase.firestore.FieldValue.arrayUnion(uid),
        //     });
        // }
    }

    //下方最原始程式碼
    // function toggleCollected(){
    //     const uid = firebase.auth().currentUser.uid;

    //     if(isCollected){
    //         firebase.firestore().collection("posts").doc(postId).update({
    //             collectedBy:firebase.firestore.FieldValue.arrayRemove(uid),
    //         });
    //     }else{
    //         firebase.firestore().collection("posts").doc(postId).update({
    //             collectedBy:firebase.firestore.FieldValue.arrayUnion(uid),
    //         });
    //     }

    // }
    // function toggleLiked(){
    //     const uid = firebase.auth().currentUser.uid;

    //     if(isLiked){
    //         firebase.firestore().collection("posts").doc(postId).update({
    //             likedBy:firebase.firestore.FieldValue.arrayRemove(uid),
    //         });
    //     }else{
    //         firebase.firestore().collection("posts").doc(postId).update({
    //             likedBy:firebase.firestore.FieldValue.arrayUnion(uid),
    //         });
    //     }
    // }
    const isCollected = post.collectedBy?.includes(firebase.auth().currentUser.uid);
    const isLiked = post.likedBy?.includes(firebase.auth().currentUser.uid);


    function onSumbit() {
        setIsLoding(true)
        const firestore = firebase.firestore();
        const batch = firestore.batch();
        const postRef = firestore.collection('posts').doc(postId);

        batch.update(postRef, {
            commentsCount: firebase.firestore.FieldValue.increment(1)
        })

        const commentRef = postRef.collection('comments').doc();
        batch.set(commentRef, {
            content: commentContent,
            createAt: firebase.firestore.Timestamp.now(),
            author: {
                uid: firebase.auth().currentUser.uid,
                displayName: firebase.auth().currentUser.displayName || '',
                photoURL: firebase.auth().currentUser.photoURL || '',
            },
        });

        batch.commit().then(() => {
            setCommentContent('');
            setIsLoding(false);
        });
    }

    return (
        <div>

            {post.author.photoURL ? <Image src={post.author.photoURL} avatar wrapped /> : <Icon name="user circle" />}
            {post.author.displayName || "使用者"}
            <Header>
                {post.title}
                <Header.Subheader>
                    {post.topic}．{post.createAt?.toDate().toLocaleDateString()}
                </Header.Subheader>
            </Header>
            <Image src={post.ImageUrl}></Image>
            <Segment basic vertical>{post.content}</Segment>
            <Segment basic vertical>
                留言　{post.commentsCount || 0}．讚　{post.likedBy?.length || 0}．
                <Icon name={`thumbs up${isLiked ? '' : ' outline'}`} color={isLiked ? 'blue' : 'grey'} link onClick={() => toggle(isLiked, 'likedBy')} />．
                <Icon name={`bookmark${isCollected ? '' : ' outline'}`} color={isCollected ? 'blue' : 'grey'} link onClick={() => toggle(isCollected, 'collectedBy')} />
            </Segment>
            <Comment.Group>
                <Form reply>
                    <Form.TextArea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                    <Form.Button onClick={onSumbit} loading={isLoding}>留言</Form.Button>
                </Form>
                <Header>
                    共 {post.commentsCount || 0} 則留言
                </Header>
                {comments.map((comment) => {
                    return (
                        <Comment>
                            <Comment.Avatar src={comment.author.photoURL} />
                            <Comment.Content>
                                <Comment.Author as="span">{comment.author.displayName || '使用者'}</Comment.Author>
                                <Comment.Metadata>{comment.createAt.toDate().toLocaleString()}</Comment.Metadata>
                                <Comment.Text>{comment.content}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    );
                })}

            </Comment.Group>

        </div>
    );
}

export default Post_detail;