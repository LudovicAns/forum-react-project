import React, {useContext, useEffect, useState} from 'react';
import PostEditForm from "../../../form/forum/post-edit-form.jsx";
import {useParams} from "react-router";
import axios from "axios";
import {PostContext} from "../../../../context/post-context.jsx";

function PostEdit() {

    const {
        post,
        isLoading: isPostLoading,
    } = useContext(PostContext);

    return (
        <main>
            {
                (!isPostLoading && post) && (
                    <PostEditForm/>
                )
            }
        </main>
    );
}

export default PostEdit;