import React from 'react';
import PostCardList from "../widget/forum/PostCardList.jsx";
import PostCard from "../widget/forum/PostCard.jsx";
import {Button} from "../catalyst-ui/button.jsx";
import {PlusCircleIcon} from "@heroicons/react/20/solid/index.js";
import {Subheading} from "../catalyst-ui/heading.jsx";
import {Switch, SwitchField, SwitchGroup} from "../catalyst-ui/switch.jsx";
import {Fieldset, Label, Legend} from "../catalyst-ui/fieldset.jsx";
import {Text} from "../catalyst-ui/text.jsx";
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
            <div className={"flex flex-col justify-between w-xs h-fit min-h-124 max-lg:min-h-0 max-lg:w-full border border-zinc-950/10 dark:border-white/10 rounded-md p-8"}>
                <form>
                    <Fieldset>
                        <Legend>Filtres</Legend>
                        <Text>Affinez les posts à consulter.</Text>
                        <SwitchGroup>
                            <SwitchField>
                                <Label>Plus Récent {availableSoon}</Label>
                                <Switch name={"filtre1"} defaultChecked={true} />
                            </SwitchField>
                            <SwitchField>
                                <Label>Plus Commenté {availableSoon}</Label>
                                <Switch name={"filtre2"} defaultChecked={false} />
                            </SwitchField>
                        </SwitchGroup>
                    </Fieldset>
                </form>
                <div className={"flex flex-col"}>
                    <Divider className={"my-4"}/>
                    <Button href={"/forum/new-post"} color={"blue"} className={"w-full"}>
                        <PlusCircleIcon className={"fill-white dark:fill-white"} />
                        Ajouter un post
                    </Button>
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
    );
}

export default Forum;