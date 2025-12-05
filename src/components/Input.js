import { useCallback, useState } from 'react';

import { setExtraClass, setIconLocation } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import { EyeClosedIcon, EyeOpenIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { IconButton, TextField } from '@radix-ui/themes';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

import styles from './Input.module.css';

export default function Input({
    icon,
    size,
    radius,
    side, // Btn side do radix
    placeholder,
    color,
    id,
    name,
    label,
    extraIcon,
    onClickExtra,
    error,
    ...props
}) {
    const classNames = useClassNames(setExtraClass('inputDefault',
        [
            error && styles.error,
        ],
    ));

    return (
        <div className={styles.container}>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <TextField.Root
                placeholder={placeholder}
                size={size}
                radius={radius}
                side={side}
                color={color}
                className={classNames}
                id={id}
                name={name}
                {...props}
            >
                <TextField.Slot side={side}>
                    {icon && icon}
                </TextField.Slot>
                <TextField.Slot side={side}>
                    {extraIcon && (
                        <IconButton variant="ghost" color="gray" asChild className={styles.extraIcon}>
                            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                            <div onClick={onClickExtra}>
                                {extraIcon}
                            </div>
                        </IconButton>
                    )}
                </TextField.Slot>
            </TextField.Root>
        </div>
    );
};

Input.Field = function Field({
    control,
    name,
    render,
    required,
    ...props
}) {
    const FieldRender = useCallback(({ field, fieldState }) => {
        return <Input {...props} {...field} error={fieldState?.error} />;
    }, [props]);


    return (
        <Controller
            name={name}
            control={control}
            /* eslint-disable-next-line react-perf/jsx-no-new-object-as-prop */
            rules={{
                ...(required ? { required: 'Este campo é obrigatório.' } : {}),
            }}

            /* eslint-disable-next-line react/jsx-no-bind */
            render={({
                field,
                fieldState,
            }) => <FieldRender field={field} fieldState={fieldState} />}
        >
        </Controller>
    );
};



Input.propTypes = {
    icon: PropTypes.node,
    size: PropTypes.oneOf(['1', '2', '3']),
    placeholder: PropTypes.string,
    variant: PropTypes.oneOf(['classic', 'surface', 'soft']),
    radius: PropTypes.oneOf(['none', 'small', 'medium', 'large', 'full']),
    side: PropTypes.oneOf(['left', 'right']),
};
