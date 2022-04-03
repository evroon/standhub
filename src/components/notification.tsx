import {useMantineTheme, Avatar, Badge} from '@mantine/core';
import {GHNotificationRepository} from '../interfaces';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {solid, regular} from '@fortawesome/fontawesome-svg-core/import.macro';

export function getReasonColor(reason: string) {
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

export function stringToColour(str: string) {
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

export function getAvatorForRepo(repository: GHNotificationRepository) {
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
            color={stringToColour(props.notification.repository.name)}
            variant="light"
            radius="xl"
            style={{paddingLeft: 0}}
            leftSection={getAvatorForRepo(props.notification.repository)}
        >
            {props.notification.repository.name}
        </Badge>
    );
}

export function ReasonBadge(props: any) {
    return (
        <Badge
            color={getReasonColor(props.notification.reason)}
            variant="light"
        >
            {props.notification.reason.replace('_', ' ')}
        </Badge>
    );
}
