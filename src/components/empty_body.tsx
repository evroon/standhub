import React from 'react';
import {
    createStyles,
    Title,
    Text,
    Button,
    Container,
    Group,
} from '@mantine/core';
import getItemColor from './util';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: getItemColor(theme),

        [theme.fn.smallerThan('sm')]: {
            fontSize: 120,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
}));

export function EmptyResults() {
    const {classes} = useStyles();

    return (
        <Container className={classes.root}>
            <div className={classes.label}></div>
            <Title className={classes.title}>No cards to show</Title>
            <Text
                color="dimmed"
                size="lg"
                align="center"
                className={classes.description}
            >
                There are no cards to show. Make sure you entered a valid API
                access token and check the filter in the sidebar.
            </Text>
            <Group position="center">
                <Button variant="subtle" size="md">
                    Show settings
                </Button>
            </Group>
        </Container>
    );
}
