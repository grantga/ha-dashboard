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
      default: '#0f172a',
      paper: '#1e293b',
    },
    divider: 'rgba(148, 163, 184, 0.12)',
    custom: {
      cardBackground: 'rgba(30, 41, 59, 0.4)',
      cardBackgroundHover: 'rgba(30, 41, 59, 0.6)',
      cardBackgroundActive: 'rgba(30, 41, 59, 0.8)',
      cardBackgroundGradient: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%)',
      cardBackgroundGradientHover: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.08) 100%)',
      border: 'rgba(148, 163, 184, 0.2)',
      borderHover: 'rgba(148, 163, 184, 0.4)',
      buttonBorder: 'rgba(99, 102, 241, 0.3)',
      buttonBorderHover: 'rgba(99, 102, 241, 0.6)',
      buttonBackground: 'rgba(30, 41, 59, 0.6)',
      buttonBackgroundHover: 'rgba(99, 102, 241, 0.2)',
      iconColor: 'rgba(148, 163, 184, 0.9)',
      iconColorHover: '#818cf8',
      overlayGradient: 'linear-gradient(to top, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.85) 40%, transparent 100%)',
      overlayGradientHover: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.9) 40%, transparent 100%)',
      shadowPrimary: '0 4px 12px rgba(99, 102, 241, 0.4)',
      shadowPrimaryHover: '0 6px 16px rgba(99, 102, 241, 0.5)',
      shadowSecondary: '0 2px 8px rgba(148, 163, 184, 0.2)',
      shimmerGradient: 'linear-gradient(90deg, rgba(30, 41, 59, 0.4) 0%, rgba(99, 102, 241, 0.15) 50%, rgba(30, 41, 59, 0.4) 100%)',
      modalBackground: 'rgba(15, 23, 42, 0.98)',
      modalBorder: 'rgba(99, 102, 241, 0.2)',
      modalShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
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
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '2px solid rgba(148, 163, 184, 0.2)',
          '&.Mui-selected': {
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
            borderColor: '#6366f1',
            '&:hover': {
              backgroundColor: 'rgba(99, 102, 241, 0.25)',
            },
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
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    custom: {
      cardBackground: 'rgba(255, 255, 255, 0.7)',
      cardBackgroundHover: 'rgba(255, 255, 255, 0.9)',
      cardBackgroundActive: 'rgba(255, 255, 255, 1)',
      cardBackgroundGradient: 'linear-gradient(135deg, rgba(25, 118, 210, 0.08) 0%, rgba(25, 118, 210, 0.04) 100%)',
      cardBackgroundGradientHover: 'linear-gradient(135deg, rgba(25, 118, 210, 0.12) 0%, rgba(25, 118, 210, 0.06) 100%)',
      border: 'rgba(0, 0, 0, 0.12)',
      borderHover: 'rgba(0, 0, 0, 0.23)',
      buttonBorder: 'rgba(25, 118, 210, 0.3)',
      buttonBorderHover: 'rgba(25, 118, 210, 0.6)',
      buttonBackground: 'rgba(245, 245, 245, 0.9)',
      buttonBackgroundHover: 'rgba(25, 118, 210, 0.08)',
      iconColor: 'rgba(0, 0, 0, 0.6)',
      iconColorHover: '#1976d2',
      overlayGradient: 'linear-gradient(to top, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.1) 40%, transparent 100%)',
      overlayGradientHover: 'linear-gradient(to top, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 100%)',
      shadowPrimary: '0 4px 12px rgba(25, 118, 210, 0.25)',
      shadowPrimaryHover: '0 6px 16px rgba(25, 118, 210, 0.35)',
      shadowSecondary: '0 2px 8px rgba(0, 0, 0, 0.1)',
      shimmerGradient: 'linear-gradient(90deg, rgba(245, 245, 245, 0.5) 0%, rgba(25, 118, 210, 0.08) 50%, rgba(245, 245, 245, 0.5) 100%)',
      modalBackground: 'rgba(255, 255, 255, 0.98)',
      modalBorder: 'rgba(25, 118, 210, 0.2)',
      modalShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
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
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: '2px solid rgba(0, 0, 0, 0.12)',
          '&.Mui-selected': {
            backgroundColor: 'rgba(25, 118, 210, 0.12)',
            borderColor: '#1976d2',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.2)',
            },
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
