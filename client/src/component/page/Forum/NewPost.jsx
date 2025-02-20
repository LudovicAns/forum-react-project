import React from 'react';
import {Heading} from "../../catalyst-ui/heading.jsx";
import CreatePostForm from "../../form/forum/CreatePostForm.jsx";

function NewPost(props) {
    return (
        <main>
            <CreatePostForm/>
        </main>
    );
}

export default NewPost;