import React, {useContext} from 'react';
import {Text} from "../../../catalyst-ui/text.jsx";
import CommentCreateForm from "../../../form/forum/comment-create-form.jsx";
import clsx from "clsx";

function WritePostCommentWidget({className, post}) {
    return (
        <div className={clsx(className)}>
            <CommentCreateForm post={post}/>
        </div>
    );
}

export default WritePostCommentWidget;