import React from "react";
import FavoriteKavers from "./favorite-kavers/Favorite-kavers";
import MyKavers from "./my-kavers/My-kavers";

export default function MainView() {
    return (
        <>
            <FavoriteKavers></FavoriteKavers>
            <MyKavers></MyKavers>
        </>
    );
}
