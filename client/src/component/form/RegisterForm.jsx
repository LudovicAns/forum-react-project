import React from 'react';
import {Field, FieldGroup, Fieldset, Label, Legend} from "../catalyst-ui/fieldset.jsx";
import {Input} from "../catalyst-ui/input.jsx";
import {Button} from "../catalyst-ui/button.jsx";
import {Text} from "../catalyst-ui/text.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "../../validation/User.js";
import axios from "axios";

function RegisterForm(props) {

    const [requestInfo, setRequestInfo] = React.useState({init: false, success: undefined, message: ""});

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    function onSubmit(data) {
        axios.post("http://localhost:3000/api/auth/register", data)
            .then(res => {
                setRequestInfo({
                    init: true,
                    success: true,
                    message: res.data.message
                })
                reset();
            })
            .catch(err => {
                if (err) {
                    setRequestInfo({
                        init: true,
                        success: false,
                        message: err.response.data.message
                    })
                }
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
              className={"w-md max-sm:w-full border border-zinc-950/10 dark:border-white/10 rounded-md p-8"}>
            <Fieldset>
                <Legend>Inscription</Legend>
                <Text>Vous pouvez vous inscrire en complétant ce formulaire.</Text>
                <FieldGroup>
                    <Field>
                        <Label>Nom d'utilisateur</Label>
                        <Input name={"username"} type={"text"} {...register("username")}/>
                    </Field>
                    <Field>
                        <Label>Adresse email</Label>
                        <Input name={"email"} type={"email"} {...register("email")}/>
                    </Field>
                    <Field>
                        <Label>Mot de passe</Label>
                        <Input name={"password"} type={"password"} {...register("password")}/>
                    </Field>
                    <Field>
                        <Label>Confirmation du mot de passe</Label>
                        <Input name={"passwordConfirmation"} type={"password"} {...register("confirmPassword")}/>
                    </Field>
                    <Divider/>
                    <Button className={"w-full"} type={"submit"}>S'inscrire</Button>
                    {(requestInfo.init && !requestInfo.success) && <Text className={"text-center !text-red-600 !dark:text-red-500"}>{requestInfo.message}</Text>}
                    {(requestInfo.init && requestInfo.success) && <Text className={"text-center"}>{requestInfo.message}</Text>}
                </FieldGroup>
            </Fieldset>
        </form>
    );
}

export default RegisterForm;