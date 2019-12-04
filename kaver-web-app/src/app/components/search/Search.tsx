import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@material-ui/core";
import React, { useState } from "react";
import gql from "graphql-tag";

const getRandomData = gql`
    query{
        getRandomSingers {
            name
        }
        getRandomSongs {
            title
        }
    }
`;

export default function Search() {
    const [searchText, setSearchText] = useState("");
    const [placeholderText, setPlaceholderText] = useState("Название песни или автора");

    const searchInputRef = React.createRef<HTMLInputElement>();
    const searchFormRef = React.createRef<HTMLFormElement>();

    const handleSearchBlockClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (searchInputRef.current != null) {
            searchInputRef.current.focus();
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(searchText);
    };

    const handleSearchIconClick = () => {
        console.log(searchText);
    };

    return (
        <div className="Search-block" onClick={(event) => handleSearchBlockClick(event)}>
            <form onSubmit={(event) => handleSubmit(event)} ref={searchFormRef} className={"Search-form"}>
                <Input id="search" type="text" disableUnderline={true} autoFocus={true}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder={placeholderText} fullWidth={true} inputRef={searchInputRef} />
            </form>
            <div onClick={() => handleSearchIconClick()}>
                <FontAwesomeIcon icon={faSearch} size="3x" className="Search-icon" />
            </div>
        </div>
    );
}
