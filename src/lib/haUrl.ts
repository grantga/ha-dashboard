// The dashboard is served by Home Assistant itself, so in a production build
// the HA host is always the host that served this page — use the page origin
// instead of a build-time URL. That way the dashboard keeps working when HA
// gets a new IP or hostname (e.g. after a router swap), with no rebuild.
// In dev (vite dev server on gus-pi) fall back to the env var, since the
// dev server isn't HA.
export function getHaUrl(): string {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_HA_URL as string;
  }
  return window.location.origin;
}
