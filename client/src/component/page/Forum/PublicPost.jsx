import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import {Text} from "../../catalyst-ui/text.jsx";
import {UserContext} from "../../../context/UserContextProvider.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";
import {Heading} from "../../catalyst-ui/heading.jsx";
import UserAvatarWidget from "../../widget/UserAvatarWidget.jsx";
import WritePostCommentWidget from "../../widget/forum/WritePostCommentWidget.jsx";
import CommentCard from "../../widget/forum/CommentCard.jsx";

function PublicPost(props) {

    const userContext = useContext(UserContext);

    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BACKEND_HOST}api/posts/${id}`, {withCredentials: true})
            .then(res => {
                if (res.status === 204) {
                    setPost(null);
                    return;
                }
                setPost(res.data.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main>
            {
                !loading &&
                <>
                    <div>
                        <div className={"flex flex-row justify-between"}>
                            <Heading>{post.title}</Heading>
                            <UserAvatarWidget user={post.author}/>
                        </div>
                        {
                            post.content.split("\n").map((line, i) => (
                                <Text key={i}>
                                    {line}
                                </Text>
                            ))
                        }
                    </div>
                    <Divider className={"my-4"}/>
                    {
                        userContext.user.id !== post.author.id && (
                            <WritePostCommentWidget post={post}/>
                        )
                    }
                    {
                        post.comments?.length > 0 && (
                            <div>
                                <Heading>Commentaires</Heading>
                                {
                                    post.comments.map((comment) => (
                                        <CommentCard key={comment.id} comment={comment} />
                                    ))
                                }
                            </div>
                        )
                    }
                </>
            }
        </main>
    );
}

export default PublicPost;