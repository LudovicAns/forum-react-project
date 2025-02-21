import React from 'react';
import UserRegisterForm from "../../form/user-register-form.jsx";

function UserRegister(props) {
    document.title = "Posts - Inscription";
    return (
        <main>
            <UserRegisterForm/>
        </main>
    );
}

export default UserRegister;