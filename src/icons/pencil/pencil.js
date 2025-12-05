export default function PencilIcon({
    width = 12,
    height = 12,
    color = 'currentColor',
}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none"
            stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="feather feather-edit-3">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
    );
};
