export function toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/\b\w/g, char => char.toUpperCase());
}