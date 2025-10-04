import { Box, Typography } from '@mui/material';
import { TVIcon } from './MultiviewIcons';
import useSelectEntityMode from '../hooks/useSelectEntityMode';

type HDMIInputProps = {
    windowIndex: number;
    isAudio?: boolean;
};

export default function HDMIInput({ windowIndex, isAudio }: HDMIInputProps) {
    const { value } = useSelectEntityMode(`select.orei_uhd_401mv_window_${windowIndex}_input`);

    return (
        <Box
            sx={{
                border: '1px solid',
                borderColor: isAudio ? 'primary.main' : 'divider',
                boxShadow: isAudio ? (theme: any) => `0 0 0 2px ${theme.palette.primary.light}` : 'none',
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
                {value ? `HDMI ${value}` : `HDMI${windowIndex}`}
            </Typography>
        </Box>
    );
}
