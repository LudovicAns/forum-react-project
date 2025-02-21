import React from 'react';
import {Heading} from "../../catalyst-ui/heading.jsx";
import {Text} from "../../catalyst-ui/text.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import {ArrowUturnLeftIcon} from "@heroicons/react/16/solid/index.js";

function Error404(props) {
    document.title = "Forum - Erreur 404";

    return (
        <main className={"w-full flex justify-center mt-12 0 text-center"}>
            <div className={"flex flex-col gap-2"}>
                <Heading>404</Heading>
                <Text>Oups! La page est introuvable.</Text>
                <Button href={"/"} className={"mt-2"}>
                    <ArrowUturnLeftIcon/> Revenir à l'accueil
                </Button>
            </div>
        </main>
    );
}

export default Error404;