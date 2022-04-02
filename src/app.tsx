import {AppShell, Navbar, MantineProvider} from '@mantine/core';
import {NotificationsProvider} from '@mantine/notifications';
import {useRef} from 'react';
import {useState} from 'react';
import Body from './components/body';
import GHNavbar from './components/navbar';

function App() {
    const childFunc = useRef(null);

    const today = new Date();
    const yesterday = new Date();
    today.setDate(today.getDate() - 1);
    yesterday.setDate(yesterday.getDate() - 4);

    const [dates, setDates] = useState<[Date, Date]>([yesterday, today]);

    function setCalendarDates(value: [Date, Date]) {
        if (childFunc.current !== null) {
            childFunc.current(value);
        }
        setDates(value);
    }

    return (
        <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles>
            <NotificationsProvider>
                <AppShell
                    padding="md"
                    navbar={
                        <Navbar width={{base: 300}} p="xs">
                            <GHNavbar
                                dates={dates}
                                setDates={setCalendarDates}
                            />
                        </Navbar>
                    }
                >
                    <Body dates={dates} childFunc={childFunc} />
                </AppShell>
            </NotificationsProvider>
        </MantineProvider>
    );
}

export default App;
