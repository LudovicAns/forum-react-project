import React, {useEffect} from 'react';
import PostCardList from "../../widget/forum/PostCardList.jsx";
import PostCard from "../../widget/forum/PostCard.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import {
    ArchiveBoxIcon,
    ArrowPathIcon,
    FolderIcon,
    GlobeAltIcon,
    PlusCircleIcon,
    StarIcon
} from "@heroicons/react/20/solid/index.js";
import {Heading, Subheading} from "../../catalyst-ui/heading.jsx";
import {Switch, SwitchField, SwitchGroup} from "../../catalyst-ui/switch.jsx";
import {Fieldset, Label, Legend} from "../../catalyst-ui/fieldset.jsx";
import {Text, TextLink} from "../../catalyst-ui/text.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";
import {Badge} from "../../catalyst-ui/badge.jsx";
import axios from "axios";
import {Radio, RadioField, RadioGroup} from "../../catalyst-ui/radio.jsx";

const availableSoon = (<Badge color={"yellow"}>Bientôt disponible</Badge>);

const newPostButton = (
    <Button href={"/forum/new-post"} color={"blue"} className={"w-full"}>
        <PlusCircleIcon className={"fill-white dark:fill-white"}/>
        Ajouter un post
    </Button>
);

function Forum(props) {
    document.title = "Forum - Forum";

    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BACKEND_HOST}api/posts`, {withCredentials: true})
            .then(res => {
                if (res.status === 204) return [];
                setPosts(res.data.data);
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main className={"flex flex-row max-lg:flex-col gap-4"}>
            <div
                className={"flex flex-col min-w-fit gap-4 [&>*]:border [&>*]:border-zinc-950/10 [&>*]:dark:border-white/10 [&>*]:rounded-md [&>*]:p-8"}>
                <div className={"flex flex-col gap-2"}>
                    <form>
                        <Fieldset>
                            <Legend>Post à afficher</Legend>
                            <RadioGroup name={"post-type"} defaultValue={"all"}>
                                <RadioField>
                                    <Label className={"w-full flex flex-row gap-2 items-center"}>
                                        <GlobeAltIcon className={"size-[20px] inline"}/>
                                        Tous les posts
                                    </Label>
                                    <Radio value={"all"}/>
                                </RadioField>
                                <RadioField disabled={true}>
                                    <Label className={"w-full flex flex-row gap-2 items-center"}>
                                        <FolderIcon className={"size-[20px] inline"}/>
                                        Vos post
                                    </Label>
                                    <Radio value={"user"}/>
                                </RadioField>
                                <RadioField disabled={true}>
                                    <Label className={"w-full flex flex-row gap-2 items-center"}>
                                        <StarIcon className={"fill-yellow-400 size-[20px] inline"}/>
                                        Vos favoris
                                    </Label>
                                    <Radio value={"favorites"}/>
                                </RadioField>
                            </RadioGroup>
                        </Fieldset>
                    </form>
                    <Divider className={"my-4"}/>
                    {newPostButton}
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
            {
                posts.length > 0 && !loading && (
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
                )
            }
            {
                posts.length === 0 && !loading && (
                    <div className={"flex flex-col gap-4 w-full justify-center items-center"}>
                        <Heading>Aucun post, soit le premier à poster !</Heading>
                        <div>
                            {newPostButton}
                        </div>
                    </div>
                )
            }
            {
                loading && (
                    <div className={"flex flex-col gap-4 w-full justify-center items-center"}>
                        <Heading>Chargement ...</Heading>
                    </div>
                )
            }
        </main>
    );
}

export default Forum;