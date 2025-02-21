import React, {useContext} from 'react';
import {Text} from "../../../catalyst-ui/text.jsx";
import CommentCreateForm from "../../../form/forum/comment-create-form.jsx";

function WritePostCommentWidget({post}) {

    if (!post) return <Text>Invalid post</Text>

    return (
        <div>
            <CommentCreateForm post={post}/>
        </div>
    );
}

export default WritePostCommentWidget;