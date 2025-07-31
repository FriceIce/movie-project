export function formatRuntime(minutes: number) {
    if (!minutes || minutes <= 0) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60; // It gives the remainder number value after division.

    return `${hours}h ${mins}min`;
}
