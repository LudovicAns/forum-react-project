import {createContext, useEffect, useState} from "react";
import axios from "axios";

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
                if (onSuccess) onSuccess(res);
            })
            .catch(err => {
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
                if (onSuccess) onSuccess(res);
            })
            .catch(err => {
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