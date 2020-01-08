import * as React from "react";
import { memo, ReactNode, useState, useEffect } from "react";
import "./Page-view.css";
import { BackgroundWave } from "../decor/Background-wave";

interface IProps {
    pageViewNum: number;
    page1?: ReactNode;
    page2?: ReactNode;
}

export const PageView = memo<IProps>(({ pageViewNum = 0, page1, page2 }) => {
    const [isInTransition, setIsInTransition] = useState(false);
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
    if (isInTransition) {
        page1className += " Page-in-transition";
        page2className += " Page-in-transition";
    }

    useEffect(() => {
        if (pageViewNum !== currentPageViewNum) {
            if (!isInTransition) {
                setIsInTransition(true);
            }
            const transitionTimer = setTimeout(() => {
                setCurrentPageViewNum(pageViewNum);
                if (isInTransition) {
                    setIsInTransition(false);
                }
            }, 1000);
            return () => {
                clearTimeout(transitionTimer);
            };
        }
        return;
    }, [currentPageViewNum, pageViewNum, isInTransition]);

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
