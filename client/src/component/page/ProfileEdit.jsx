import React from 'react';
import {Heading} from "../catalyst-ui/heading.jsx";
import {Text} from "../catalyst-ui/text.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import ProfileEditForm from "../form/ProfileEditForm.jsx";

function ProfileEdit() {
    document.title = "Forum - Edition du profil";

    return (
        <main>
            <Heading>Edition du profil</Heading>
            <Text>Modifier les champs que vous souhaitez mettre à jour puis enregistrez vos modifications.</Text>
            <Divider className={"my-4"}/>
            <ProfileEditForm/>
        </main>
    );
}

export default ProfileEdit;