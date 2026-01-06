import { useMemo } from 'react';

import UserData from '@/app/interno/perfil/domains/UserData';
import SegmentedControl from '@/components/SegmentedControl';
import Text from '@/components/Text';
import { PersonIcon } from '@radix-ui/react-icons';
import { CrownIcon } from 'lucide-react';

export default function StateSelector() {
    const tabList = useMemo(() => {
        return [
            {
                value: 'user-data',
                label: <Text text={'Meus dados'} size={'3'} icon={<PersonIcon width={18} height={18}/>} />,
            },
	        {
		        value: 'user-plan',
		        label: <Text text={'Meu plano'} size={'3'} icon={<CrownIcon width={18} height={18}/>} />,
	        },
        ];
    }, []);

    const tabContent = useMemo(() => {
        return [
            {
                value: 'user-data',
                content: <UserData/>,
            },
	        {
		        value: 'user-plan',
		        content: <div>Meu plano</div>,
	        },
        ];
    }, []);

    return (
        <div>
            <SegmentedControl
                tabList={tabList}
                tabContent={tabContent}
                lateral
                defaultValue={'user-data'}
            />
        </div>
    );
}
