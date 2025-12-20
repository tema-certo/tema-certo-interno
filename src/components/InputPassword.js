import { useCallback, useState } from 'react';

import Input from '@/components/Input';
import { EyeClosedIcon, EyeOpenIcon, LockClosedIcon } from '@radix-ui/react-icons';

export function InputPassword({
    control, size,
    radius, placeholder,
    color, label,
    name, id,
    ...props
}) {
    const [pwdIco, setPwdIco] = useState(true);

    const handleExtraIconClick = useCallback(() => {
        setPwdIco(!pwdIco);
    }, [pwdIco]);

    const validateTypeIco = useCallback(() => {
        return pwdIco ? 'password' : 'text';
    }, [pwdIco]);

    const extraIcon = useCallback(() => {
        return pwdIco ? <EyeClosedIcon/> : <EyeOpenIcon/>;
    }, [pwdIco]);

    return (
        <Input.Field
            control={control}
            placeholder={placeholder}
            size={size}
            radius={radius}
            required
            color={color}
            label={label}
            name={name}
            id={id}
            icon={<LockClosedIcon/>}
            type={validateTypeIco()}
            onClickExtra={handleExtraIconClick}
            extraIcon={extraIcon()}
            {...props}
        />
    );
}
