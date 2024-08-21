export function getAuthorizationHeader() {
  if (process.env.AGILE_CREDENTIALS) {
    return `Basic ${Buffer.from(process.env.AGILE_CREDENTIALS).toString(
      'base64'
    )}`;
  }
  return '';
}
