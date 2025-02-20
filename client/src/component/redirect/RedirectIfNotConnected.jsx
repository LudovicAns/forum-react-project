import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContextProvider.jsx";
import {Navigate} from "react-router";
import {Heading} from "../catalyst-ui/heading.jsx";
import {Text} from "../catalyst-ui/text.jsx";
import {Button} from "../catalyst-ui/button.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import {ArrowUturnLeftIcon} from "@heroicons/react/16/solid/index.js";

function RedirectIfNotConnected({children, stayOnPage = false}) {
    const userContext = useContext(UserContext);

    if (userContext.loading) return <></>;

    if (!userContext.user && !stayOnPage) return <Navigate to={"/login"}/>

    if (!userContext.user && stayOnPage) return (
        <div className={"flex flex-col w-full gap-2 justify-center items-center mt-12 text-center"}>
            <div className={"w-fit"}>
                <Heading>Vous devez être connecté pour accéder à cette page.</Heading>
                <Text>Cliquez sur le bouton ci-dessous pour vous rendre sur la page de connexion.</Text>
                <Divider className={"my-4"}/>
                <Button href={"/login"}><ArrowUturnLeftIcon/>Se connecter</Button>
            </div>
        </div>
    )

    return children;
}

export default RedirectIfNotConnected;