import * as React from "react";
import { useTheme } from "@material-ui/core/styles";
import { useReducer, memo, useEffect } from "react";
import { HorizontalDirection } from "../../models/enums/directions";

const waveSvgStyles = {
    position: "absolute",
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    zIndex: -1,
} as React.CSSProperties;

interface IProps {
    amplitude: number;
    waveCount: number;
    color?: string;
    pageViewNum: number;
}

interface IWaveAnimationState {
    count: number;
    currentPageView: 0;
}

interface IWaveAnimationAction {
    direction: HorizontalDirection;
}

const initialWaveAnimationState: IWaveAnimationState = {
    count: 0,
    currentPageView: 0
};

function waveAnimationReducer(state: IWaveAnimationState, action: IWaveAnimationAction) {
    const newState = { ...state };

    if (action.direction === HorizontalDirection.forward) {
        newState.count += 1;
        if (newState.count === 100) {
            newState.currentPageView += 1;
            newState.count = 0;
        }
    } else {
        newState.count -= 1;
        if (newState.count === -100) {
            newState.currentPageView -= 1;
            newState.count = 0;
        }
    }
    return newState;
}

export default memo<IProps>(({ amplitude, waveCount, color, pageViewNum = 0 }) => {
    const [waveAnimationState, waveAnimationDispatch] = useReducer(waveAnimationReducer, initialWaveAnimationState);

    useEffect(() => {
        if (pageViewNum !== waveAnimationState.currentPageView) {

            const delay = 20;

            const waveAnimationTimer = setTimeout(() => {
                if (waveAnimationState.currentPageView > pageViewNum) {
                    const direction = HorizontalDirection.backward;
                    waveAnimationDispatch({ direction });
                } else {
                    const direction = HorizontalDirection.forward;
                    waveAnimationDispatch({ direction });
                }
            }, delay);
            return () => {
                clearTimeout(waveAnimationTimer);
            };
        }
        return;
    });

    let generatedWaveSvgPath = "";

    const t = Math.abs((waveAnimationState.count) / 100);
    const sqt = t ** 2;
    const offsetX = ((sqt / (2.0 * (sqt - t) + 1.0)) * (waveAnimationState.currentPageView > pageViewNum ? -100 : 100)) % 10;

    const dx = 100 / waveCount;
    const y = 50 - amplitude;

    for (let i = -1; i < waveCount + 2; ++i) {
        generatedWaveSvgPath += `Q ${((dx * i) + (dx / 4) + offsetX).toString()} ${y}, ${((dx * i) + (dx / 2) + offsetX).toString()} 50
      T ${((dx * i) + dx + offsetX).toString()} 50 `;
    }

    const themePrimaryColor = useTheme().palette.primary.main;
    color = color ? color : themePrimaryColor;

    return (<svg width="100%" height="100%" viewBox="0 0 100 100" style={waveSvgStyles} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" >
        <g filter="url(#dropshadow)">
            <path d={
                `M 0 0
                L 0 50
                ${generatedWaveSvgPath}
                L 100 50, 100 0
                Z`
            } fill={color} />
        </g>
        <defs>
            <filter id="dropshadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    </svg>);
});
