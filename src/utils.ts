export function parseUrl(urlString: string) {
  return new URL(urlString).toString();
}
