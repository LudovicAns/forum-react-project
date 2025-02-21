import React from 'react';
import {Description, ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend} from "../../catalyst-ui/fieldset.jsx";
import {Text} from "../../catalyst-ui/text.jsx";
import {Input} from "../../catalyst-ui/input.jsx";
import {Textarea} from "../../catalyst-ui/textarea.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createSchemaValidation} from "../../../validation/post-validation.js";
import clsx from "clsx";
import axios from "axios";
import {UserContext} from "../../../context/user-context.jsx";
import {useNavigate} from "react-router";

function PostCreateForm(props) {

    const userContext = React.useContext(UserContext);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isLoading},
        reset,
    } = useForm({
        resolver: zodResolver(createSchemaValidation)
    });

    function onSubmit(data) {
        axios.post(`${import.meta.env.VITE_BACKEND_HOST}api/posts/`, {
            ...data,
            author: userContext.user.id
        }, {withCredentials: true})
            .then(res => {
                navigate("/forum/posts");
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                reset();
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
                <Legend>Création d'un nouveau post</Legend>
                <Text>Complétez les champs afin de publier votre post.</Text>
                <FieldGroup>
                    <Field>
                        <Label>Titre</Label>
                        <Description>Le titre de votre post. Il doit être claire et efficace.</Description>
                        <Input invalid={!!errors.title} {...register('title')} type="text"/>
                        <ErrorMessage>{errors.title?.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Contenu</Label>
                        <Description>Un bon post doit être correctement structuré pour ne pas décourager le lecteur.</Description>
                        <Textarea rows={20} invalid={!!errors.content} {...register('content')}/>
                        <ErrorMessage>{errors.content?.message}</ErrorMessage>
                    </Field>
                </FieldGroup>
                <Divider className={"my-4"}/>
                <Button type={"submit"} disabled={isLoading} className={clsx("w-full", isLoading ? "cursor-wait" : "cursor-pointer")}>Publier</Button>
            </Fieldset>
        </form>
    );
}

export default PostCreateForm;