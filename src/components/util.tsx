export default function getItemColor(theme) {
    const darkTheme = theme.colorScheme === 'dark';
    return darkTheme ? theme.colors.dark[4] : theme.colors.gray[2];
}
