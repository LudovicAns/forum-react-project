import React from 'react';
import {Heading} from "../../catalyst-ui/heading.jsx";
import {Text} from "../../catalyst-ui/text.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";
import UserEditForm from "../../form/user-edit-form.jsx";

function UserEdit() {
    document.title = "Posts - Edition du profil";

    return (
        <main>
            <Heading>Edition du profil</Heading>
            <Text>Modifier les champs que vous souhaitez mettre à jour puis enregistrez vos modifications.</Text>
            <Divider className={"my-4"}/>
            <UserEditForm/>
        </main>
    );
}

export default UserEdit;