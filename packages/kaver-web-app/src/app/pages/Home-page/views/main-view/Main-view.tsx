import React, { Fragment } from "react";
import FavoriteKavers from "./favorite-kavers/Favorite-kavers";
import MyKavers from "./my-kavers/My-kavers";

export default function MainView() {
    return (
        <Fragment>
            <FavoriteKavers></FavoriteKavers>
            <MyKavers></MyKavers>
        </Fragment>
    );
}
