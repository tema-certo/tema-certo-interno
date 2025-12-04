export function setIconLocation(position, icon, text, gap) {
    if (!icon) return text;

    const gapClasses = {
        '1': 'gap-1',
        '1.5': 'gap-1.5',
        '2': 'gap-2',
        '2.5': 'gap-2.5',
        '4': 'gap-4',
        '8': 'gap-8',
        '16': 'gap-16',
    };


    return (
        <div className={`flex items-center ${gapClasses[gap] || 'gap-2'}`}>
            {(position === 'left' || !position) && icon}
            {text}
            {position === 'right' && icon}
        </div>
    );
}

export function setExtraClass(defaultClass, extraClass) {
    return extraClass && extraClass.length ? [defaultClass, ...extraClass] : defaultClass;
}
