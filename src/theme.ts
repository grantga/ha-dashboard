import { createTheme } from '@mui/material';

// Extend the MUI theme types to include our custom colors
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      cardBackground: string;
      cardBackgroundHover: string;
      cardBackgroundActive: string;
      cardBackgroundGradient: string;
      cardBackgroundGradientHover: string;
      border: string;
      borderHover: string;
      buttonBorder: string;
      buttonBorderHover: string;
      buttonBackground: string;
      buttonBackgroundHover: string;
      iconColor: string;
      iconColorHover: string;
      overlayGradient: string;
      overlayGradientHover: string;
      shadowPrimary: string;
      shadowPrimaryHover: string;
      shadowSecondary: string;
      shimmerGradient: string;
      modalBackground: string;
      modalBorder: string;
      modalShadow: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      cardBackground?: string;
      cardBackgroundHover?: string;
      cardBackgroundActive?: string;
      cardBackgroundGradient?: string;
      cardBackgroundGradientHover?: string;
      border?: string;
      borderHover?: string;
      buttonBorder?: string;
      buttonBorderHover?: string;
      buttonBackground?: string;
      buttonBackgroundHover?: string;
      iconColor?: string;
      iconColorHover?: string;
      overlayGradient?: string;
      overlayGradientHover?: string;
      shadowPrimary?: string;
      shadowPrimaryHover?: string;
      shadowSecondary?: string;
      shimmerGradient?: string;
      modalBackground?: string;
      modalBorder?: string;
      modalShadow?: string;
    };
  }
}

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#3b82f6',
    },
    secondary: {
      main: '#2dd4bf',
      light: '#5eead4',
      dark: '#14b8a6',
    },
    background: {
      default: '#0f0f0f',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: 'rgba(148, 163, 184, 0.1)',
    custom: {
      cardBackground: 'rgba(26, 26, 26, 0.5)',
      cardBackgroundHover: 'rgba(26, 26, 26, 0.7)',
      cardBackgroundActive: 'rgba(26, 26, 26, 0.9)',
      cardBackgroundGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      cardBackgroundGradientHover: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
      border: 'rgba(148, 163, 184, 0.1)',
      borderHover: 'rgba(96, 165, 250, 0.4)',
      buttonBorder: 'rgba(148, 163, 184, 0.2)',
      buttonBorderHover: 'rgba(96, 165, 250, 0.5)',
      buttonBackground: 'rgba(26, 26, 26, 0.6)',
      buttonBackgroundHover: 'rgba(255, 255, 255, 0.08)',
      iconColor: '#94a3b8',
      iconColorHover: '#60a5fa',
      overlayGradient: 'linear-gradient(to top, rgba(15, 15, 15, 0.98) 0%, rgba(15, 15, 15, 0.85) 40%, transparent 100%)',
      overlayGradientHover: 'linear-gradient(to top, rgba(15, 15, 15, 1) 0%, rgba(15, 15, 15, 0.9) 40%, transparent 100%)',
      shadowPrimary: '0 4px 24px rgba(0, 0, 0, 0.3)',
      shadowPrimaryHover: '0 8px 32px rgba(96, 165, 250, 0.15)',
      shadowSecondary: '0 2px 12px rgba(0, 0, 0, 0.25)',
      shimmerGradient: 'linear-gradient(90deg, rgba(26, 26, 26, 0.4) 0%, rgba(255, 255, 255, 0.06) 50%, rgba(26, 26, 26, 0.4) 100%)',
      modalBackground: 'rgba(15, 15, 15, 0.9)',
      modalBorder: 'rgba(148, 163, 184, 0.15)',
      modalShadow: '0 24px 64px rgba(0, 0, 0, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontWeight: 600,
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(96, 165, 250, 0.2)',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: '1.5px solid rgba(148, 163, 184, 0.15)',
          padding: '8px 16px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(96, 165, 250, 0.12)',
            borderColor: '#60a5fa',
            color: '#93c5fd',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(96, 165, 250, 0.2)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(96, 165, 250, 0.1)',
          },
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#14b8a6',
      light: '#2dd4bf',
      dark: '#0d9488',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    divider: 'rgba(15, 23, 42, 0.08)',
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    custom: {
      cardBackground: 'rgba(255, 255, 255, 0.8)',
      cardBackgroundHover: 'rgba(255, 255, 255, 0.95)',
      cardBackgroundActive: 'rgba(255, 255, 255, 1)',
      cardBackgroundGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.04) 0%, rgba(59, 130, 246, 0.01) 100%)',
      cardBackgroundGradientHover: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 100%)',
      border: 'rgba(15, 23, 42, 0.1)',
      borderHover: 'rgba(59, 130, 246, 0.3)',
      buttonBorder: 'rgba(148, 163, 184, 0.3)',
      buttonBorderHover: 'rgba(59, 130, 246, 0.5)',
      buttonBackground: 'rgba(248, 249, 250, 0.9)',
      buttonBackgroundHover: 'rgba(59, 130, 246, 0.06)',
      iconColor: '#475569',
      iconColorHover: '#3b82f6',
      overlayGradient: 'linear-gradient(to top, rgba(248, 249, 250, 0.98) 0%, rgba(248, 249, 250, 0.85) 40%, transparent 100%)',
      overlayGradientHover: 'linear-gradient(to top, rgba(248, 249, 250, 1) 0%, rgba(248, 249, 250, 0.9) 40%, transparent 100%)',
      shadowPrimary: '0 2px 12px rgba(59, 130, 246, 0.06)',
      shadowPrimaryHover: '0 4px 20px rgba(59, 130, 246, 0.12)',
      shadowSecondary: '0 1px 6px rgba(15, 23, 42, 0.08)',
      shimmerGradient: 'linear-gradient(90deg, rgba(248, 249, 250, 0.5) 0%, rgba(59, 130, 246, 0.06) 50%, rgba(248, 249, 250, 0.5) 100%)',
      modalBackground: 'rgba(255, 255, 255, 0.98)',
      modalBorder: 'rgba(148, 163, 184, 0.2)',
      modalShadow: '0 24px 64px rgba(15, 23, 42, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          fontWeight: 600,
          boxShadow: 'none',
          textTransform: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          border: '1.5px solid rgba(15, 23, 42, 0.12)',
          padding: '8px 16px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: '#3b82f6',
            color: '#2563eb',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.06)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

// Default export - you can switch between darkTheme and lightTheme here
export const theme = darkTheme;
