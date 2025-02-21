import React from 'react';
import {Text} from "../../catalyst-ui/text.jsx";
import CreateCommentForm from "../../form/forum/CreateCommentForm.jsx";

function WritePostCommentWidget({post}) {
    if (!post) return <Text>Invalid post</Text>

    return (
        <div>
            <CreateCommentForm post={post}/>
        </div>
    );
}

export default WritePostCommentWidget;