import React, {useContext} from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Fieldset, Legend} from "@headlessui/react";
import {Text} from "../../catalyst-ui/text.jsx";
import {Description, ErrorMessage, Field, FieldGroup, Label} from "../../catalyst-ui/fieldset.jsx";
import {Input} from "../../catalyst-ui/input.jsx";
import {Textarea} from "../../catalyst-ui/textarea.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import clsx from "clsx";
import {PostContext} from "../../../context/post-context.jsx";
import {useNavigate} from "react-router";
import {updateSchemaValidation} from "../../../validation/post-validation.js";

function PostEditForm() {

    const {
        post,
        isLoading: isLoadingPost,
        updatePost
    } = useContext(PostContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        reset
    } = useForm({
        resolver: zodResolver(updateSchemaValidation),
    });

    const navigate = useNavigate();

    function onSubmit(data) {
        updatePost(data, (res) => {
            navigate(`/forum/posts/${post._id}`);
        },(error) => {

        }, () => {
            reset();
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
                <Legend>Modification du post</Legend>
                <Text>Complétez les champs afin de publier votre post.</Text>
                <FieldGroup>
                    <Field>
                        <Label>Titre</Label>
                        <Description>Le titre de votre post. Il doit être claire et efficace.</Description>
                        <Input invalid={!!errors.title} {...register('title')} defaultValue={post.title} type="text"/>
                        <ErrorMessage>{errors.title?.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Contenu</Label>
                        <Description>Un bon post doit être correctement structuré pour ne pas décourager le lecteur.</Description>
                        <Textarea rows={20} invalid={!!errors.content} {...register('content')} defaultValue={post.content} />
                        <ErrorMessage>{errors.content?.message}</ErrorMessage>
                    </Field>
                </FieldGroup>
                <Divider className={"my-4"}/>
                <Button type={"submit"} disabled={isLoading} className={clsx("w-full", isLoading ? "cursor-wait" : "cursor-pointer")}>Enregistrer</Button>
            </Fieldset>
        </form>
    );
}

export default PostEditForm;