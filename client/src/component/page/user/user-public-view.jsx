import React, {useEffect} from 'react';
import {useParams} from "react-router";
import axios from "axios";
import UserWidget from "../../widget/user-widget.jsx";
import {Text} from "../../catalyst-ui/text.jsx";
import {Heading} from "../../catalyst-ui/heading.jsx";
import {Button} from "../../catalyst-ui/button.jsx";
import {ArrowUturnLeftIcon} from "@heroicons/react/16/solid/index.js";

function UserPublicView() {

    const [loading, setLoading] = React.useState(true);

    const [error, setError] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const {userId} = useParams();

    useEffect(() => {
        if (user) {
            document.title = `Forum - Profil de ${user.username}`;
        } else if (!user && !loading) {
            document.title = "Posts - Profil introuvable";
        } else {
            document.title = "Posts - Profil";
        }
    }, [user, loading])

    function fetchUser() {
        setLoading(true);
        setError(null);
        setUser(null);
        axios.get(`${import.meta.env.VITE_BACKEND_HOST}api/users/${userId}`)
            .then(res => {
                if (res.status === 204) {
                    setError(new Error("L'utilisateur n'existe pas."));
                    return
                }
                setUser(res.data.data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <main>
            {
                loading ?
                    null
                    :
                    error ?
                        <div className={"flex justify-center w-full mt-12 text-center"}>
                            <div className={"flex flex-col gap-2"}>
                                <Heading>Problème inattendu</Heading>
                                <Text>Oups! {error.message}</Text>
                                <Button href={"/"} className={"mt-2"}>
                                    <ArrowUturnLeftIcon/> Revenir à l'accueil
                                </Button>
                            </div>
                        </div>
                        :
                        <UserWidget user={user}/>
            }
        </main>
    );
}

export default UserPublicView;