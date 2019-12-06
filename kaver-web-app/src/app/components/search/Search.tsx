import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@material-ui/core";
import React, { useState, useRef, useEffect, useReducer, Reducer } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { RandomData } from "../../models/generated/RandomData";

const RANDOM_DATA_QUERY = gql`
    query RandomData {
        getRandomSingers {
            name
        }
        getRandomSongs {
            title
        }
    }
`;

enum PlaceholderDirection {
    forward,
    backward
}

type State = {
    index: number,
    position: number,
    direction: PlaceholderDirection
}

type Action = {
    increase: boolean
}

const placeholderInitialState: State = { index: 0, position: 1, direction: 0 };

function placeholderReducer(state: State, action: Action) {
    return {
        index: state.index,
        position: state.position,
        direction: state.direction
    };
}

export default function Search() {
    const { data: randomData } = useQuery<RandomData>(RANDOM_DATA_QUERY, { suspend: false });
    const [searchText, setSearchText] = useState("");
    const [placeholderText, setPlaceholderText] = useState("");

    const [state, dispatch] = useReducer(placeholderReducer, placeholderInitialState);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchFormRef = useRef<HTMLFormElement>(null);

    const handleSearchBlockClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        if (searchInputRef.current != null) {
            searchInputRef.current.focus();
        }
    };

    useEffect(() => {
        if (randomData && randomData.getRandomSongs) {
            const randomSongs = randomData.getRandomSongs;

            let delay = 70;
            if (state.position === 0) {
                delay = 1000;
            } else if (state.position === randomSongs[state.index].title.length - 1
                && state.direction === PlaceholderDirection.backward) {
                delay = 2000;
            } else if (state.direction === PlaceholderDirection.backward) {
                delay = 20;
            }

            let placeholderTimer = setTimeout(() => {
                let newState = state;
                if (state.position === 0) {
                    if (state.index === randomSongs.length - 1) {
                        newState.index = 0;
                    }
                    newState.index = state.index + 1;
                }

                if (state.position === randomSongs[state.index].title.length - 1) {
                    newState.direction = PlaceholderDirection.backward;
                } else if (state.position === 0) {
                    newState.direction = PlaceholderDirection.forward;
                }
                newState.position = state.position + (state.direction === PlaceholderDirection.forward ? 1 : -1);
            }, delay);
            return () => {
                clearTimeout(placeholderTimer);
            };
        }
    }, [randomData, state]);

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
                    placeholder={placeholderText}
                    fullWidth={true} inputRef={searchInputRef} />
            </form>
            <div onClick={() => handleSearchIconClick()}>
                <FontAwesomeIcon icon={faSearch} size="3x" className="Search-icon" />
            </div>
        </div>
    );
}
