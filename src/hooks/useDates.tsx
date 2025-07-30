export function useDates() {
    const toLocalDate = (date: string): string => {
        return new Date(date).toLocaleDateString('en-US', {
            timeZone: 'UTC'
        });
    }

    return {
        toLocalDate
    }
}