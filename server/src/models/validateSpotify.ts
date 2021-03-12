export function validateSpotifyLink(link: string): string {
    const regex = /https:\/\/open\.spotify\.com\/track\/[0-9A-Za-z]{22}/
    const match = link.match(regex)

    if (match && match.length > 0) return match[0];
    return null;
}