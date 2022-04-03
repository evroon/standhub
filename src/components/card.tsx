import {
    Card,
    Text,
    Button,
    Grid,
    useMantineTheme,
    Group,
    Divider,
} from '@mantine/core';
import {GHNotification} from '../interfaces';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {regular} from '@fortawesome/fontawesome-svg-core/import.macro';
import {
    getCardType,
    getFAIcon,
    ReasonBadge,
    RepoBadge,
} from './notification';

function getIssueUrl(issueApiUrl: string) {
    return issueApiUrl
        .replace('api.', '')
        .replace('repos/', '')
        .replace('pulls', 'pull');
}

export default function githubCard(row: GHNotification) {
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
                            <RepoBadge notification={row} />
                            <ReasonBadge notification={row} />
                        </Group>
                    </Grid.Col>
                    <Grid.Col
                        span={12}
                        style={{position: 'absolute', bottom: 0, width: '100%'}}
                    >
                        <Divider my="sm" style={{marginBottom: 4}} />
                        <Text
                            color="dimmed"
                            size="sm"
                            style={{marginLeft: 8, marginBottom: 8}}
                        >
                            <FontAwesomeIcon
                                icon={regular('clock')}
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
