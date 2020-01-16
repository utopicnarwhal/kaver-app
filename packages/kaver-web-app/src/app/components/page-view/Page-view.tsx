import * as React from "react";
import { memo, ReactNode, useEffect, useReducer } from "react";
import "./Page-view.css";
import { BackgroundWave } from "../decor/Background-wave";

interface IProps {
    pageViewNum: number;
    page1?: ReactNode;
    page2?: ReactNode;
}

interface IPageViewState {
    toPage: number;
    fromPage: number;
}

interface IPageViewAction {
    moveTo?: number;
}

const initialState: IPageViewState = {
    toPage: 0,
    fromPage: 0
};

const reducer = (state: IPageViewState, action: IPageViewAction) => {
    const newState = { ...state };

    if (action.moveTo == null) {
        newState.fromPage = newState.toPage;
    } else {
        newState.toPage = action.moveTo;
    }

    return newState;
};

export const PageView = memo<IProps>(({ pageViewNum = 0, page1, page2 }) => {
    const [pageViewState, pageViewDispatch] = useReducer(reducer, initialState);

    let page1className = "Page";
    let page2className = "Page";
    if (pageViewState.toPage === 0) {
        page1className += " Page-center";
        page2className += " Page-right";
    } else {
        page1className += " Page-left";
        page2className += " Page-center";
    }
    if (pageViewState.toPage !== pageViewState.fromPage) {
        page1className += " Page-in-transition";
        page2className += " Page-in-transition";
    }

    useEffect(() => {
        if (pageViewNum !== pageViewState.toPage) {
            if (pageViewNum === pageViewState.fromPage) {
                pageViewDispatch({});
            }
            pageViewDispatch({ moveTo: pageViewNum });
        }

        if (pageViewState.toPage !== pageViewState.fromPage) {
            const transitionTimer = setTimeout(() => {
                pageViewDispatch({});
            }, 1000);
            return () => {
                clearTimeout(transitionTimer);
            };
        }
        return;
    });

    return (
        <>
            <div className={page1className}>
                <BackgroundWave></BackgroundWave>
                {page1}
            </div>
            <div className={page2className}>
                <BackgroundWave></BackgroundWave>
                {page2}
            </div>
        </>
    );
});
