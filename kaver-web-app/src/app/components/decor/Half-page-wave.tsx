import * as React from "react";

interface IProps {
    amplitude: number;
    waveCount: number;
    color: string;
}

export const HalfPageWave: React.FC<IProps> = ({ amplitude, waveCount, color }) => {
    let generatedWaveSvgPath = "";
    for (let i = 0; i < waveCount; ++i) {
        const y = 50 - amplitude;
        const dx = 100 / waveCount;
        generatedWaveSvgPath += `Q ${((dx * i) + (dx / 4)).toString()} ${y}, ${((dx * i) + (dx / 2)).toString()} 50
      T ${((dx * i) + dx).toString()} 50 `;
    }
    return (<svg width="100%" height="100%" viewBox="0 0 100 100" className="Background-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" >
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
