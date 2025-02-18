import React from 'react';
import {ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend} from "../catalyst-ui/fieldset.jsx";
import {Input} from "../catalyst-ui/input.jsx";
import {Button} from "../catalyst-ui/button.jsx";
import {Text} from "../catalyst-ui/text.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "../../validation/User.js";

function LoginForm() {

    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    function onSubmit(data) {
        
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
                        <Input name={"email"} type={"email"} {...register("email")} />
                        <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Mot de passe</Label>
                        <Input name={"password"} type={"password"} {...register("password")} />
                        <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    </Field>
                    <Divider/>
                    <Button className={"w-full"} type={"submit"}>Connexion</Button>
                </FieldGroup>
            </Fieldset>
        </form>
    );
}

export default LoginForm;