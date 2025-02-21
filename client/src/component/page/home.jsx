import React from 'react';
import {Heading} from "../catalyst-ui/heading.jsx";

function Home(props) {
    document.title = "Posts - Accueil";
    return (
        <main>
            <Heading>Home</Heading>
        </main>
    );
}

export default Home;