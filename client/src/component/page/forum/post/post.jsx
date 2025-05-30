import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {Text} from "../../../catalyst-ui/text.jsx";
import {UserContext} from "../../../../context/user-context.jsx";
import {Divider} from "../../../catalyst-ui/divider.jsx";
import {Heading} from "../../../catalyst-ui/heading.jsx";
import UserAvatarWidget from "../../../widget/user-avatar-widget.jsx";
import WritePostCommentWidget from "../../../widget/forum/post/write-post-comment-widget.jsx";
import PostCommentCard from "../../../widget/forum/post/post-comment-card.jsx";
import {Button} from "../../../catalyst-ui/button.jsx";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/20/solid/index.js";
import {Alert, AlertActions, AlertDescription, AlertTitle} from "../../../catalyst-ui/alert.jsx";
import error from "eslint-plugin-react/lib/util/error.js";
import {PostContext} from "../../../../context/post-context-provider.jsx";
import PostCommentList from "../../../widget/forum/post/post-comment-list.jsx";

function Post(props) {

    const userContext = useContext(UserContext);
    const postContext = useContext(PostContext);

    const {
        post,
        isLoading: isPostLoading,
        error: postError
    } = postContext;

    const navigate = useNavigate();

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    if (isPostLoading) return (<Text>Chargement ...</Text>);

    if (postError) return (<Text>{error.message}</Text>);

    if (post === null) return null;

    document.title = "Forum - " + post.title;

    const isOwner = userContext.user.id === post?.author.id;

    function onDeletePost() {
        postContext.deletePost(() => {
            navigate("/forum/posts");
        }, (error) => {
            console.error(error);
        }, () => {
            setDeleteAlertOpen(false);
        });
    }

    const ownerActions = (
        <div className={"flex flex-row gap-4 w-full justify-end max-lg:justify-center mb-4"}>
            <Button color={"light"} className={"cursor-pointer !text-blue-500"}
                    href={"/forum/posts/" + post._id + "/edit"}>
                <PencilSquareIcon className={"fill-blue-500"}/>
                Modifier
            </Button>
            <Button color={"light"} className={"cursor-pointer !text-red-500"} onClick={() => {
                setDeleteAlertOpen(true)
            }}>
                <TrashIcon className={"fill-red-500"}/>
                Supprimer
            </Button>
            <Alert open={deleteAlertOpen} onClose={setDeleteAlertOpen}>
                <AlertTitle>Confirmez la suppression</AlertTitle>
                <AlertDescription>Êtes-vous certain de vouloir supprimer le post ?</AlertDescription>
                <AlertActions>
                    <Button autoFocus={true} plain={true} onClick={() => {
                        setDeleteAlertOpen(false)
                    }}>
                        Annuler
                    </Button>
                    <Button color={"red"} onClick={onDeletePost} className={"cursor-pointer"}>
                        Confirmer
                    </Button>
                </AlertActions>
            </Alert>
        </div>
    );

    return (
        <main>
            {
                !isPostLoading &&
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
                                    <Text className={"break-words"} key={i}>
                                        {line}
                                    </Text>
                                ))
                            }
                        </div>
                    </div>

                    <Divider className={"my-4"}/>
                    <WritePostCommentWidget className={"my-4"} post={null}/>

                    {
                        post.comments?.length > 0 && (
                            <div>
                                <Heading className={"mb-4"}>Commentaires</Heading>
                                <PostCommentList>
                                    {
                                        post.comments
                                            .filter(comment => comment._id)
                                            .map((comment) => {
                                                return (
                                                    <PostCommentCard key={comment._id} commentId={comment._id}/>
                                                )
                                            })
                                    }
                                </PostCommentList>
                            </div>
                        )
                    }
                </>
            }
        </main>
    );
}

export default Post;