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
import {Alert, AlertActions, AlertDescription, AlertTitle} from "../../../catalyst-ui/alert.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ErrorMessage, Field, FieldGroup, Fieldset} from "../../../catalyst-ui/fieldset.jsx";
import {Textarea} from "../../../catalyst-ui/textarea.jsx";
import {updateSchemaValidation} from "../../../../validation/comment-validation.js";
import clsx from "clsx";

function PostCommentCard({commentId}) {

    const userContext = useContext(UserContext);
    const postContext = useContext(PostContext);

    if (!commentId) return (<></>);

    const [comment, setComment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

    const [updateCommentFormOpen, setUpdateCommentFormOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors, isLoading: isUpdateCommentLoading},
        reset
    } = useForm({
        resolver: zodResolver(updateSchemaValidation)
    });

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

    function deleteAlertComp() {

        function onDeleteComment() {
            axios.delete(`${import.meta.env.VITE_BACKEND_HOST}api/comments/${commentId}`, {
                withCredentials: true
            })
                .then(response => {
                    if (postContext) {
                        postContext.refreshPost();
                    }
                })
                .catch(error => {
                    console.error(error);
                })
                .finally(() => {
                    setDeleteAlertOpen(false);
                })
        }

        return (
            <Alert open={deleteAlertOpen} onClose={setDeleteAlertOpen}>
                <AlertTitle>Confirmez la suppression</AlertTitle>
                <AlertDescription>Êtes-vous certain de vouloir supprimer le commentaire ?</AlertDescription>
                <AlertActions>
                    <Button autoFocus={true} plain={true} onClick={() => {
                        setDeleteAlertOpen(false)
                    }}>
                        Annuler
                    </Button>
                    <Button color={"red"} onClick={onDeleteComment} className={"cursor-pointer"}>
                        Confirmer
                    </Button>
                </AlertActions>
            </Alert>
        )
    }

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
                                        Votre commentaire
                                    </DropdownHeading>
                                    <DropdownItem onClick={() => setUpdateCommentFormOpen(true)} className={"cursor-pointer"}>
                                        <PencilSquareIcon/>
                                        <DropdownLabel>Modifier</DropdownLabel>
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={() => setDeleteAlertOpen(true)}
                                        className="cursor-pointer group"
                                    >
                                        <TrashIcon className="fill-red-500 group-hover:fill-white" />
                                        <DropdownLabel className="text-red-500 group-hover:text-white">Supprimer</DropdownLabel>
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
                        <DropdownItem disabled={true}>
                            <ExclamationCircleIcon />
                            Signaler
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>

            </Dropdown>
        );
    }

    function updateCommentForm() {
        function onSubmit(data) {
            axios.put(`${import.meta.env.VITE_BACKEND_HOST}api/comments/${commentId}`, data, {
                withCredentials: true
            })
                .then(res => {
                    postContext.refreshPost();
                    reset();
                })
                .catch(err => {
                    console.error(err);
                });
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset>
                    <FieldGroup>
                        <Field>
                            <Textarea
                                rows={6}
                                name="content"
                                invalid={!!errors.content}
                                {...register('content')}
                                className={"w-full"}
                                defaultValue={comment.content}
                                placeholder={"Votre commentaire ..."}
                                resizable={false}
                            />
                            <ErrorMessage>{errors.content?.message}</ErrorMessage>
                        </Field>
                    </FieldGroup>
                </Fieldset>
                <div className={"flex flex-row justify-end gap-2"}>
                    <Button type={"button"} onClick={() => setUpdateCommentFormOpen(false)} className={"w-fit cursor-pointer"} plain={true}>Annuler</Button>
                    <Button type={"submit"} disabled={isUpdateCommentLoading} className={"w-fit cursor-pointer"}>Modifier</Button>
                </div>
            </form>
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
                {
                    updateCommentFormOpen ?
                        updateCommentForm()
                        :
                        <>
                            {
                                comment.content.split("\n").map((line, index) => (
                                    <Text key={index}>
                                        {line}
                                    </Text>
                                ))
                            }
                        </>
                }
            </div>
        );
    }

    return (
        <div className={`flex flex-col border border-zinc-950/10 dark:border-white/10 rounded-md p-8`}>
            {deleteAlertComp()}
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