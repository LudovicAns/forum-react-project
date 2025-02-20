import React from 'react';
import PostCardList from "../widget/forum/PostCardList.jsx";
import PostCard from "../widget/forum/PostCard.jsx";
import {Button} from "../catalyst-ui/button.jsx";
import {ArchiveBoxIcon, ArrowPathIcon, PlusCircleIcon, StarIcon} from "@heroicons/react/20/solid/index.js";
import {Subheading} from "../catalyst-ui/heading.jsx";
import {Switch, SwitchField, SwitchGroup} from "../catalyst-ui/switch.jsx";
import {Fieldset, Label, Legend} from "../catalyst-ui/fieldset.jsx";
import {Text, TextLink} from "../catalyst-ui/text.jsx";
import {Divider} from "../catalyst-ui/divider.jsx";
import {Badge} from "../catalyst-ui/badge.jsx";

const posts = [
    {
        _id: "1",
        title: "🚀 Voici le premier post !",
        content: "azerfazerc vajkzefaiu zerhfiuahiuzehnczfhiz fuhiuazhf iuazfhauizfh aiuzhfiuazhfioauzhfiuazhfiuazhfiuazf" +
            "auzehfiuaozhfgoiazfo iazhjfoiazhfiozahf iozaufhiuzahfiouz afhiu zhfiuoazf hizuahfiouzfhiaozfhioazfhi" +
            "azjfbazljf laizufak zlfbhlkz jafhbi kzufhbafh biazlufbhiazulfg hiuazfghiu azfhgau ziofhioazufgh ziauofg huiazof" +
            "azoi uefhao ziufhoifha zoiupf haoz piufhdscn oakzjnapo ziuefhaz poiufzjcnpozfhdopaziuefdhpzaofhaozmiiho",
        author: "67b5e3405b26c118be41caf9",
        comments: [
            {
                author: "67b5e3405b26c118be41caf9",
                content: "Comment 1"
            },
            {
                author: "67b5e3405b26c118be41caf8",
                content: "Comment 2"
            },
        ]
    },
    {
        _id: "2",
        title: "Post 2",
        content: "Content",
        author: "67b5e3405b26c118be41caf9",
        comments: [
            {
                author: "67b5e3405b26c118be41caf9",
                content: "Comment 1"
            },
            {
                author: "67b5e3405b26c118be41caf8",
                content: "Comment 2"
            },
        ]
    },
    {
        _id: "3",
        title: "Post 3",
        content: "Content",
        author: "67b5e3405b26c118be41caf9",
        comments: [
            {
                author: "67b5e3405b26c118be41caf9",
                content: "Comment 1"
            },
            {
                author: "67b5e3405b26c118be41caf8",
                content: "Comment 2"
            },
        ]
    },
    {
        _id: "4",
        title: "Post 4",
        content: "Content",
        author: "67b5e3405b26c118be41caf9",
        comments: [
            {
                author: "67b5e3405b26c118be41caf9",
                content: "Comment 1"
            },
            {
                author: "67b5e3405b26c118be41caf8",
                content: "Comment 2"
            },
        ]
    }
]

const availableSoon = <Badge color={"yellow"}>Bientôt disponible</Badge>;

function Forum(props) {
    document.title = "Forum - Forum";

    return (
        <main className={"flex flex-row max-lg:flex-col gap-4"}>
            <div
                className={"flex flex-col min-w-fit gap-4 [&>*]:border [&>*]:border-zinc-950/10 [&>*]:dark:border-white/10 [&>*]:rounded-md [&>*]:p-8"}>
                <div className={"flex flex-col gap-2"}>
                    <Subheading className={"mb-4"}>Pour vous</Subheading>
                    <TextLink className={"w-full flex flex-row gap-2 items-center !no-underline"} outline={true} href={"/forum/posts"}>
                        <ArchiveBoxIcon className={"size-[20px] inline"}/>
                        Vos posts
                    </TextLink>
                    <TextLink className={"w-full flex flex-row gap-2 items-center !no-underline"} outline={true} href={"/forum/favorites"}>
                        <StarIcon className={"fill-yellow-400 size-[20px] inline"}/>
                        Vos favoris
                    </TextLink>
                    <Divider className={"my-4"}/>
                    <Button href={"/forum/new-post"} color={"blue"} className={"w-full"}>
                        <PlusCircleIcon className={"fill-white dark:fill-white"}/>
                        Ajouter un post
                    </Button>
                </div>
                <div>
                    <form>
                        <Fieldset>
                            <Legend>Filtres {availableSoon}</Legend>
                            <Text>Affinez les posts à consulter.</Text>
                            <SwitchGroup>
                                <SwitchField>
                                    <Label>Plus Récent</Label>
                                    <Switch name={"filtre1"} defaultChecked={true} disabled/>
                                </SwitchField>
                                <SwitchField>
                                    <Label>Plus Commenté</Label>
                                    <Switch name={"filtre2"} defaultChecked={false} disabled/>
                                </SwitchField>
                            </SwitchGroup>
                        </Fieldset>
                        <div className={"flex flex-col"}>
                            <Divider className={"my-4"}/>
                            <Button disabled color={"dark"} className={"w-full"}>
                                <ArrowPathIcon className={"fill-white dark:fill-white"}/>
                                Actualiser
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <PostCardList>
                {
                    posts &&
                    posts.map(post => {
                        return (
                            <PostCard key={post._id} post={post}/>
                        );
                    })
                }
            </PostCardList>
        </main>
    )
        ;
}

export default Forum;