import React, {useContext} from 'react';
import {Subheading} from "../../catalyst-ui/heading.jsx";
import {Text, TextLink} from "../../catalyst-ui/text.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import {Avatar} from "../../catalyst-ui/avatar.jsx";
import {BookOpenIcon, ChatBubbleOvalLeftEllipsisIcon} from "@heroicons/react/20/solid/index.js";
import {UserContext} from "../../../context/UserContextProvider.jsx";
import {Badge} from "../../catalyst-ui/badge.jsx";

function PostCard({post}) {

    const userContext = useContext(UserContext);

    const avatarUrl = post.author.avatar ? `${import.meta.env.VITE_BACKEND_HOST}${post.author.avatar}` : null;

    return (
        <div className={"flex flex-col gap-2 w-full h-fit border border-zinc-950/10 dark:border-white/10 rounded-md p-8"}>
            <div className={"flex flex-row gap-2 justify-between"}>
                <Subheading>
                    {post.author.id === userContext.user.id && <Badge color={"red"}>Propriétaire</Badge>} {post.title}
                </Subheading>
                <TextLink href={`/profile/${post.author.id}`} className={"flex flex-row gap-2 !no-underline"}>
                    <Avatar className={"size-[24px] dark:bg-white dark:text-black bg-black text-white"} src={avatarUrl} initials={post.author.username[0]}/>
                    <Text className={"max-md:hidden text-zinc-950 dark:!text-white"}>{post.author.username}</Text>
                </TextLink>
            </div>
            <div className={"h-12 max-h-12"}>
                <Text className={"h-full overflow-hidden"}>{post.content}</Text>
            </div>
            <Divider className={"my-2"}/>
            <div className={"flex-row flex gap-1"}>
                <ChatBubbleOvalLeftEllipsisIcon className={"size-[22px] fill-zinc-500"}/>
                <Text>
                    {post.comments.length}
                </Text>
            </div>
            <Button color={"dark"} href={`/forum/post/${post._id}`} className={"mt-4"}>
                <BookOpenIcon className={"size-[22px] fill-white"} />
                Voir le post
            </Button>
        </div>
    );
}

export default PostCard;