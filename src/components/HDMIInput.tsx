import { Box, Typography } from '@mui/material';
import { TVIcon } from './MultiviewIcons';

type HDMIInputProps = {
  label?: string;
  thumbnail?: string; // optional future use
};

export default function HDMIInput({ label }: HDMIInputProps) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
      }}
    >
      <TVIcon />
      <Typography variant='subtitle2' sx={{ mt: 1 }}>
        {label}
      </Typography>
    </Box>
  );
}
