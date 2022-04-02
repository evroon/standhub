function getDefaultSettings() {
    return {
        token: '',
    };
}

export function getSettings() {
    return JSON.parse(localStorage.getItem('settings')) || getDefaultSettings();
}

export function setSettings(tokenValue: string) {
    const value = JSON.stringify({token: tokenValue});
    localStorage.setItem('settings', value);
}

export function getGHToken() {
    return getSettings().token || getDefaultSettings().token;
}

export function setGHToken(token: string) {
    setSettings(token);
}
