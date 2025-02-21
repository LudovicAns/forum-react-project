import {createContext, useEffect, useState} from "react";
import {Outlet, useParams} from "react-router";
import axios from "axios";
import Error404 from "../component/page/error/error-404.jsx";

export const PostContext = createContext();

export function PostContext({children}) {

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
        axios.delete(`${import.meta.env.VITE_BACKEND_HOST}api/posts/${postId}`, {
            withCredentials: true
        })
            .then(res => {
                if (onSuccess) onSuccess(res);
                setPost(null);
            })
            .catch(err => {
                if (onError) onError(err);
                setError(err);
            })
            .finally(() => {
                if (onEnd) onEnd();
                setIsLoading(false);
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
                if (onSuccess) onSuccess(res);
                setPost({
                    ...res.data.data
                });
            })
            .catch(err => {
                if (onError) onError(err);
                setError(err);
            })
            .finally(() => {
                if (onEnd) onEnd();
                setIsLoading(false);
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