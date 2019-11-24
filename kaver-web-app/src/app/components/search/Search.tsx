import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@material-ui/core";
import React, { Component } from "react";

export default class Search extends Component<{}, {}> {
    private myRef: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
        this.myRef = React.createRef<HTMLInputElement>();
    }

    public handleSearchBlockClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        console.log(this.myRef.current);
        event.preventDefault();
        if (this.myRef.current != null) {
            this.myRef.current.focus();
        }
    }

    public render() {
        return (<div className="Search-block" onClick={(event) => this.handleSearchBlockClick(event)}>
            <Input id="search" type="text" disableUnderline={true} autoFocus={true}
                placeholder={"Название песни или автора"} fullWidth={true} inputRef={this.myRef} />
            <FontAwesomeIcon icon={faSearch} size="3x" className="Search-icon" />
        </div>);
    }
}
