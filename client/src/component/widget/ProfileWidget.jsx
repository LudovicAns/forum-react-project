import React from 'react';
import {Avatar} from "../catalyst-ui/avatar.jsx";
import {DescriptionDetails, DescriptionList, DescriptionTerm} from "../catalyst-ui/description-list.jsx";
import {Badge} from "../catalyst-ui/badge.jsx";
import clsx from "clsx";
import {Heading, Subheading} from "../catalyst-ui/heading.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import {Text} from "../catalyst-ui/text.jsx";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid/index.js";

function ProfileWidget({className, user}) {
    const avatarUrl = user?.avatar ? import.meta.env.VITE_BACKEND_HOST + user.avatar : "";

    if (!user) return (
        <div className={"flex flex-col gap-4 border p-8 rounded-lg border-zinc-950/10 dark:border-white/10"}>
            <Heading className={"relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm"}>
                <ExclamationCircleIcon className={"size-[20px] inline"} />Erreur de chargement
            </Heading>
            <Divider/>
            <Text>Impossible de charger les information de l'utilisateur.</Text>
        </div>
    );

    return (
        <div className={clsx(className, "flex flex-col gap-8 border p-8 rounded-lg border-zinc-950/10 dark:border-white/10")}>
            <div
                className={clsx(className, "flex flex-row max-md:flex-col gap-16")}>
                <div className={"w-fit max-md:w-full flex justify-center"}>
                    <Avatar src={avatarUrl}
                            initials={user.username[0]}
                            alt={"avatar"}
                            className={"size-48 bg-zinc-900 text-white dark:bg-white dark:text-black"}/>
                </div>
                <div className={"w-full"}>
                    <DescriptionList className={"w-full"}>
                        <DescriptionTerm>Nom d'utilisateur</DescriptionTerm>
                        <DescriptionDetails>{user.username}</DescriptionDetails>

                        <DescriptionTerm>Email</DescriptionTerm>
                        <DescriptionDetails>{user.email}</DescriptionDetails>

                        <DescriptionTerm>Rôle</DescriptionTerm>
                        <DescriptionDetails>
                            <Badge
                                color={"yellow"}>{user.role ? user.role : "Bientôt disponible"}</Badge>
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
                    !user.description || user.description === "" ?
                        <Text>Aucune description</Text>
                        :
                        <Text>{user.description}</Text>
                }
            </div>
        </div>
    );
}

export default ProfileWidget;