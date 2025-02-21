import React, {useContext, useEffect, useState} from 'react';
import EditPostForm from "../../form/forum/EditPostForm.jsx";
import {useParams} from "react-router";
import axios from "axios";
import {PostContext} from "../../../context/PostContextProvider.jsx";

function EditPost() {

    const {
        post,
        isLoading: isPostLoading,
    } = useContext(PostContext);

    return (
        <main>
            {
                (!isPostLoading && post) && (
                    <EditPostForm/>
                )
            }
        </main>
    );
}

export default EditPost;