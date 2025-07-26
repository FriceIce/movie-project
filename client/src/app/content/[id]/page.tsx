import React from 'react';

type Props = {
    params: {
        id: string;
    };
};
const Content = ({ params }: Props) => {
    return <div>Content/{params.id + ' '} Page</div>;
};

export default Content;
