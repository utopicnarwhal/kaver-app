import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@material-ui/core";
import React, { useState, useRef, useEffect, useReducer } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { RandomData, RandomData_getRandomSongs } from "../../models/generated/RandomData";

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

interface IState {
    index: number;
    position: number;
    direction: PlaceholderDirection;
    placeholderText: string;
}

interface IAction {
    randomSongs: RandomData_getRandomSongs[] | null;
}

const placeholderInitialState: IState = {
    index: 0,
    position: 0,
    direction: PlaceholderDirection.forward,
    placeholderText: ""
};

function placeholderReducer(state: IState, action: IAction) {
    const newState = { ...state };

    if (!action.randomSongs) {
        return placeholderInitialState;
    }

    newState.position = newState.position + (newState.direction === PlaceholderDirection.forward ? 1 : -1);

    if (newState.position === 0) {
        if (state.index === action.randomSongs.length - 1) {
            newState.index = 0;
        } else {
            newState.index = newState.index + 1;
        }
    }

    if (newState.position === action.randomSongs[newState.index].title.length) {
        newState.direction = PlaceholderDirection.backward;
    } else if (newState.position === 0) {
        newState.direction = PlaceholderDirection.forward;
    }

    newState.placeholderText = action.randomSongs[newState.index].title.slice(0, newState.position);

    return newState;
}

export default function Search() {
    const { data: randomData } = useQuery<RandomData>(RANDOM_DATA_QUERY, { suspend: false });
    const [searchText, setSearchText] = useState("");
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
        if (searchText.length !== 0 && randomData) {
            dispatch({ randomSongs: null });
        }

        if (randomData && randomData.getRandomSongs && searchText.length === 0) {
            const randomSongs = randomData.getRandomSongs;

            let delay = 70;
            if (state.position === 0) {
                delay = 2000;
            } else if (state.position === randomSongs[state.index].title.length) {
                delay = 3000;
            } else if (state.direction === PlaceholderDirection.backward) {
                delay = 20;
            }

            const placeholderTimer = setTimeout(() => {
                dispatch({ randomSongs: randomData.getRandomSongs });
            }, delay);
            return () => {
                clearTimeout(placeholderTimer);
            };
        }
    });

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
                    placeholder={state.placeholderText} fullWidth={true} inputRef={searchInputRef} />
            </form>
            <div onClick={() => handleSearchIconClick()}>
                <FontAwesomeIcon icon={faSearch} size="3x" className="Search-icon" />
            </div>
        </div>
    );
}
