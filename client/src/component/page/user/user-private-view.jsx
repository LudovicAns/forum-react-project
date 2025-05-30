import React, {useContext} from 'react';
import {Heading, Subheading} from "../../catalyst-ui/heading.jsx";
import {Strong, Text} from "../../catalyst-ui/text.jsx";
import {UserContext} from "../../../context/user-context.jsx";
import UserWidget from "../../widget/user-widget.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import {Badge} from "../../catalyst-ui/badge.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";

function UserPrivateView() {

    const userContext = useContext(UserContext);

    document.title = "Posts - Profil";

    return (
        <main className={"flex flex-col gap-4"}>
            <section>
                <Heading>Profile</Heading>
                <Text>Votre page de profil vous permet de consulter les informations visible par les autres
                    utilisateurs.</Text>
                <UserWidget className={"mt-4"} user={userContext.user}/>

                <Subheading className={"mt-4"}>Modification</Subheading>
                <Text className={"mb-4"}>Vous pouvez modifier votre profil en cliquant sur le bouton ci-dessous.</Text>
                <Button href={"/profile/edit"}>Modifier</Button>
            </section>
            <Divider/>
            <section>
                <Heading>
                    Statistiques <Badge color={"yellow"}>Bientôt disponible</Badge>
                </Heading>
                <Text className={"mb-4"}>Les statistiques de votre profil permettent de visualiser rapidement votre
                    présence sur <Strong>Forum</Strong>.</Text>
            </section>
        </main>
    )
}

export default UserPrivateView;