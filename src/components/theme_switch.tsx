import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Box,
    Center,
    SegmentedControl,
    useMantineColorScheme,
} from '@mantine/core';

export default function LightDarkSwitch() {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();

    return (
        <SegmentedControl
            value={colorScheme}
            onChange={toggleColorScheme}
            style={{marginTop: 12}}
            data={[
                {
                    value: 'light',
                    label: (
                        <Center>
                            <FontAwesomeIcon
                                icon={solid('sun')}
                                style={{marginRight: 5}}
                            />
                            <Box ml={10}>Light</Box>
                        </Center>
                    ),
                },
                {
                    value: 'dark',
                    label: (
                        <Center>
                            <FontAwesomeIcon
                                icon={solid('moon')}
                                style={{marginRight: 5}}
                            />
                            <Box ml={10}>Dark</Box>
                        </Center>
                    ),
                },
            ]}
        />
    );
}
