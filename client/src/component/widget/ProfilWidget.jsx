import React, {useContext} from 'react';
import {Avatar} from "../catalyst-ui/avatar.jsx";
import {DescriptionDetails, DescriptionList, DescriptionTerm} from "../catalyst-ui/description-list.jsx";
import {Badge} from "../catalyst-ui/badge.jsx";
import {UserContext} from "../../context/UserContextProvider.jsx";
import clsx from "clsx";
import {Subheading} from "../catalyst-ui/heading.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import {Text} from "../catalyst-ui/text.jsx";

function ProfilWidget({className}) {
    const userContext = useContext(UserContext);

    return (
        <div className={clsx(className, "flex flex-col gap-8 border p-8 rounded-lg border-zinc-950/10 dark:border-white/10")}>
            <div
                className={clsx(className, "flex flex-row max-md:flex-col gap-16")}>
                <div className={"w-fit max-md:w-full flex justify-center"}>
                    <Avatar src={userContext.user.avatar}
                            initials={userContext.user.username[0]}
                            alt={"avatar"}
                            className={"size-48 bg-zinc-900 text-white dark:bg-white dark:text-black"}/>
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
                                color={"yellow"}>{userContext.user.role ? userContext.user.role : "Bientôt disponible"}</Badge>
                        </DescriptionDetails>
                    </DescriptionList>
                    <div className={"h-full"}>

                    </div>
                </div>
            </div>
            <Divider/>
            <div>
                <Subheading>Description</Subheading>
                {
                    !userContext.user.description || userContext.user.description === "" ?
                        <Text>Aucune description</Text>
                        :
                        <Text>{userContext.user.description}</Text>
                }
                <Text>{userContext.user.description}</Text>
            </div>
        </div>
    );
}

export default ProfilWidget;