import Text from '@/components/Text';
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { setIconLocation } from '@/helpers';
import PropTypes from 'prop-types';

import styles from './Select.module.css';

export default function Select({
    position,
    labelIcon,
    gapSize,
    label,
    options,
    uiLabel,
    sizeUiLabel,
    positionContent = 'popper',
    ...props
}) {
    return (
        <ShadcnSelect {...props}>
            <div className={styles.select}>
                {uiLabel && (
                    <div>
                        <Text
                            text={uiLabel}
                            size={sizeUiLabel || '3'}
                            color={'gray'}
                        />
                    </div>
                )}
                <SelectTrigger
                    className={styles.trigger}
                >
                    <SelectValue
                        placeholder={setIconLocation(position, labelIcon, label, gapSize)}
                        className={styles.value}
                    />
                </SelectTrigger>
                <SelectContent className={styles.content} position={positionContent}>
                    <SelectGroup>
                        <SelectLabel>{label}</SelectLabel>
                        {options.map((item) => (
                            <SelectItem key={item.value} value={item.value} className={styles.item}>
                                {setIconLocation(item?.position, item?.icon, item.label, item?.gapSize)}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </div>
        </ShadcnSelect>
    );
}

Select.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
};
