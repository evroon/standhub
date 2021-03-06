import {solid} from '@fortawesome/fontawesome-svg-core/import.macro';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    Box,
    Button,
    Center,
    createStyles,
    Group,
    MultiSelect,
    SegmentedControl,
    Switch,
    Text,
    TextInput,
} from '@mantine/core';
import {Calendar, RangeCalendar} from '@mantine/dates';
import Settings from './settings';
import LightDarkSwitch from './theme_switch';
import {getDefaultTimeRange, getItemColor, getRepoSelectData} from './util';

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
    onSwitchChange: any;
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
                onChange={item.onSwitchChange}
                size="lg"
            />
        </Group>
    ));
}

function getCalendar(dates, setDates, selectMultipleDates) {
    if (selectMultipleDates) {
        return <RangeCalendar value={dates} onChange={setDates} />;
    }
    return <Calendar value={dates} onChange={setDates} />;
}

export default function GHNavbar(props: any) {
    const {classes} = useStyles();
    let dates = props.dates;

    function resetDates() {
        props.setDates(getDefaultTimeRange(props.selectMultipleDates));
    }

    const switchesConfig = [
        {
            title: 'Select multiple dates',
            description: 'Shows cards for more than one day',
            onSwitchChange: props.setSelectMultipleDates,
        },
        {
            title: 'Show all cards',
            description: 'Includes non-participating cards',
            onSwitchChange: props.setShowAllCards,
        },
    ];

    if (dates.constructor.name == 'Array' && !props.selectMultipleDates) {
        dates = props.dates[0];
    }

    return (
        <Group>
            <Center>
                {getCalendar(dates, props.setDates, props.selectMultipleDates)}
            </Center>
            <div style={{width: '100%'}}>
                <Button fullWidth variant="subtle" onClick={resetDates}>
                    Reset date
                </Button>
                <Text weight={700} style={{marginTop: 12, marginBottom: 8}}>
                    Options
                </Text>
                {getSwitches(switchesConfig)}
                <Text weight={700} style={{marginTop: 24}}>
                    View
                </Text>
                <SegmentedControl
                    style={{marginTop: 10}}
                    className={classes.switch}
                    value={props.viewType}
                    onChange={props.setViewType}
                    data={[
                        {
                            value: 'table',
                            label: (
                                <Center>
                                    <FontAwesomeIcon
                                        icon={solid('table')}
                                        style={{marginRight: 5}}
                                    />
                                    <Box ml={10}>Table</Box>
                                </Center>
                            ),
                        },
                        {
                            value: 'cards',
                            label: (
                                <Center>
                                    <FontAwesomeIcon
                                        icon={solid('grip')}
                                        style={{marginRight: 5}}
                                    />
                                    <Box ml={10}>Cards</Box>
                                </Center>
                            ),
                        },
                    ]}
                />
                <LightDarkSwitch />
            </div>
            <Text weight={700} style={{marginTop: 0}}>
                Filter
            </Text>
            <TextInput
                placeholder="Search by title"
                label="Search"
                mb="md"
                style={{width: '100%', marginBottom: 0}}
                onChange={props.setSearch}
                icon={
                    <FontAwesomeIcon
                        icon={solid('search')}
                        style={{marginRight: 5}}
                    />
                }
            />
            <MultiSelect
                data={getRepoSelectData(props.data)}
                label="Repositories"
                placeholder="Filter on repositories"
                style={{width: '100%'}}
                value={props.repoFilter}
                onChange={props.setRepoFilter}
            />
            <Button
                fullWidth
                loading={props.isLoading}
                onClick={props.renderPage}
            >
                Refresh
            </Button>
            <Settings />
        </Group>
    );
}
