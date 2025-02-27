import React from 'react';
import {Pagination, PaginationNext, PaginationPrevious} from "../../../catalyst-ui/pagination.jsx";
import {Divider} from "../../../catalyst-ui/divider.jsx";
import {useSearchParams} from "react-router";

function PostCardList({children, pagination = false}) {

    const [searchParams, setSearchParams] = useSearchParams();
    let page = searchParams.get("page");

    if (!page) {
        page = 1;
    } else {
        page = parseInt(page);
    }

    return (
        <div className={"flex flex-col w-full"}>
            <div className={"flex flex-row flex-wrap gap-4"}>
                {children}
            </div>
            <Divider className={"my-4"}/>
            {
                pagination && (
                    <Pagination>
                        <PaginationPrevious disabled={page == "1"} onClick={() => setSearchParams({page: page + 1})} href={"?page=" + (page - 1)}/>
                        <PaginationNext onClick={() => setSearchParams({page: page + 1})} href={"?page=" + (page + 1)} />
                    </Pagination>
                )
            }
        </div>
    );
}

export default PostCardList;