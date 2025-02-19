import React, {useContext} from 'react';
import {Divider} from "../catalyst-ui/divider.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import clsx from "clsx";
import {Button} from "../catalyst-ui/button.jsx";
import {Description, ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend} from "../catalyst-ui/fieldset.jsx";
import {Text} from "../catalyst-ui/text.jsx";
import {Textarea} from "../catalyst-ui/textarea.jsx";
import {UserContext} from "../../context/UserContextProvider.jsx";
import {Input} from "../catalyst-ui/input.jsx";
import {Badge} from "../catalyst-ui/badge.jsx";
import {editProfileSchema} from "../../validation/User.js";

function ProfileEditForm({className}) {
    const userContext = useContext(UserContext);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: zodResolver(editProfileSchema)
    });

    function onSubmit(data) {

    }

    return (
        <form className={clsx(className)} onSubmit={handleSubmit(onSubmit)}>
            <Fieldset>
                <Legend>Informations public</Legend>
                <Text>Modifiez ici les informations visibles par les autres utilisateurs.</Text>
                <FieldGroup>
                    <Field>
                        <Label>Avatar</Label>
                        <Description>Choisissez un avatar pour votre profil.</Description>
                        <Input name={"avatar"}
                               invalid={!!errors.avatar}
                               {...register("avatar")}
                               type={"file"}
                               accept={"image/png, image/jpeg"}/>
                        <ErrorMessage>{errors.avatar?.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Description</Label>
                        <Description>Décrivez-vous à votre façon 😀</Description>
                        <Textarea name={"description"}
                                  invalid={!!errors.description}
                                  {...register("description")}
                                  placeholder={"Je m'appelle John, développeur passionné depuis mon plus jeune âge !"}
                                  defaultValue={userContext.user.description}/>
                    </Field>
                </FieldGroup>
            </Fieldset>

            <Divider className={"my-4"}/>

            <Fieldset>
                <Legend>Informations privées <Badge color={"yellow"}>Bientôt disponible</Badge></Legend>
                <Text>Modifiez ici vos informations personnelles.</Text>
                <FieldGroup>

                </FieldGroup>
            </Fieldset>

            <Divider className={"my-4"}/>
            <Button className={"w-full"} type={"submit"}>Enregistrer</Button>
        </form>
    );
}

export default ProfileEditForm;