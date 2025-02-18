import React, {useContext} from 'react';
import {Avatar} from "../catalyst-ui/avatar.jsx";
import avatar from "../../assets/avatar.png";
import {DescriptionDetails, DescriptionList, DescriptionTerm} from "../catalyst-ui/description-list.jsx";
import {Badge} from "../catalyst-ui/badge.jsx";
import {UserContext} from "../../context/UserContextProvider.jsx";
import clsx from "clsx";

function ProfilWidget({className}) {
    const userContext = useContext(UserContext);

    return (
        <div
            className={clsx(className, "flex flex-row max-md:flex-col gap-16 border p-8 rounded-lg border-zinc-950/10 dark:border-white/10")}>
            <div className={"w-fit max-md:w-full flex justify-center"}>
                <Avatar src={avatar} alt={"avatar"} className={"size-48"}/>
            </div>
            <div className={"w-full"}>
                <DescriptionList className={"w-full"}>
                    <DescriptionTerm>Nom d'utilisateur</DescriptionTerm>
                    <DescriptionDetails>{userContext.user.username}</DescriptionDetails>

                    <DescriptionTerm>Email</DescriptionTerm>
                    <DescriptionDetails>{userContext.user.email}</DescriptionDetails>

                    <DescriptionTerm>Rôle</DescriptionTerm>
                    <DescriptionDetails>
                        <Badge
                            color={"blue"}>{userContext.user.role ? userContext.user.role : "Bientôt disponible"}</Badge>
                    </DescriptionDetails>
                </DescriptionList>
                <div className={"h-full"}>

                </div>
            </div>
        </div>
    );
}

export default ProfilWidget;