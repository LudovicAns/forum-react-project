import React, {useContext, useState} from 'react';
import {ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend} from "../catalyst-ui/fieldset.jsx";
import {Input} from "../catalyst-ui/input.jsx";
import {Button} from "../catalyst-ui/button.jsx";
import {Text, TextLink} from "../catalyst-ui/text.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "../../validation/user-validation.js";
import {UserContext} from "../../context/user-context.jsx";
import {Checkbox, CheckboxField} from "../catalyst-ui/checkbox.jsx";
import {Badge} from "../catalyst-ui/badge.jsx";

function UserLoginForm() {

    const userContext = useContext(UserContext);

    const [responseMessage, setResponseMessage] = useState(null);

    const {
        register,
        formState: {errors, isLoading},
        handleSubmit,
        reset
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    function onSubmit(data) {
        function onSuccess(res) {
            setResponseMessage(res.data.data.message);
            reset();
        }

        function onError(err) {
            setResponseMessage(err.response.data.message);
        }

        userContext.login(data, onSuccess, onError);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className={"w-md max-sm:w-full border border-zinc-950/10 dark:border-white/10 rounded-md p-8"}>
            <Fieldset>
                <Legend>Connexion</Legend>
                <Text>Vous pouvez vous connecter en complétant ce formulaire.</Text>
                <FieldGroup>
                    <Field>
                        <Label>Email</Label>
                        <Input invalid={!!errors.email} name={"email"} type={"email"} {...register("email")} />
                        <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Mot de passe</Label>
                        <Input invalid={!!errors.password} name={"password"} type={"password"} {...register("password")} />
                        <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    </Field>
                    <CheckboxField>
                        <Checkbox name={"rememberMe"} {...register("rememberMe")}/>
                        <Label>Se souvenir de moi <Badge color={"yellow"}>Bientôt disponible</Badge></Label>
                    </CheckboxField>
                    <Divider/>
                    <Button className={"w-full"} type={"submit"}>Connexion</Button>
                    {
                        responseMessage &&
                        <Text className={"text-center !text-red-600 !dark:text-red-500"}>{responseMessage}</Text>
                    }
                </FieldGroup>
            </Fieldset>
            <Text className={"mt-4 text-center"}>Vous n'avez pas encore de compte ? <TextLink href={"/register"}>Cliquez ici</TextLink></Text>
        </form>
    );
}

export default UserLoginForm;