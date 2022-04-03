export function getItemColor(theme) {
    const darkTheme = theme.colorScheme === 'dark';
    return darkTheme ? theme.colors.dark[4] : theme.colors.gray[2];
}

function getTodayAtMidnight() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
}

export function getDefaultTimeRange(selectMultipleDates: boolean) {
    const maxDate = getTodayAtMidnight();
    const minDate = getTodayAtMidnight();

    let offset = 1;
    if (minDate.getDay() == 0) {
        offset = 2;
    } else if (minDate.getDay() == 1) {
        offset = 3;
    }

    minDate.setDate(minDate.getDate() - offset);

    if (!selectMultipleDates) {
        maxDate.setDate(minDate.getDate());
    }

    return [minDate, maxDate];
}

export function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export function getRepoSelectData(data) {
    return data
        .map((row) => row.repositoryName)
        .filter(onlyUnique)
        .map((row) => {
            return {
                label: row,
                value: row.toLowerCase(),
            };
        });
}
