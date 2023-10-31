function truncateText(text: string | null | undefined , maxLength: number): string {
    if (text === null) {
        return '';
    }
    if (text === undefined) {
        return '';
    }

    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    } else {
        return text;
    }
}

export { truncateText };