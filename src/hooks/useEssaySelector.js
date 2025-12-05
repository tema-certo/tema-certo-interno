import { useCallback, useState } from 'react';

export default function useSelector() {
    const [value, setSelected] = useState(null);

    const onSelect = useCallback((v) => {
        return setSelected(v);
    }, []);

    const clearSelect = useCallback(() => {
        return setSelected(null);
    }, []);

    return {
        onSelect,
        clearSelect,
        value,
    };
}
