import * as React from "react";
import { memo, ReactNode, Fragment, useState, useEffect } from "react";
import "./Page-view.css";
import { BackgroundWave } from "../decor/Background-wave";

interface IProps {
    pageViewNum: number;
    page1?: ReactNode;
    page2?: ReactNode;
}

export const PageView = memo<IProps>(({ pageViewNum = 0, page1, page2 }) => {
    const [currentPageViewNum, setCurrentPageViewNum] = useState(0);

    let page1className = "Page";
    let page2className = "Page";
    if (pageViewNum === 0) {
        page1className += " Page-center";
        page2className += " Page-right";
    } else {
        page1className += " Page-left";
        page2className += " Page-center";
    }
    if (currentPageViewNum !== pageViewNum) {
        page1className += " Page-in-transition";
        page2className += " Page-in-transition";
    }

    useEffect(() => {
        if (pageViewNum !== currentPageViewNum) {
            const transitionTimer = setTimeout(() => {
                setCurrentPageViewNum(pageViewNum);
            }, 1500);
            return () => {
                clearTimeout(transitionTimer);
            };
        }
        return;
    }, [currentPageViewNum, pageViewNum]);

    return (
        <Fragment>
            <div className={page1className}>
                <BackgroundWave></BackgroundWave>
                {page1}
            </div>
            <div className={page2className}>
                <BackgroundWave></BackgroundWave>
                {page2}
            </div>
        </Fragment>
    );
});
