import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Field, FieldGroup, Fieldset, Label, Legend} from "../../catalyst-ui/fieldset.jsx";
import {Text, TextLink} from "../../catalyst-ui/text.jsx";
import {Textarea} from "../../catalyst-ui/textarea.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";
import clsx from "clsx";
import axios from "axios";
import {Badge} from "../../catalyst-ui/badge.jsx";

function CreateCommentForm({post = null}) {

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        reset
    } = useForm({
        resolver: zodResolver(undefined)
    });

    function onSubmit(data) {
        axios.post(`${import.meta.env.VITE_BACKEND_HOST}/comments`, data, {
            withCredentials: true
        })
            .then((res) => {

            })
            .catch((err) => {

            })
            .finally(() => {
                reset();
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
                <Legend>Ajouter un commentaire <Badge color={"yellow"}>Bientôt disponible</Badge></Legend>
                <Text>Qu'avez vous à dire au sujet du post de <TextLink href={`/profile/${post.author.id}`}>@{post.author.username}</TextLink> ?</Text>
                <FieldGroup>
                    <Field disabled={true}>
                        <Textarea rows={6} name="content" />
                    </Field>
                </FieldGroup>
                <Divider className={"my-4"}/>
                <Button className={clsx("w-full", isLoading ? "cursor-wait" : "cursor-pointer")} type="submit" disabled={true}>Envoyer</Button>
            </Fieldset>
        </form>
    );
}

export default CreateCommentForm;