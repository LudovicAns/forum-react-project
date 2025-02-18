import React from 'react';
import RegisterForm from "../form/RegisterForm.jsx";

function Register(props) {
    document.title = "Forum - Inscription";
    return (
        <main>
            <RegisterForm/>
        </main>
    );
}

export default Register;