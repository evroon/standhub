import {
    AppShell,
    Navbar,
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
} from '@mantine/core';
import {NotificationsProvider} from '@mantine/notifications';
import {useRef} from 'react';
import {useState} from 'react';
import Body from './components/body';
import GHNavbar from './components/navbar';

export default function App() {
    const setLoading = useRef(null);
    const [showAllCards, setShowAllCards] = useState(false);

    const today = new Date();
    const yesterday = new Date();
    today.setDate(today.getDate() - 0);
    yesterday.setDate(yesterday.getDate() - 1);

    const [dates, setDates] = useState<[Date, Date]>([yesterday, today]);

    function renderPage() {
        if (setLoading.current !== null) {
            setLoading.current(true);
        }
    }

    function setCalendarDates(selectedDates: any) {
        if (selectedDates.constructor.name == 'Date') {
            const dayAfter = new Date(selectedDates);
            dayAfter.setDate(dayAfter.getDate() + 1);
            setDates([selectedDates, selectedDates]);
        } else {
            setDates(selectedDates);
        }
        renderPage();
    }

    function setShowAllCardsAndReload(event: any) {
        renderPage();
        setShowAllCards(event.currentTarget.checked);
    }
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider withGlobalStyles theme={{colorScheme}}>
                <NotificationsProvider>
                    <AppShell
                        padding="md"
                        navbar={
                            <Navbar width={{base: 300}} p="xs">
                                <GHNavbar
                                    dates={dates}
                                    setDates={setCalendarDates}
                                    setShowAllCards={setShowAllCardsAndReload}
                                />
                            </Navbar>
                        }
                    >
                        <Body
                            dates={dates}
                            setLoading={setLoading}
                            showAllCards={showAllCards}
                        />
                    </AppShell>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
