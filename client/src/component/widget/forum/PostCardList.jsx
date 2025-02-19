import React from 'react';

function PostCardList({children}) {
    return (
        <div className={"flex flex-row flex-wrap w-full gap-4"}>
            {children}
        </div>
    );
}

export default PostCardList;