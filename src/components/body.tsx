import {useEffect, useState} from 'react';
import {Grid} from '@mantine/core';
import {GHNotification} from '../interfaces';
import {getNotifications} from '../adapter';
import {showNotification} from '@mantine/notifications';
import {EmptyResults} from './empty_body';
import githubCard from './card';

export default function Body(props: any) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<GHNotification[]>([]);

    useEffect(() => {
        props.setLoading.current = setLoading;
    }, []);

    const fetchData = () => {
        const before = new Date(props.dates[1]);
        const since = new Date(props.dates[0]);
        if (before !== null) {
            before.setDate(before.getDate() + 1);
        }

        // Make a request for a user with a given ID
        getNotifications(before, since, props.showAllCards)
            .then(function (response: any) {
                setData(response.data);
            })
            .catch(function (error: any) {
                showNotification({
                    title: 'Error occurred',
                    message: 'An error occurred while connecting to Github',
                    color: 'red',
                });
            });
    };

    if (loading) {
        fetchData();
        setLoading(false);
    }

    let content: any = data.map((row: GHNotification) => githubCard(row));
    if (data.length < 1) {
        content = <EmptyResults />;
    }

    return <Grid>{content}</Grid>;
}
