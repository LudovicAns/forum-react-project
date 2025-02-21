import {createContext, useEffect, useState} from "react";
import {Outlet, useParams} from "react-router";
import axios from "axios";
import Error404 from "../component/page/Error404.jsx";

export const PostContext = createContext();

export function PostContextProvider({children}) {

    const {postId} = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetchPost();
    }, []);

    function fetchPost() {
        setIsLoading(true);
        setError(null);
        axios.get(`${import.meta.env.VITE_BACKEND_HOST}api/posts/${postId}`, {
            withCredentials: true
        })
            .then(res => {
                setPost(res.data.data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function deletePost(onSuccess, onError, onEnd) {
        setIsLoading(true);
        setError(null);
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}api/posts/${postId}`, {
            withCredentials: true
        })
            .then(res => {
                setPost(null);
                if (onSuccess) onSuccess(res);
            })
            .catch(err => {
                setError(err);
                if (onError) onError(err);
            })
            .finally(() => {
                setIsLoading(false);
                if (onEnd) onEnd();
            });
    }

    function updatePost(data, onSuccess, onError, onEnd) {
        setIsLoading(true);
        setError(null);
        axios.put(`${import.meta.env.VITE_BACKEND_HOST}api/posts/${postId}`, {
            ...data
        }, {
            withCredentials: true
        })
            .then(res => {
                setPost({
                    ...res.data.data
                });
                if (onSuccess) onSuccess(res);
            })
            .catch(err => {
                setError(err);
                if (onError) onError(err);
            })
            .finally(() => {
                setIsLoading(false);
                if (onEnd) onEnd();
            });
    }

    return (
        <PostContext.Provider value={{
            isLoading,
            error,
            post,
            deletePost,
            updatePost,
            refreshPost: fetchPost
        }}>
            {children ? children : <Outlet/>}
        </PostContext.Provider>
    )
}