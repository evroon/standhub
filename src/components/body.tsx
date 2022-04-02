import {useEffect, useState} from 'react';
import {
    Card,
    Text,
    Badge,
    Button,
    Grid,
    useMantineTheme,
    Avatar,
    Group,
    Divider,
} from '@mantine/core';
import {GHNotification, GHNotificationRepository} from '../interfaces';
import {getNotifications} from '../adapter';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid, regular} from '@fortawesome/fontawesome-svg-core/import.macro';
import {showNotification} from '@mantine/notifications';
import {EmptyResults} from './empty_body';

function getReasonColor(reason: string) {
    return {
        review_requested: 'violet',
        mention: 'pink',
        team_mention: 'red',
        assign: 'green',
        subscribed: 'blue',
        author: 'lime',
        comment: 'indigo',
    }[reason];
}

function stringToColour(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
        'pink',
        'violet',
        'green',
        'blue',
        'red',
        'grape',
        'indigo',
        'cyan',
        'orange',
        'yellow',
        'teal',
    ];
    return colors[Math.abs(hash) % colors.length];
}

function getAvatorForRepo(repository: GHNotificationRepository) {
    return (
        <Avatar
            alt={repository.name}
            radius="xl"
            size={24}
            mr={5}
            src={repository.owner.avatar_url}
        />
    );
}

function getCardType(issueApiUrl: string) {
    return issueApiUrl.includes('issue') ? 'issue' : 'pull request';
}

function getCardColor(issueApiUrl: string, basicName: boolean = true) {
    const theme = useMantineTheme();
    if (getCardType(issueApiUrl) == 'issue') {
        return basicName ? 'cyan' : theme.colors.cyan[4];
    }

    return basicName ? 'green' : theme.colors.green[4];
}

function getFAIcon(issueApiUrl: string) {
    if (getCardType(issueApiUrl) == 'issue') {
        return (
            <FontAwesomeIcon
                icon={regular('circle-dot')}
                style={{
                    marginRight: 10,
                    color: getCardColor(issueApiUrl, false),
                }}
            />
        );
    }

    return (
        <FontAwesomeIcon
            icon={solid('code-pull-request')}
            style={{marginRight: 10, color: getCardColor(issueApiUrl, false)}}
        />
    );
}

function getIssueUrl(issueApiUrl: string) {
    return issueApiUrl
        .replace('api.', '')
        .replace('repos/', '')
        .replace('pulls', 'pull');
}

function githubCard(row: GHNotification) {
    if (row.reason === 'ci_activity') {
        return;
    }
    const theme = useMantineTheme();
    return (
        <Grid.Col xs={12} md={6} lg={3} xl={2} key={row.id}>
            <Card shadow="sm" p="lg" style={{minHeight: 250}}>
                <Grid justify="center" align="flex-end">
                    <Grid.Col span={12}>
                        <div>
                            <Text lineClamp={4} weight={500}>
                                {getFAIcon(row.subject.url)}
                                {row.subject.title}
                            </Text>
                        </div>
                        <Group
                            position="left"
                            style={{
                                marginBottom: 5,
                                marginTop: theme.spacing.sm,
                            }}
                        >
                            <Badge
                                color={stringToColour(row.repository.name)}
                                variant="light"
                                radius="xl"
                                style={{paddingLeft: 0}}
                                leftSection={getAvatorForRepo(row.repository)}
                            >
                                {row.repository.name}
                            </Badge>
                            <Badge
                                color={getReasonColor(row.reason)}
                                variant="light"
                            >
                                {row.reason}
                            </Badge>
                        </Group>
                    </Grid.Col>
                    <Grid.Col
                        span={12}
                        style={{position: 'absolute', bottom: 0, width: '100%'}}
                    >
                        <Divider my="sm" style={{marginBottom: 8}} />
                        <Text
                            color="dimmed"
                            style={{marginLeft: 8, marginBottom: 8}}
                        >
                            <FontAwesomeIcon
                                icon={solid('clock')}
                                style={{marginRight: 5}}
                            />
                            Last updated:{' '}
                            {new Date(row.last_read_at).toLocaleString()}
                        </Text>
                        <Button<'a'>
                            component="a"
                            color="indigo"
                            fullWidth
                            href={getIssueUrl(row.subject.url)}
                        >
                            View {getCardType(row.subject.url)}
                        </Button>
                    </Grid.Col>
                </Grid>
            </Card>
        </Grid.Col>
    );
}

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
