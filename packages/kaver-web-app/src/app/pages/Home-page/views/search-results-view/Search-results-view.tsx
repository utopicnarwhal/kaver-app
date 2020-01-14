import React from "react";

interface IProps {
    searchResults?: any;
}

export default function SearchResultsView(props: IProps) {
    console.log(props.searchResults);
    return (
        <>
            Найденные авторы
            Найденные песни
            {props.searchResults?.toString()}
        </>
    );
}
