import * as React from "react";
import "./Background-wave.css";
import { useWindowSize } from "../../hooks/hooks";
import { useTheme } from "@material-ui/core";

export const BackgroundWave = React.memo(() => {
    const [screenWidth] = useWindowSize();
    const waveCount = Math.round(screenWidth / 192);
    let generatedWaveSvgPath = "";

    const dx = 100 / waveCount;
    const yMin = 47;

    for (let i = 0; i < waveCount; ++i) {
        const stepDx = dx * i;
        generatedWaveSvgPath += `Q ${stepDx + dx / 4} ${yMin}, ${stepDx + dx / 2} 50 T ${stepDx + dx} 50 `;
    }

    const themePrimaryColor = useTheme().palette.primary.main;
    const color = themePrimaryColor;

    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" className={"Wave-svg"} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" >
            <g filter="url(#dropshadow)">
                <path d={`M 0 0 L 0 50 ${generatedWaveSvgPath} L 100 50, 100 0 Z`} fill={color} />
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
        </svg>
    );
});
