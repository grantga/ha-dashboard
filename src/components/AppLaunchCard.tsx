import { Box, IconButton, type Theme } from '@mui/material';

type AppLaunchCardProps = {
  onLaunchApp: (appName: string) => void;
};

export default function AppLaunchCard({ onLaunchApp }: AppLaunchCardProps) {
  const apps = [
    'ESPN',
    'Xfinity Stream',
    'Disney Plus',
    'Netflix',
    'FOX Sports',
    'Prime Video',
    'YouTube TV',
    'Apple TV',
  ];

  const appDisplayNames: Record<string, string> = {
    'Xfinity Stream': 'Xfinity',
    'Disney Plus': 'Disney+',
  };

  return (
    <Box
      sx={(theme: Theme) => ({
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(4, 1fr)',
        },
        gap: 1.5,
        width: '100%',
        borderRadius: 2,
        p: 2,
        background: theme.palette.custom.cardBackground,
        border: `1px solid ${theme.palette.custom.border}`,
      })}
    >
      {apps.map((app) => (
        <IconButton
          key={app}
          onClick={() => onLaunchApp(app)}
          sx={(theme: Theme) => ({
            height: 48,
            background: theme.palette.custom.buttonBackground,
            border: `2px solid ${theme.palette.custom.buttonBorder}`,
            color: theme.palette.custom.iconColor,
            fontSize: '0.875rem',
            fontWeight: 600,
            borderRadius: 2,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              background: theme.palette.custom.buttonBackgroundHover,
              border: `2px solid ${theme.palette.custom.buttonBorderHover}`,
              color: theme.palette.custom.iconColorHover,
              transform: 'scale(1.05)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
            '&:focus, &:focus-visible, &.Mui-focusVisible': {
              outline: 'none',
              background: theme.palette.custom.buttonBackground,
              border: `2px solid ${theme.palette.custom.buttonBorder}`,
            },
          })}
        >
          {appDisplayNames[app] || app}
        </IconButton>
      ))}
    </Box>
  );
}
