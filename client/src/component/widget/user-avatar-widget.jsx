import React from 'react';
import {Avatar} from "../catalyst-ui/avatar.jsx";
import {Text, TextLink} from "../catalyst-ui/text.jsx";
import clsx from "clsx";

function UserAvatarWidget({user, responsiveName = true}) {

    if (!user) return <Text>Inavlid User</Text>;

    const avatarUrl = user.avatar ? `${import.meta.env.VITE_BACKEND_HOST}${user.avatar}` : null;

    return (
        <TextLink href={`/profile/${user.id}`} className={"flex flex-row gap-2 !no-underline"}>
            <Avatar className={"size-[24px] dark:bg-white dark:text-black bg-black text-white"} src={avatarUrl} initials={user.username[0]}/>
            <Text className={clsx("text-zinc-950 dark:!text-white", responsiveName && "max-md:hidden")}>{user.username}</Text>
        </TextLink>
    );
}

export default UserAvatarWidget;