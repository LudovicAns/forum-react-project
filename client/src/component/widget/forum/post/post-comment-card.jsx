import React, {useContext, useEffect, useState} from 'react';
import {Text} from "../../../catalyst-ui/text.jsx";
import UserAvatarWidget from "../../user-avatar-widget.jsx";
import axios from "axios";
import {Divider} from "../../../catalyst-ui/divider.jsx";
import {UserContext} from "../../../../context/user-context.jsx";
import {Button} from "../../../catalyst-ui/button.jsx";
import {
    EllipsisVerticalIcon,
    ExclamationCircleIcon,
    PencilSquareIcon,
    TrashIcon
} from "@heroicons/react/20/solid/index.js";
import {
    Dropdown,
    DropdownButton,
    DropdownDescription, DropdownDivider, DropdownHeading, DropdownItem, DropdownLabel,
    DropdownMenu,
    DropdownSection
} from "../../../catalyst-ui/dropdown.jsx";
import {PostContext} from "../../../../context/post-context-provider.jsx";
import {Badge} from "../../../catalyst-ui/badge.jsx";

function PostCommentCard({commentId}) {

    const userContext = useContext(UserContext);
    const postContext = useContext(PostContext);

    if (!commentId) return (<></>);

    const [comment, setComment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_HOST}api/comments/${commentId}`, {
            withCredentials: true
        })
            .then(response => {
                setComment(response.data.data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const isOwner = userContext.user.id === comment?.author.id;

    function dropDownMenu() {
        return (
            <Dropdown>
                <DropdownButton as={Button} plain={true}>
                    <EllipsisVerticalIcon/>
                </DropdownButton>

                <DropdownMenu>
                    {
                        isOwner && (
                            <>
                                <DropdownSection>
                                    <DropdownHeading>
                                        Votre commentaire <Badge color={"yellow"}>Bientôt disponible</Badge>
                                    </DropdownHeading>
                                    <DropdownItem className={"cursor-pointer"}>
                                        <PencilSquareIcon/>
                                        <DropdownLabel>Modifier</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownItem className={"cursor-pointer"}>
                                        <TrashIcon/>
                                        <DropdownLabel>Supprimer</DropdownLabel>
                                    </DropdownItem>
                                </DropdownSection>

                                <DropdownDivider/>
                            </>
                        )
                    }

                    <DropdownSection>
                        <DropdownHeading>
                            Actions <Badge color={"yellow"}>Bientôt disponible</Badge>
                        </DropdownHeading>
                        <DropdownItem className={"cursor-pointer"}>
                            <ExclamationCircleIcon/>
                            Signaler
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>

            </Dropdown>
        );
    }

    function commentComp() {
        return (
            <div className={""}>
                <div className={"flex flex-row justify-between"}>
                    <UserAvatarWidget user={comment.author} responsiveName={false}/>
                    {dropDownMenu()}
                </div>
                <Divider className={"my-4"}/>
                <Text>{comment.content}</Text>
            </div>
        );
    }

    return (
        <div className={`flex flex-col border border-zinc-950/10 dark:border-white/10 rounded-md p-8`}>
            {
                isLoading ?
                    (<Text>Chargement ...</Text>)
                    :
                    (
                        <>
                            {error && (<Text>{error}</Text>)}
                            {comment && commentComp()}
                        </>
                    )
            }
        </div>
    );
}

export default PostCommentCard;