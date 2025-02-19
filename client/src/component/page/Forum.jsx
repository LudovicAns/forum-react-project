import React from 'react';
import {Heading} from "../catalyst-ui/heading.jsx";
import PostCardList from "../widget/forum/PostCardList.jsx";
import PostCard from "../widget/forum/PostCard.jsx";

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

function Forum(props) {
    document.title = "Forum - Forum";
    return (
        <main className={"flex flex-row max-lg:flex-col gap-4"}>
            <div className={"w-xs h-fit min-h-124 max-lg:min-h-0 max-lg:w-full border border-zinc-950/10 dark:border-white/10 rounded-md p-8"}>

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