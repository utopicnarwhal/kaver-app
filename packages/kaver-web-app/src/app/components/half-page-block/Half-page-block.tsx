import React, { ReactNode } from "react";
import "./Half-page-block.css";

interface IProps {
    title: string;
    child: ReactNode;
}

export const HalfPageBlock = (props: IProps) => {
    return (
        <div className="Half-page-block">
            <h1>{props.title}</h1>
            <div className="Content">
                {props.child}
            </div>
        </div>
    );
};
