import React from 'react';
import {Subheading} from "../../catalyst-ui/heading.jsx";
import {Text, TextLink} from "../../catalyst-ui/text.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import {Avatar} from "../../catalyst-ui/avatar.jsx";
import {BookOpenIcon, ChatBubbleOvalLeftEllipsisIcon} from "@heroicons/react/20/solid/index.js";

function PostCard({post}) {

    return (
        <div className={"flex flex-col gap-2 w-full h-fit border border-zinc-950/10 dark:border-white/10 rounded-md p-8"}>
            <div className={"flex flex-row gap-2 justify-between"}>
                <Subheading>{post.title}</Subheading>
                <div className={"flex flex-row gap-2"}>
                    <Avatar className={"size-[24px] dark:bg-white dark:text-black bg-black text-white"} src={""} initials={"A"}/>
                    <TextLink href={`/profile/${post.author}`} className={"!no-underline max-md:hidden"}>AnonymeUser</TextLink>
                </div>
            </div>
            <div className={"h-12 max-h-12"}>
                <Text className={"h-full overflow-hidden"}>{post.content}</Text>
            </div>
            <Divider className={"my-2"}/>
            <div className={"flex-row flex gap-1"}>
                <ChatBubbleOvalLeftEllipsisIcon className={"size-[22px] fill-zinc-500"}/>
                <Text className={""}>
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