import {createStyles, Divider, Group, Switch, Text} from '@mantine/core';
import {RangeCalendar} from '@mantine/dates';
import Settings from './settings';

function getItemColor(theme) {
    const darkTheme = theme.colorScheme === 'dark';
    return darkTheme ? theme.colors.dark[4] : theme.colors.gray[2];
}

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    item: {
        '& + &': {
            paddingTop: theme.spacing.sm,
            marginTop: theme.spacing.sm,
            borderTop: `1px solid ${getItemColor(theme)}`,
        },
    },
    switch: {
        '& *': {
            cursor: 'pointer',
        },
    },

    title: {
        lineHeight: 1,
    },
}));

interface SwitchesCardProps {
    title: string;
    description: string;
}

function getSwitches(data: SwitchesCardProps[]) {
    const {classes} = useStyles();
    return data.map((item) => (
        <Group
            position="apart"
            key={item.title}
            className={classes.item}
            noWrap
            spacing="xl"
        >
            <div>
                <Text>{item.title}</Text>
                <Text size="xs" color="dimmed">
                    {item.description}
                </Text>
            </div>
            <Switch
                onLabel="ON"
                offLabel="OFF"
                className={classes.switch}
                size="lg"
            />
        </Group>
    ));
}

export default function GHNavbar(props: any) {
    const data = [
        {
            title: 'Show all cards',
            description: 'Test',
        },
    ];

    return (
        <Group>
            <RangeCalendar value={props.dates} onChange={props.setDates} />
            <Divider my="sm" style={{marginBottom: 8}} />
            <div style={{width: '100%'}}>{getSwitches(data)}</div>
            <Settings />
        </Group>
    );
}
