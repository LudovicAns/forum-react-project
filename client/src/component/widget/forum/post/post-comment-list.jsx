import React from 'react';
import clsx from "clsx";

function PostCommentList({className, children}) {
    return (
        <div className={clsx(className, "flex flex-col gap-4")}>
            {children}
        </div>
    );
}

export default PostCommentList;