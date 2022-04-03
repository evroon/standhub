import React from 'react';
import {
    MantineProvider,
    createStyles,
    Title,
    Text,
    Button,
    Container,
    Group,
} from '@mantine/core';
import {getItemColor} from './util';

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

export default function App404() {
    const {classes} = useStyles();

    return (
        <MantineProvider withGlobalStyles theme={{colorScheme: 'dark'}}>
            <Container className={classes.root}>
                <div className={classes.label}>404</div>
                <Title className={classes.title}>
                    You have found a secret place.
                </Title>
                <Text
                    color="dimmed"
                    size="lg"
                    align="center"
                    className={classes.description}
                >
                    Unfortunately, this is a 404 page. You may have mistyped the
                    address, or the page has been moved to another URL.
                </Text>
                <Group position="center">
                    <Button<'a'>
                        component="a"
                        color="indigo"
                        variant="subtle"
                        size="md"
                        href={process.env.PUBLIC_URL}
                    >
                        Take me back to home page
                    </Button>
                </Group>
            </Container>
        </MantineProvider>
    );
}
