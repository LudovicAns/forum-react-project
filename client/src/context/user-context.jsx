import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "sonner";
import {CheckCircleIcon, ExclamationTriangleIcon} from "@heroicons/react/20/solid/index.js";
import {Button} from "../component/catalyst-ui/button.jsx";
import {Text, TextLink} from "../component/catalyst-ui/text.jsx";

export const UserContext = createContext();

export function UserProvider({children}) {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(import.meta.env.VITE_BACKEND_HOST + "api/users/me", {
            withCredentials: true,
        })
            .then(res => {
                setUser(res.data.data);
            })
            .catch(err => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [])

    function register(data, onSuccess, onError, onEnd) {
        axios.post(import.meta.env.VITE_BACKEND_HOST + "api/users/register", data, {withCredentials: true})
            .then(res => {
                toast.success(<Text>Vous êtes maintenant inscrit. <TextLink href={"/login"}>Connectez-vous</TextLink></Text>, {
                    icon: <CheckCircleIcon className={"fill-green-500 dark:fill-white"}/>,
                });
                if (onSuccess) onSuccess(res);
            })
            .catch(err => {
                if (err.status >= 500){
                    toast.error("Erreur lors de l'inscription.", {
                        icon: <ExclamationTriangleIcon className={"fill-red-500 dark:fill-white"}/>
                    })
                }
                if (onError) onError(err);
            })
            .finally(() => {
                if (onEnd) onEnd();
            });
    }

    function login(data, onSuccess, onError, onEnd) {
        axios.post(import.meta.env.VITE_BACKEND_HOST + "api/users/login", data, {withCredentials: true})
            .then(res => {
                setUser(res.data.data);
                toast.success("Vous êtes connecté.", {
                    icon: <CheckCircleIcon className={"fill-green-500 dark:fill-white"}/>
                });
                if (onSuccess) onSuccess(res);
            })
            .catch(err => {
                if (err.status >= 500){
                    toast.error("Erreur lors de la connexion.", {
                        icon: <ExclamationTriangleIcon className={"fill-red-500 dark:fill-white"}/>
                    })
                }
                if (onError) onError(err);
            })
            .finally(() => {
                if (onEnd) onEnd();
            });
    }

    function logout() {
        axios.post(import.meta.env.VITE_BACKEND_HOST + "api/users/logout", {}, {withCredentials: true})
            .then(res => {
                setUser(null);
                toast.success("Vous êtes déconnecté.", {
                    icon: <CheckCircleIcon className={"fill-green-500 dark:fill-white"}/>
                });
            });
    }

    return (
        <UserContext.Provider value={{
            loading,
            user,
            setUser,
            register,
            login,
            logout,
        }}>{children}</UserContext.Provider>
    );
}