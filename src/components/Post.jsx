import { Item, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Post({ post }) {
    return (
        <Item as={Link} to={`/Posts/${post.id}`} >
            {/* <Item.Image src={post.imageUrl || "https://semantic-ui.com/images/wireframe/image.png"} size="tiny" /> */}
            <Item.Content>
                <Item.Meta>
                    {post.author.photoURL ? <Image src={post.author.photoURL} avatar wrapped /> : <Icon name="user circle" />}
                    {post.topic}．{post.author.displayName || '使用者'}
                </Item.Meta>
                <Item.Header>{post.title}</Item.Header>
                <Item.Description>{post.content}</Item.Description>
                <Item.Extra>
                    留言　{post.commentsCount || 0}．讚　{post.likedBy?.length || 0}
                </Item.Extra>
                <hr />
            </Item.Content>
        </Item>
    );
}

export default Post