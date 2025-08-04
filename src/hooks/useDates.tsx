export function useDates() {
    const localDate = (date: string): string => {
        return new Date(date).toLocaleDateString('en-US', {
            timeZone: 'UTC'
        });
    }

    return {
        localDate
    }
}