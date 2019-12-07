import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@material-ui/core";
import React, { useState, useRef, useEffect, useReducer } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { RandomData, RandomData_getRandomSongs } from "../../models/generated/RandomData";

const kDelayBeforeTypeRandomData = 1000;
const kDelayBeforeDeleteRandomData = 2000;
const kDelayTypingRandomData = 70;
const kDelayDeletingRandomData = 20;

const RANDOM_DATA_QUERY = gql`
    query RandomData {
        getRandomSongs {
            title
        }
    }
`;

enum PlaceholderDirection {
    forward,
    backward
}

interface IPlaceholderState {
    index: number;
    position: number;
    direction: PlaceholderDirection;
    placeholderText: string;
}

interface IPlaceholderAction {
    randomSongs: RandomData_getRandomSongs[] | null;
}

const placeholderInitialState: IPlaceholderState = {
    index: 0,
    position: 0,
    direction: PlaceholderDirection.forward,
    placeholderText: ""
};

function placeholderReducer(state: IPlaceholderState, action: IPlaceholderAction) {
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
        if (searchText.length !== 0 || !randomData) {
            dispatch({ randomSongs: null });
            return;
        }

        if (randomData.getRandomSongs && searchText.length === 0) {
            const randomSongs = randomData.getRandomSongs;

            let delay = kDelayTypingRandomData;
            if (state.position === 0) {
                delay = kDelayBeforeTypeRandomData;
            } else if (state.position === randomSongs[state.index].title.length) {
                delay = kDelayBeforeDeleteRandomData;
            } else if (state.direction === PlaceholderDirection.backward) {
                delay = kDelayDeletingRandomData;
            }

            const placeholderTimer = setTimeout(() => {
                dispatch({ randomSongs: randomData.getRandomSongs });
            }, delay);
            return () => {
                clearTimeout(placeholderTimer);
            };
        }
        return;
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(searchText);
    };

    const handleSearchIconClick = () => {
        console.log(searchText);
    };

    return (
        <div className="Search-block" onClick={handleSearchBlockClick}>
            <form onSubmit={handleSubmit} ref={searchFormRef} className={"Search-form"}>
                <Input id="search" type="text" disableUnderline={true} autoFocus={true}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder={state.placeholderText} fullWidth={true} inputRef={searchInputRef} />
            </form>
            <div onClick={handleSearchIconClick}>
                <FontAwesomeIcon icon={faSearch} size="3x" className="Search-icon" />
            </div>
        </div>
    );
}
