interface Props {
    responses: string[];
}
export function Responses(props: Props) {
    return (
        <div className="flex flex-col flex-1">
            {props.responses.map((response, i) => (
                <div key={i}>{response}</div>
            ))}
        </div>
    );
}
