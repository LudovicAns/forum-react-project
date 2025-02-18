import React from 'react';
import {Heading} from "../catalyst-ui/heading.jsx";
import {Text} from "../catalyst-ui/text.jsx";

function ProfileEdit() {
    document.title = "Forum - Edition du profil";
    return (
        <main>
            <Heading>Edition du profil</Heading>
            <Text>Modifier les champs que vous souhaitez mettre à jour puis enregistrez vos modifications.</Text>
        </main>
    );
}

export default ProfileEdit;