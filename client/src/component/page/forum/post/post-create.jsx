import React from 'react';
import {Heading} from "../../../catalyst-ui/heading.jsx";
import PostCreateForm from "../../../form/forum/post-create-form.jsx";

function PostCreate(props) {
    document.title = "Posts - Nouveau post";

    return (
        <main>
            <PostCreateForm/>
        </main>
    );
}

export default PostCreate;