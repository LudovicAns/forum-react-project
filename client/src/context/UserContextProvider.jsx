import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext();

export function UserProvider({children}) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/api/auth/me", {
            withCredentials: true,
        })
            .then(res => {
                console.log(res);
                setUser(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function register(data, onSuccess, onError, onEnd) {
        axios.post("http://localhost:3000/api/auth/register", data, {withCredentials: true})
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
        axios.post("http://localhost:3000/api/auth/login", data, {withCredentials: true})
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
        axios.post("http://localhost:3000/api/auth/logout", {}, {withCredentials: true})
            .then(res => {
                setUser(null);
            });
    }

    return (
        <UserContext.Provider value={{
            user,
            register,
            login,
            logout,
        }}>{children}</UserContext.Provider>
    );
}