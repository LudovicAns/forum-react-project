import React from 'react';
import {Text} from "../../catalyst-ui/text.jsx";

function CommentCard({comment}) {

    if (!comment) return (<></>);

    return (
        <div>
            <Text>{comment.content}</Text>
        </div>
    );
}

export default CommentCard;