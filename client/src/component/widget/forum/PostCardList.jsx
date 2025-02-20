import React from 'react';
import {Pagination, PaginationNext, PaginationPrevious} from "../../catalyst-ui/pagination.jsx";
import {Divider} from "../../catalyst-ui/divider.jsx";

function PostCardList({children}) {

    return (
        <div className={"flex flex-col w-full"}>
            <div className={"flex flex-row flex-wrap gap-4"}>
                {children}
            </div>
            <Divider className={"my-4"}/>
            <Pagination>
                <PaginationPrevious/>
                <PaginationNext/>
            </Pagination>
        </div>
    );
}

export default PostCardList;