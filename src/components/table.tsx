import React from 'react';
import {
    createStyles,
    Table,
    ScrollArea,
    UnstyledButton,
    Group,
    Text,
    Center,
    Anchor,
} from '@mantine/core';
import {getItemColor} from './util';
import {getFAIcon, ReasonBadge, RepoBadge} from './notification';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {regular, solid} from '@fortawesome/fontawesome-svg-core/import.macro';

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

export interface RowData {
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

function getSortIcon(sorted: boolean, reversed: boolean) {
    if (!sorted) {
        return <FontAwesomeIcon icon={solid('sort')} />;
    } else if (reversed) {
        return <FontAwesomeIcon icon={solid('sort-up')} />;
    }
    return <FontAwesomeIcon icon={solid('sort-down')} />;
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
                    <Center className={classes.icon}>
                        {getSortIcon(sorted, reversed)}
                    </Center>
                </Group>
            </UnstyledButton>
        </th>
    );
}

export default function GHTable(props: any) {
    const setSorting = (field: string) => {
        const reversed =
            field === props.sortBy ? !props.reverseSortDirection : true;
        props.sortDataAndReload(field, reversed);
    };

    const rows = props.data.map((row) => (
        <tr key={row.title}>
            <td>
                <Anchor<'a'> href={row.notificationUrl} lineClamp={1} size="sm">
                    {getFAIcon(row.notificationType)}
                    {row.title}
                </Anchor>
            </td>
            <td>
                <RepoBadge notification={row} />
            </td>
            <td>
                <ReasonBadge notification={row} />
            </td>
            <td>{row.lastUpdated}</td>
        </tr>
    ));

    return (
        <ScrollArea>
            <Table
                horizontalSpacing="md"
                verticalSpacing="xs"
                striped
                highlightOnHover
                sx={{tableLayout: 'fixed', minWidth: 700}}
            >
                <thead>
                    <tr>
                        <Th
                            sorted={props.sortBy === 'title'}
                            reversed={props.reverseSortDirection}
                            onSort={() => setSorting('title')}
                        >
                            <FontAwesomeIcon
                                icon={regular('message')}
                                style={{marginRight: 5}}
                            />
                            Title
                        </Th>
                        <Th
                            sorted={props.sortBy === 'repositoryName'}
                            reversed={props.reverseSortDirection}
                            onSort={() => setSorting('repositoryName')}
                        >
                            <FontAwesomeIcon
                                icon={regular('folder')}
                                style={{marginRight: 5}}
                            />
                            Repository
                        </Th>
                        <Th
                            sorted={props.sortBy === 'reason'}
                            reversed={props.reverseSortDirection}
                            onSort={() => setSorting('reason')}
                        >
                            <FontAwesomeIcon
                                icon={regular('circle-question')}
                                style={{marginRight: 5}}
                            />
                            Reason
                        </Th>
                        <Th
                            sorted={props.sortBy === 'lastUpdated'}
                            reversed={props.reverseSortDirection}
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
