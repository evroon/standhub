import {useEffect, useState} from 'react';
import {Grid} from '@mantine/core';
import {GHNotification} from '../interfaces';
import {getNotifications} from '../adapter';
import {showNotification} from '@mantine/notifications';
import {EmptyResults} from './empty_body';
import githubCard from './card';
import GHTable, {RowData} from './table';
import {getCardType, getIssueUrl} from './notification';

function convertData(data: any) {
    return data.map((notification) => {
        if (notification.reason === 'ci_activity') return null;
        return {
            title: notification.subject.title,
            repositoryName: notification.repository.name,
            lastUpdated: new Date(notification.last_read_at).toLocaleString(),
            notificationType: getCardType(notification.subject.url),
            notificationUrl: getIssueUrl(notification.subject.url),
            rawNotification: notification,
            ownerAvatarUrl: notification.repository.owner.avatar_url,
            reason: notification.reason,
        };
    });
}

function filterData(data: any, search: string, repoFilter: string[]) {
    return data.filter(
        (notification) =>
            notification.title
                .toLowerCase()
                .includes(search.trim().toLowerCase()) &&
            (repoFilter.length === 0 ||
                repoFilter.includes(notification.repositoryName)),
    );
}

function sortData(
    data: RowData[],
    payload: {sortBy: string; reversed: boolean},
) {
    if (!payload.sortBy) {
        return data;
    }

    return [...data].sort((a, b) => {
        const compare = a[payload.sortBy].localeCompare(b[payload.sortBy], {
            sensitivity: 'base',
        });
        return payload.reversed ? compare : 1 - compare;
    });
}

export default function Body(props: any) {
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<string>('title');
    const [reverseSortDirection, setReverseSortDirection] = useState(true);

    useEffect(() => {
        props.setLoading.current = setLoading;
    }, []);

    function sortDataAndReload(
        newSortBy: string,
        newReverseSortDirection: boolean,
    ) {
        setReverseSortDirection(newReverseSortDirection);
        setSortBy(newSortBy);
        props.setData(
            sortData(props.data, {
                sortBy: newSortBy,
                reversed: newReverseSortDirection,
            }),
        );
    }

    const fetchData = () => {
        props.setIsLoading(true);
        const before = new Date(props.dates[1]);
        const since = new Date(props.dates[0]);

        // We want to include the last day selected.
        if (before !== null) {
            before.setDate(before.getDate() + 1);
        }

        // Make a request for a user with a given ID
        getNotifications(before, since, props.showAllCards)
            .then(function (response: any) {
                props.setData(
                    sortData(convertData(response.data), {
                        sortBy: sortBy,
                        reversed: reverseSortDirection,
                    }),
                );
            })
            .catch(function (error: any) {
                showNotification({
                    title: 'Error occurred',
                    message:
                        'An error occurred while connecting to Github' + error,
                    color: 'red',
                });
            })
            .then(function () {
                props.setIsLoading(false);
            });
    };

    if (loading) {
        fetchData();
        setLoading(false);
    }

    const filteredData = filterData(props.data, props.search, props.repoFilter);
    let content: any;

    if (filteredData.length === 0) {
        content = <EmptyResults />;
    } else if (props.viewType == 'table') {
        content = (
            <GHTable
                data={filteredData}
                setData={props.setData}
                sortBy={sortBy}
                sortDataAndReload={sortDataAndReload}
                reverseSortDirection={reverseSortDirection}
            />
        );
    } else {
        content = filteredData.map((row: GHNotification) => githubCard(row));
    }

    return <Grid>{content}</Grid>;
}
