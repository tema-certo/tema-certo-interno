import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { setExtraClass } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';

import styles from './SegmentedControl.module.css';

export default function SegmentedControl({
    tabList,
    tabContent,
    defaultValue,
    ...props
}) {
    const lateralClassName = useClassNames([
        props.lateral && styles.lateral,
    ]);

    return (
        <Tabs
            defaultValue={defaultValue}
            className={lateralClassName}
            {...props}
        >
            <TabsList className={styles.tabsList}>
                {tabList.map((item) => (
                    <TabsTrigger
                        key={item.value}
                        value={item.value}
                        className={styles.tabsTrigger}
                    >
                        {item.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabContent.map((item) => (
                <TabsContent
                    key={item.value}
                    value={item.value}
                >
                    {item.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}
