import * as React from "react";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { TextField } from "@material-ui/core";
import gql from "graphql-tag";

const query = gql`
{
    getSingerByName(name: "Пасош") {
        name
        href
    }
}
`;

export const Search: React.FC = () => {
    return (<div className="Search-block">
        <TextField id="time" type="text" />
        <FontAwesomeIcon icon={faSearch} size="3x" className="Search-icon" />
    </div>);
};
