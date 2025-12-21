import { useCallback } from 'react';

import Button from '@/components/Button';
import Icons from '@/icons/icons';

import styles from './ButtonsEssayModal.module.css';

export default function ButtonsEssayModal({
    onCancel,
    onClick,
}) {
    return (
        <div className={styles.containerButtons}>
            <Button
                text={'Cancelar'}
                variant={'surface'}
                color={'gray'}
                size={'3'}
                onClick={onCancel}
            />
            <Button
                text={'Começar a escrever'}
                icon={<Icons.PencilIcon width={16} height={16} />}
                variant={'classic'}
                color={'blue'}
                size={'3'}
                onClick={onClick}
            />
        </div>
    );
}
