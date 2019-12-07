import React, { useState, Fragment } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, Fab } from "@material-ui/core";
import "./Add-kaver-fab.css";

export default function AddKaverFAB() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Fragment>
            <Fab className="Add-song-fab" onClick={() => setIsDrawerOpen(true)} color={"primary"}>
                <FontAwesomeIcon icon={faPlus} size="3x" className="Add-song-icon" />
            </Fab>
            <Drawer anchor={"right"} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <h1>Название песни</h1>
            </Drawer>
        </Fragment>
    );
}
