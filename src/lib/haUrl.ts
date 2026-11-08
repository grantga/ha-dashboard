// Home Assistant is reached by its mDNS name, which is the one host that
// resolves everywhere on the home network (the bare 'homeassistant' name
// and raw IPs do not survive router swaps). NOTE: http, not https — HA
// serves plain HTTP on port 8123, TLS is not enabled, so https fails.
// In dev (vite dev server on gus-pi) fall back to the env var, since the
// dev server isn't HA.
export function getHaUrl(): string {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_HA_URL as string;
  }
  return 'http://homeassistant.local:8123';
}
