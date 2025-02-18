import React, {useContext} from 'react';
import {Heading} from "../catalyst-ui/heading.jsx";
import {Text} from "../catalyst-ui/text.jsx";
import {UserContext} from "../../context/UserContextProvider.jsx";
import ProfilWidget from "../widget/ProfilWidget.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import {Button} from "../catalyst-ui/button.jsx";

function Profile() {

    const userContext = useContext(UserContext);

    return (
        <main className={"flex flex-col gap-4"}>
            <section>
                <Heading>Profile</Heading>
                <Text>Votre page de profil vous permet de consulter les informations visible par les autres
                    utilisateurs.</Text>
                <ProfilWidget className={"mt-4"}/>
            </section>
            <section>
                <Heading>Modification</Heading>
                <Text className={"mb-4"}>Vous pouvez modifier votre profil en cliquant sur le bouton ci-dessous.</Text>
                <Button href={"/profile/edit"}>Modifier</Button>
            </section>
        </main>
    )
}

export default Profile;