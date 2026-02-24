import { Dialog, DialogTitle, DialogContent, Box, Typography, type Theme } from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  sources: string[] | null;
  currentSource: string | null;
  onSelect: (source: string) => void;
};

export default function InputSourceModal({ open, onClose, sources, currentSource, onSelect }: Props) {
  const handleSelect = (source: string) => {
    onSelect(source);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      PaperProps={{
        sx: (theme: Theme) => ({
          background: theme.palette.custom.modalBackground,
          backdropFilter: 'blur(20px)',
          borderRadius: 3,
          border: `1px solid ${theme.palette.custom.modalBorder}`,
          boxShadow: theme.palette.custom.modalShadow,
        }),
      }}
    >
      <DialogTitle
        sx={(theme: Theme) => ({
          color: theme.palette.mode === 'dark' ? 'white' : 'text.primary',
          fontSize: '1.25rem',
          fontWeight: 700,
          borderBottom: `1px solid ${theme.palette.custom.modalBorder}`,
          pb: 2,
        })}
      >
        Select Input
      </DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          {sources && sources.length > 0 ? (
            sources.map(source => (
              <Box
                key={source}
                role='button'
                tabIndex={0}
                onClick={() => handleSelect(source)}
                sx={(theme: Theme) => ({
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: currentSource === source ? theme.palette.primary.main : theme.palette.custom.border,
                  borderRadius: 2,
                  px: 2,
                  py: 1.5,
                  background: currentSource === source ? theme.palette.custom.cardBackgroundGradient : theme.palette.custom.cardBackground,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    background: theme.palette.custom.cardBackgroundGradientHover,
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                  },
                })}
              >
                <Typography
                  sx={(theme: Theme) => ({
                    color: currentSource === source ? theme.palette.primary.main : theme.palette.text.primary,
                    fontWeight: currentSource === source ? 600 : 400,
                    fontSize: '0.95rem',
                  })}
                >
                  {source}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography color='text.secondary'>No inputs available</Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
