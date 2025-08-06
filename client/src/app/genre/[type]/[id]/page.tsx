type Props = {
    params: {
        type: string;
        id: string;
    };
};

function page({ params }: Props) {
    const { type, id } = params;

    return (
        <div>
            {type} / {id}
        </div>
    );
}

export default page;
