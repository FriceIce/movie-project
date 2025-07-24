import React from 'react';
import { Prop } from './Top1Icon';

function Top7Icons({ height, color }: Prop) {
    return (
        <svg
            id="rank-7"
            viewBox="0 0 78 154"
            width="100%"
            height={height}
            className="svg-icon svg-icon-rank-7 top-10-rank"
        >
            <path
                stroke={color}
                strokeWidth="4"
                d="M113,2 L2,2 L2,33.4022989 L75.9665929,33.4022989 L21.22571,152 L60.28102,152 L113,32.7672283 L113,2 Z"
            ></path>
        </svg>
    );
}

export default Top7Icons;
