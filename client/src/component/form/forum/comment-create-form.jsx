import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend} from "../../catalyst-ui/fieldset.jsx";
import {Text, TextLink} from "../../catalyst-ui/text.jsx";
import {Textarea} from "../../catalyst-ui/textarea.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";
import clsx from "clsx";
import axios from "axios";
import {Badge} from "../../catalyst-ui/badge.jsx";
import {UserContext} from "../../../context/user-context.jsx";
import {PostContext} from "../../../context/post-context-provider.jsx";
import {createSchemaValidation} from "../../../validation/comment-validation.js";

function CommentCreateForm({post = null}) {

    const userContext = useContext(UserContext);
    const postContext = useContext(PostContext);

    if (!post) {
        post = postContext?.post;
    }

    const isOwner = userContext.user.id === post.author.id;

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        reset
    } = useForm({
        resolver: zodResolver(createSchemaValidation)
    });

    function onSubmit(data) {
        axios.post(`${import.meta.env.VITE_BACKEND_HOST}api/comments/`, {
            ...data,
            author: userContext.user.id,
            post: post._id
        }, {
            withCredentials: true
        })
            .then((res) => {
                if (postContext) {
                    postContext.refreshPost();
                }
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                reset();
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
                <Legend>Ajouter un commentaire</Legend>
                {
                    isOwner ?
                        <Text>Qu'avez vous à dire au sujet de votre post ?</Text>
                        :
                        <Text>Qu'avez vous à dire au sujet du post de <TextLink href={`/profile/${post.author.id}`}>@{post.author.username}</TextLink> ?</Text>
                }
                <FieldGroup>
                    <Field>
                        <Textarea rows={6} name="content" invalid={!!errors.content} {...register('content')} />
                        <ErrorMessage>{errors.content?.message}</ErrorMessage>
                    </Field>
                </FieldGroup>
            </Fieldset>
            <Divider className={"my-4"}/>
            <Button type={"submit"} disabled={isLoading} className={clsx("w-full", isLoading ? "cursor-wait" : "cursor-pointer")}>Envoyer</Button>
        </form>
    );
}

export default CommentCreateForm;