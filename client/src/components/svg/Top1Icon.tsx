import React from 'react';

export type Prop = {
    height: string;
    color: string;
};

function Top1Icon({ height, color }: Prop) {
    return (
        <svg
            id="rank-1"
            width="100%"
            height={height}
            viewBox="-20 0 70 154"
            className="svg-icon svg-icon-rank-1 top-10-rank"
        >
            <path
                stroke={color}
                strokeWidth="4"
                d="M35.377 152H72V2.538L2 19.362v30.341l33.377-8.459V152z"
            ></path>
        </svg>
    );
}

export default Top1Icon;
