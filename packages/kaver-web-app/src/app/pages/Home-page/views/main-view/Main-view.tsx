import React from "react";
import FavoriteKavers from "./favorite-kavers/Favorite-kavers";
import MyKavers from "./my-kavers/My-kavers";
import { connect } from "react-redux";
import { IAppState } from "../../../../redux/store";

interface IProps {
    isAuth: boolean;
}

export const MainView = (props: IProps) => {
    if (props.isAuth) {
        return (
            <>
                <FavoriteKavers></FavoriteKavers>
                <MyKavers></MyKavers>
            </>
        );
    }
    return null;
};

const mapStateToProps = (store: IAppState) => {
    return {
        isAuth: store.authState.isAuth
    } as IProps;
};

export default connect(mapStateToProps)(MainView);
