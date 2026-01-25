import netflixImg from './images/apps/netflix.png';
import disneyPlusImg from './images/apps/disney_plus.png';
import youtubeImg from './images/apps/youtube.png';
import primeVideoImg from './images/apps/prime_video.png';
import espnImg from './images/apps/espn.png';
import huluImg from './images/apps/hulu.png';

const APP_ICON_MAP: Record<string, string> = {
  netflix: netflixImg,
  'disney plus': disneyPlusImg,
  'disney+': disneyPlusImg,
  youtube: youtubeImg,
  'youtube tv': youtubeImg,
  'prime video': primeVideoImg,
  amazon: primeVideoImg,
  espn: espnImg,
  hulu: huluImg,
  'apple tv': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Apple_TV_Plus_Logo.svg/512px-Apple_TV_Plus_Logo.svg.png',
  'fox sports': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fox_Sports_logo.svg/512px-Fox_Sports_logo.svg.png',
  'xfinity stream': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Xfinity_logo.svg/512px-Xfinity_logo.svg.png',
  max: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Max_logo.svg/512px-Max_logo.svg.png',
  'hbo max': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Max_logo.svg/512px-Max_logo.svg.png',
};

export function getAppIcon(appName: string | null | undefined): string | null {
  if (!appName) return null;
  const normalized = appName.toLowerCase().trim();
  return APP_ICON_MAP[normalized] || null;
}
