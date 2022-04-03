import React, {useState} from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    TextInput,
} from '@mantine/core';
import {getItemColor} from './util';
import {GHNotification} from '../interfaces';
import {getCardType, getFAIcon, ReasonBadge, RepoBadge} from './notification';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {regular} from '@fortawesome/fontawesome-svg-core/import.macro';

const useStyles = createStyles((theme) => ({
    th: {
        padding: '0 !important',
    },

    control: {
        'width': '100%',
        'padding': `${theme.spacing.xs}px ${theme.spacing.md}px`,
        '&:hover': {
            backgroundColor: getItemColor(theme),
        },
    },

    icon: {
        width: 21,
        height: 21,
        borderRadius: 21,
    },
}));

interface RowData {
    title: string;
    repositoryName: string;
    notificationType: string;
    lastUpdated: string;
    reason: string;
    url: string;
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort(): void;
}

function Th({children, reversed, sorted, onSort}: ThProps) {
    const {classes} = useStyles();
    return (
        <th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group position="apart">
                    <Text weight={500} size="sm">
                        {children}
                    </Text>
                </Group>
            </UnstyledButton>
        </th>
    );
}

function filterData(data: RowData[], search: string) {
    const keys = Object.keys(data[0]);
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(query)),
    );
}

function sortData(
    data: RowData[],
    payload: {sortBy: keyof RowData; reversed: boolean; search: string},
) {
    if (!payload.sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[payload.sortBy].localeCompare(a[payload.sortBy]);
            }

            return a[payload.sortBy].localeCompare(b[payload.sortBy]);
        }),
        payload.search,
    );
}

export default function GHTable(props: any) {
    const notifications: GHNotification[] = props.data;

    const data: any = notifications.map((notification) => {
        return {
            title: notification.subject.title,
            repositoryName: notification.repository.name,
            lastUpdated: new Date(notification.last_read_at).toLocaleString(),
            notificationType: getCardType(notification.subject.url),
            rawNotification: notification,
            reason: notification.reason,
        };
    });

    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, {sortBy: field, reversed, search}));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        setSearch(value);
        setSortedData(
            sortData(data, {
                sortBy,
                reversed: reverseSortDirection,
                search: value,
            }),
        );
    };

    const rows = sortedData.map((row) => (
        <tr key={row.name}>
            <td>
                <Text lineClamp={1} size="sm">
                    {getFAIcon(row.notificationType)} {row.title}
                </Text>
            </td>
            <td>
                <RepoBadge notification={row.rawNotification} />
            </td>
            <td>
                <ReasonBadge notification={row.rawNotification} />
            </td>
            <td>{row.lastUpdated}</td>
        </tr>
    ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                value={search}
                onChange={handleSearchChange}
            />
            <Table
                horizontalSpacing="md"
                verticalSpacing="xs"
                sx={{tableLayout: 'fixed', minWidth: 700}}
            >
                <thead>
                    <tr>
                        <Th
                            sorted={sortBy === 'title'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('title')}
                        >
                            <FontAwesomeIcon
                                icon={regular('message')}
                                style={{marginRight: 5}}
                            />
                            Title
                        </Th>
                        <Th
                            sorted={sortBy === 'repositoryName'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('repositoryName')}
                        >
                            <FontAwesomeIcon
                                icon={regular('folder')}
                                style={{marginRight: 5}}
                            />
                            Repository
                        </Th>
                        <Th
                            sorted={sortBy === 'reason'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('reason')}
                        >
                            <FontAwesomeIcon
                                icon={regular('circle-question')}
                                style={{marginRight: 5}}
                            />
                            Reason
                        </Th>
                        <Th
                            sorted={sortBy === 'lastUpdated'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('lastUpdated')}
                        >
                            <FontAwesomeIcon
                                icon={regular('clock')}
                                style={{marginRight: 5}}
                            />
                            Last updated
                        </Th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </ScrollArea>
    );
}
