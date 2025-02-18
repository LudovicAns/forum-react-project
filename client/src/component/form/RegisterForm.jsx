import React, {useContext} from 'react';
import {ErrorMessage, Field, FieldGroup, Fieldset, Label, Legend} from "../catalyst-ui/fieldset.jsx";
import {Input} from "../catalyst-ui/input.jsx";
import {Button} from "../catalyst-ui/button.jsx";
import {Text} from "../catalyst-ui/text.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "../../validation/User.js";
import {UserContext} from "../../context/UserContextProvider.jsx";

function RegisterForm(props) {

    const userContext = useContext(UserContext);
    
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
        function onSuccess(res) {
            setRequestInfo({
                init: true,
                success: true,
                message: res.data.message
            })
            reset();
        }

        function onError(err) {
            if (err) {
                setRequestInfo({
                    init: true,
                    success: false,
                    message: err.response.data.message
                })
            }
        }

        userContext.register(data, onSuccess, onError);
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
                        <ErrorMessage>{errors.username?.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Adresse email</Label>
                        <Input name={"email"} type={"email"} {...register("email")}/>
                        <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Mot de passe</Label>
                        <Input name={"password"} type={"password"} {...register("password")}/>
                        <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    </Field>
                    <Field>
                        <Label>Confirmation du mot de passe</Label>
                        <Input name={"passwordConfirmation"} type={"password"} {...register("confirmPassword")}/>
                        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
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