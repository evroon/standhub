import {
    AppShell,
    Navbar,
    MantineProvider,
    ColorSchemeProvider,
    ColorScheme,
    Header,
    MediaQuery,
    Burger,
    Text,
    useMantineTheme,
    ScrollArea,
} from '@mantine/core';
import {NotificationsProvider} from '@mantine/notifications';
import {useRef} from 'react';
import {useState} from 'react';
import Body from './components/body';
import GHNavbar from './components/navbar';
import {getDefaultTimeRange} from './components/util';
import {GHNotification} from './interfaces';

export default function App() {
    const setLoading = useRef(null);
    const [showAllCards, setShowAllCards] = useState(false);
    const [repoFilter, setRepoFilter] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [viewType, setViewType] = useState('cards');

    const [selectMultipleDates, setSelectMultipleDates] = useState(false);
    const [yesterday, today] = getDefaultTimeRange(selectMultipleDates);
    const [dates, setDates] = useState<[Date, Date]>([yesterday, today]);
    const [search, setSearch] = useState('');
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const [data, setDataRaw] = useState<GHNotification[]>([]);
    const [navBarOpened, setNavBarOpened] = useState(false);

    const theme = useMantineTheme();

    function setData(data) {
        // Remove repos from the repo filter that are not in the current data
        const repos = data.map((row) => row.repositoryName);
        setRepoFilter(repoFilter.filter((repo) => repos.includes(repo)));
        setDataRaw(data);
    }

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
        setShowAllCards(event.currentTarget.checked);
        renderPage();
    }

    function setSelectMultipleDatesAndReload(event: any) {
        setSelectMultipleDates(event.currentTarget.checked);

        if (!event.currentTarget.checked) {
            const max = new Date(dates[0]);
            max.setDate(dates[0].getDate() + 0);
            setDates([dates[0], max]);
        }
        renderPage();
    }

    function setSearchAndReload(event: any) {
        setSearch(event.currentTarget.value);
    }

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
                        navbarOffsetBreakpoint="sm"
                        fixed
                        navbar={
                            <Navbar
                                p="md"
                                hiddenBreakpoint="sm"
                                hidden={!navBarOpened}
                                width={{sm: 300, lg: 300}}
                            >
                                <ScrollArea
                                    type="scroll"
                                    offsetScrollbars={true}
                                    style={{paddingRight: 12, marginRight: -12}}
                                    scrollbarSize={6}
                                >
                                    <GHNavbar
                                        dates={dates}
                                        setDates={setCalendarDates}
                                        setShowAllCards={
                                            setShowAllCardsAndReload
                                        }
                                        selectMultipleDates={
                                            selectMultipleDates
                                        }
                                        setSelectMultipleDates={
                                            setSelectMultipleDatesAndReload
                                        }
                                        viewType={viewType}
                                        setViewType={setViewType}
                                        search={search}
                                        setSearch={setSearchAndReload}
                                        isLoading={isLoading}
                                        renderPage={renderPage}
                                        data={data}
                                        repoFilter={repoFilter}
                                        setRepoFilter={setRepoFilter}
                                    />
                                </ScrollArea>
                            </Navbar>
                        }
                        header={
                            <Header height={70} p="md">
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        height: '100%',
                                    }}
                                >
                                    <MediaQuery
                                        largerThan="md"
                                        styles={{display: 'none'}}
                                    >
                                        <Burger
                                            opened={navBarOpened}
                                            onClick={() =>
                                                setNavBarOpened((o) => !o)
                                            }
                                            size="sm"
                                            color={theme.colors.gray[6]}
                                            mr="xl"
                                        />
                                    </MediaQuery>
                                    <Text>Standhub</Text>
                                </div>
                            </Header>
                        }
                    >
                        <Body
                            dates={dates}
                            setLoading={setLoading}
                            showAllCards={showAllCards}
                            selectMultipleDates={selectMultipleDates}
                            viewType={viewType}
                            search={search}
                            setIsLoading={setIsLoading}
                            data={data}
                            setData={setData}
                            repoFilter={repoFilter}
                        />
                    </AppShell>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
