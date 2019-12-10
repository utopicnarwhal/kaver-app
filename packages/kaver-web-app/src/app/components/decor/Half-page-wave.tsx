import * as React from "react";
import { useTheme } from "@material-ui/core/styles";

const waveSvgStyles = {
    position: "absolute",
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    zIndex: -1
} as React.CSSProperties;

interface IProps {
    amplitude: number;
    waveCount: number;
    color?: string;
    offsetX?: number;
}

export const HalfPageWave: React.FC<IProps> = ({ amplitude, waveCount, color, offsetX = 0 }) => {
    let generatedWaveSvgPath = "";
    for (let i = -1; i < waveCount + 2; ++i) {
        const y = 50 - amplitude;
        const dx = 100 / waveCount;
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
};
