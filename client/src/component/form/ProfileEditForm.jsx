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
import axios from "axios";
import {useNavigate} from "react-router";

function ProfileEditForm({className}) {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        resolver: zodResolver(editProfileSchema)
    });

    function onSubmit(data) {
        const form = new FormData();
        if (data.avatar.length > 0) {
            form.append("avatar", data.avatar[0]);
        }
        form.append("description", data.description);
        axios.post("http://localhost:3000/api/users/edit", form, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
            .then(res => {
                userContext.setUser(res.data.data);
                navigate("/profile");
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                reset();
            })
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
                               multiple={false}
                               className={"max-w-md"}
                               accept={"image/png, image/jpeg"}/>
                        <ErrorMessage>{errors.avatar?.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Description</Label>
                        <Description>Décrivez-vous à votre façon 😀</Description>
                        <Textarea name={"description"}
                                  invalid={!!errors.description}
                                  {...register("description")}
                                  rows={5}
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