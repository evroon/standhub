import {Button, Modal, PasswordInput, Text} from '@mantine/core';
import {useState} from 'react';
import {getGHToken, setGHToken} from '../storage';

export default function Settings() {
    const [settings, setSettings] = useState(() => {
        return getGHToken();
    });

    const [opened, setOpened] = useState(false);

    function saveSettings() {
        setGHToken(settings);
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Settings"
            >
                <Text size="md" style={{marginBottom: 15}}>
                    These settings are stored locally in your browser (using
                    local storage).
                    <br />
                    Create an access token here:
                    <br />
                    <Text
                        variant="link"
                        component="a"
                        size="sm"
                        href="https://github.com/settings/tokens/new"
                    >
                        https://github.com/settings/tokens/new
                    </Text>
                </Text>
                <PasswordInput
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    label="Github API access token"
                    description="https://github.com/settings/tokens/new"
                    value={settings}
                    onChange={(e) => setSettings(e.target.value)}
                    required
                />

                <Button
                    fullWidth
                    style={{marginTop: 10}}
                    color="green"
                    onClick={saveSettings}
                >
                    Save
                </Button>
            </Modal>

            <Button fullWidth onClick={() => setOpened(true)} color="blue">
                Open Settings
            </Button>
        </>
    );
}
