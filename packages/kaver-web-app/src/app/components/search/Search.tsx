import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@material-ui/core";
import React, { useState, useRef, useEffect, useReducer, memo } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import { RandomData, RandomData_getRandomSongs } from "../../models/generated/RandomData";
import { HorizontalDirection } from "../../models/enums/directions";

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

interface IPlaceholderState {
    index: number;
    position: number;
    direction: HorizontalDirection;
    placeholderText: string;
}

interface IPlaceholderAction {
    randomSongs: RandomData_getRandomSongs[] | null;
}

const placeholderInitialState: IPlaceholderState = {
    index: 0,
    position: 0,
    direction: HorizontalDirection.forward,
    placeholderText: ""
};

function placeholderReducer(state: IPlaceholderState, action: IPlaceholderAction) {
    const newState = { ...state };

    if (!action.randomSongs) {
        return placeholderInitialState;
    }

    newState.position = newState.position + (newState.direction === HorizontalDirection.forward ? 1 : -1);

    if (newState.position === 0) {
        if (state.index === action.randomSongs.length - 1) {
            newState.index = 0;
        } else {
            newState.index = newState.index + 1;
        }
    }

    if (newState.position === action.randomSongs[newState.index].title.length) {
        newState.direction = HorizontalDirection.backward;
    } else if (newState.position === 0) {
        newState.direction = HorizontalDirection.forward;
    }

    newState.placeholderText = action.randomSongs[newState.index].title.slice(0, newState.position);

    return newState;
}

interface ISearchComponentProps {
    onSearchTextChange: (searchText: string) => void;
}

export const Search = memo<ISearchComponentProps>((props) => {
    const { data: randomData } = useQuery<RandomData>(RANDOM_DATA_QUERY, { suspend: false });
    const [searchText, setSearchText] = useState("");
    const [placeholderState, placeholderDispatch] = useReducer(placeholderReducer, placeholderInitialState);

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
            placeholderDispatch({ randomSongs: null });
            return;
        }

        if (randomData.getRandomSongs && searchText.length === 0) {
            const randomSongs = randomData.getRandomSongs;

            let delay = kDelayTypingRandomData;
            if (placeholderState.position === 0) {
                delay = kDelayBeforeTypeRandomData;
            } else if (placeholderState.position === randomSongs[placeholderState.index].title.length) {
                delay = kDelayBeforeDeleteRandomData;
            } else if (placeholderState.direction === HorizontalDirection.backward) {
                delay = kDelayDeletingRandomData;
            }

            const placeholderTimer = setTimeout(() => {
                placeholderDispatch({ randomSongs: randomData.getRandomSongs });
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

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onSearchTextChange(event.target.value);
        setSearchText(event.target.value);
    };

    return (
        <div className="Search-block" onClick={handleSearchBlockClick}>
            <form onSubmit={handleSubmit} ref={searchFormRef} className={"Search-form"}>
                <Input id="search" type="text" disableUnderline={true} autoFocus={true} onChange={handleSearchTextChange}
                    placeholder={placeholderState.placeholderText} fullWidth={true} inputRef={searchInputRef} />
            </form>
            <div onClick={handleSearchIconClick}>
                <FontAwesomeIcon icon={faSearch} size="3x" className="Search-icon" />
            </div>
        </div>
    );
});
