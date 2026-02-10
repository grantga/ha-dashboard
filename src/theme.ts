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
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#0a0f1e',
      paper: '#1a1f2e',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: 'rgba(148, 163, 184, 0.1)',
    custom: {
      cardBackground: 'rgba(26, 31, 46, 0.5)',
      cardBackgroundHover: 'rgba(26, 31, 46, 0.7)',
      cardBackgroundActive: 'rgba(26, 31, 46, 0.9)',
      cardBackgroundGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0.04) 100%)',
      cardBackgroundGradientHover: 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0.08) 100%)',
      border: 'rgba(148, 163, 184, 0.1)',
      borderHover: 'rgba(99, 102, 241, 0.3)',
      buttonBorder: 'rgba(99, 102, 241, 0.25)',
      buttonBorderHover: 'rgba(99, 102, 241, 0.5)',
      buttonBackground: 'rgba(26, 31, 46, 0.6)',
      buttonBackgroundHover: 'rgba(99, 102, 241, 0.15)',
      iconColor: '#94a3b8',
      iconColorHover: '#818cf8',
      overlayGradient: 'linear-gradient(to top, rgba(10, 15, 30, 0.98) 0%, rgba(10, 15, 30, 0.85) 40%, transparent 100%)',
      overlayGradientHover: 'linear-gradient(to top, rgba(10, 15, 30, 1) 0%, rgba(10, 15, 30, 0.9) 40%, transparent 100%)',
      shadowPrimary: '0 4px 24px rgba(0, 0, 0, 0.3)',
      shadowPrimaryHover: '0 8px 32px rgba(99, 102, 241, 0.2)',
      shadowSecondary: '0 2px 12px rgba(0, 0, 0, 0.25)',
      shimmerGradient: 'linear-gradient(90deg, rgba(26, 31, 46, 0.4) 0%, rgba(99, 102, 241, 0.12) 50%, rgba(26, 31, 46, 0.4) 100%)',
      modalBackground: 'rgba(10, 15, 30, 0.9)',
      modalBorder: 'rgba(99, 102, 241, 0.2)',
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
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.2), 0 1px 2px -1px rgb(0 0 0 / 0.2)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px -4px rgb(99 102 241 / 0.2), 0 4px 12px -2px rgb(0 0 0 / 0.3)',
          },
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
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
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
            backgroundColor: 'rgba(99, 102, 241, 0.12)',
            borderColor: '#6366f1',
            color: '#818cf8',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
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
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
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
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899',
      light: '#f472b6',
      dark: '#db2777',
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
      cardBackgroundGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(99, 102, 241, 0.02) 100%)',
      cardBackgroundGradientHover: 'linear-gradient(135deg, rgba(99, 102, 241, 0.10) 0%, rgba(99, 102, 241, 0.04) 100%)',
      border: 'rgba(15, 23, 42, 0.1)',
      borderHover: 'rgba(99, 102, 241, 0.3)',
      buttonBorder: 'rgba(99, 102, 241, 0.25)',
      buttonBorderHover: 'rgba(99, 102, 241, 0.5)',
      buttonBackground: 'rgba(248, 249, 250, 0.9)',
      buttonBackgroundHover: 'rgba(99, 102, 241, 0.08)',
      iconColor: '#475569',
      iconColorHover: '#6366f1',
      overlayGradient: 'linear-gradient(to top, rgba(248, 249, 250, 0.98) 0%, rgba(248, 249, 250, 0.85) 40%, transparent 100%)',
      overlayGradientHover: 'linear-gradient(to top, rgba(248, 249, 250, 1) 0%, rgba(248, 249, 250, 0.9) 40%, transparent 100%)',
      shadowPrimary: '0 2px 12px rgba(99, 102, 241, 0.08)',
      shadowPrimaryHover: '0 4px 20px rgba(99, 102, 241, 0.15)',
      shadowSecondary: '0 1px 6px rgba(15, 23, 42, 0.08)',
      shimmerGradient: 'linear-gradient(90deg, rgba(248, 249, 250, 0.5) 0%, rgba(99, 102, 241, 0.08) 50%, rgba(248, 249, 250, 0.5) 100%)',
      modalBackground: 'rgba(255, 255, 255, 0.98)',
      modalBorder: 'rgba(99, 102, 241, 0.2)',
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
          boxShadow: '0 1px 3px 0 rgb(15 23 42 / 0.08), 0 1px 2px -1px rgb(15 23 42 / 0.08)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 24px -4px rgb(99 102 241 / 0.15), 0 4px 12px -2px rgb(15 23 42 / 0.1)',
          },
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
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)',
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
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderColor: '#6366f1',
            color: '#4f46e5',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
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
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
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
