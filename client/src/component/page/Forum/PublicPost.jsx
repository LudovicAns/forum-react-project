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
import {Button} from "../../catalyst-ui/button.jsx";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/20/solid/index.js";

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
                    document.title = "Forum - Post introuvable"
                    return;
                }
                document.title = `Forum - ${res.data.data.title}`
                setPost(res.data.data);
            })
            .catch(err => {
                document.title = "Forum - Erreur"
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const isOwner = userContext.user.id === post?.author.id;

    const ownerActions = (
        <div className={"flex flex-row gap-4 w-full justify-end max-lg:justify-center mb-4"}>
            <Button color={"light"} className={"cursor-pointer !text-blue-500"} href={"/forum/edit-post/" + id}>
                <PencilSquareIcon className={"fill-blue-500"}/>
                Modifier
            </Button>
            <Button color={"light"} className={"cursor-pointer !text-red-500"} onClick={() => {console.log("todo: supprimer")}}>
                <TrashIcon className={"fill-red-500"}/>
                Supprimer
            </Button>
        </div>
    );

    return (
        <main>
            {
                !loading &&
                <>
                    <div>
                        {
                            isOwner && (
                                <>
                                    {ownerActions}
                                </>
                            )
                        }
                        <div className={"border border-zinc-950/10 dark:border-white/10 rounded-md p-8"}>
                            <div className={"flex flex-row justify-between mb-4"}>
                                <Heading>{post.title}</Heading>
                                <UserAvatarWidget user={post.author}/>
                            </div>
                            <Divider className={"my-4"}/>
                            {
                                post.content.split("\n").map((line, i) => (
                                    <Text key={i}>
                                        {line}
                                    </Text>
                                ))
                            }
                        </div>
                    </div>
                    <Divider className={"my-4"}/>
                    {
                        !isOwner && (
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