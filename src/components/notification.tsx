import {useMantineTheme, Avatar, Badge} from '@mantine/core';
import {GHNotification} from '../interfaces';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid, regular} from '@fortawesome/fontawesome-svg-core/import.macro';

export function getIssueUrl(issueApiUrl: string) {
    if (issueApiUrl === null) return null;
    return issueApiUrl
        .replace('api.', '')
        .replace('repos/', '')
        .replace('pulls', 'pull');
}

export function getReasonIcon(notification: GHNotification) {
    const style = {marginRight: 10};
    return {
        review_requested: (
            <FontAwesomeIcon icon={solid('chalkboard-user')} style={style} />
        ),
        mention: <FontAwesomeIcon icon={solid('at')} style={style} />,
        team_mention: <FontAwesomeIcon icon={solid('at')} style={style} />,
        assign: <FontAwesomeIcon icon={solid('thumbtack')} style={style} />,
        subscribed: <FontAwesomeIcon icon={solid('bell')} style={style} />,
        author: <FontAwesomeIcon icon={solid('user')} style={style} />,
        comment: <FontAwesomeIcon icon={solid('comment')} style={style} />,
    }[notification.reason];
}

export function getReasonColor(reason: string) {
    return {
        review_requested: 'violet',
        mention: 'pink',
        team_mention: 'red',
        assign: 'green',
        subscribed: 'blue',
        author: 'yellow',
        comment: 'indigo',
    }[reason];
}

export function stringToColour(input: string) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
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

export function getAvatorForRepo(notification: any) {
    return (
        <Avatar
            alt={notification.repositoryName}
            radius="xl"
            size={24}
            mr={5}
            src={notification.ownerAvatarUrl}
        />
    );
}

export function getCardType(issueApiUrl: string) {
    return issueApiUrl.includes('issue') ? 'issue' : 'pull request';
}

export function getFAIcon(issueApiUrl: string) {
    const theme = useMantineTheme();
    if (getCardType(issueApiUrl) == 'issue') {
        return (
            <FontAwesomeIcon
                icon={regular('circle-dot')}
                style={{
                    marginRight: 10,
                    color: theme.colors.green[4],
                }}
            />
        );
    }

    return (
        <FontAwesomeIcon
            icon={solid('code-pull-request')}
            style={{marginRight: 10, color: theme.colors.green[5]}}
        />
    );
}

export function RepoBadge(props: any) {
    return (
        <Badge
            color={stringToColour(props.notification.repositoryName)}
            variant="light"
            radius="xl"
            style={{paddingLeft: 0}}
            leftSection={getAvatorForRepo(props.notification)}
        >
            {props.notification.repositoryName}
        </Badge>
    );
}

export function ReasonBadge(props: any) {
    return (
        <Badge
            color={getReasonColor(props.notification.reason)}
            variant="light"
        >
            {getReasonIcon(props.notification)}
            {props.notification.reason.replace('_', ' ')}
        </Badge>
    );
}
