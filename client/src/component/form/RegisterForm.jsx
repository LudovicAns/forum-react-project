import React from 'react';
import {Field, FieldGroup, Fieldset, Label, Legend} from "../catalyst-ui/fieldset.jsx";
import {Input} from "../catalyst-ui/input.jsx";
import {Button} from "../catalyst-ui/button.jsx";
import {Text} from "../catalyst-ui/text.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";

function RegisterForm(props) {
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className={"w-md max-sm:w-full border border-zinc-950/10 dark:border-white/10 rounded-md p-8"}>
            <Fieldset>
                <Legend>Inscription</Legend>
                <Text>Vous pouvez vous inscrire en complétant ce formulaire.</Text>
                <FieldGroup>
                    <Field>
                        <Label>Nom d'utilisateur</Label>
                        <Input name={"username"} type={"text"}/>
                    </Field>
                    <Field>
                        <Label>Adresse email</Label>
                        <Input name={"email"} type={"email"}/>
                    </Field>
                    <Field>
                        <Label>Mot de passe</Label>
                        <Input name={"password"} type={"password"}/>
                    </Field>
                    <Field>
                        <Label>Confirmation du mot de passe</Label>
                        <Input name={"passwordConfirmation"} type={"password"}/>
                    </Field>
                    <Divider/>
                    <Button className={"w-full"}>S'inscrire</Button>
                </FieldGroup>
            </Fieldset>
        </form>
    );
}

export default RegisterForm;