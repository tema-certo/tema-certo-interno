import Text from '@/components/Text';
import { FileTextIcon } from '@radix-ui/react-icons';

import styles from './FinalBadgeHtmls.module.css';

export default function FinalBadgeHtmls({
    selectedEssay,
}) {
    return (
        <div className="w-full min-w-0">
            <div className="flex gap-2 items-start min-w-0">
                <div className={styles.iconFile}>
                    <FileTextIcon width={20} height={20} />
                </div>
                <div className={styles.containerTitleDesc}>
                    <Text
                        text={selectedEssay?.title}
                        color="gray"
                        type="4"
                        isTitle
                        classNames={styles.essayTitle}
                    />
                    <Text
                        text={selectedEssay?.description}
                        as="p"
                        color="gray"
                        size="1"
                        className={styles.essayDesc}
                    />
                </div>
            </div>
        </div>
    );
}
