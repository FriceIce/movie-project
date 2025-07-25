import React from 'react';
import { Prop } from './Top1Icon';

function Top4Icon({ height, color }: Prop) {
    return (
        <svg
            id="rank-4"
            width="100%"
            height={height}
            viewBox="0 0 81 154"
            className="svg-icon svg-icon-rank-4 top-10-rank"
        >
            <path
                stroke={color}
                strokeWidth="4"
                d="M72 152h35.333v-30.977H128V92.497h-20.667V2H69.89L2 92.712v28.311h70V152zM36.202 92.188l35.93-47.998v47.998h-35.93z"
            ></path>
        </svg>
    );
}

export default Top4Icon;
