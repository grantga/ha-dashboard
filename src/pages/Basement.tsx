import { Container, Box, Grid, ToggleButton, ToggleButtonGroup, Tooltip, Skeleton } from '@mui/material';
import useMultiviewMode from '../hooks/useMultiviewMode';
import { IconSingle, IconPIP, IconPBP, IconPBPAlt, IconTripleA, IconTripleB, IconQuadA, IconQuadB } from '../components/MultiviewIcons';

// ...existing code...

const MODES = [
    { key: 'Single', label: 'Single', Icon: IconSingle },
    { key: 'PIP', label: 'PIP', Icon: IconPIP },
    { key: 'PBP', label: 'PBP', Icon: IconPBP },
    { key: 'PBP2', label: 'PBP2', Icon: IconPBPAlt },
    { key: 'Triple', label: 'Triple', Icon: IconTripleA },
    { key: 'Triple2', label: 'Triple2', Icon: IconTripleB },
    { key: 'Quad', label: 'Quad', Icon: IconQuadA },
    { key: 'Quad2', label: 'Quad2', Icon: IconQuadB },
];

function ModeSelector() {
    const { mode, setMode, loading } = useMultiviewMode();
    return (
        <Box {...(loading ? { 'aria-busy': true } : {})}>
            <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, v) => { if (v) setMode(v); }}
                aria-label="display mode"
                sx={{ width: '100%' }}
            >
                <Grid container spacing={1} sx={{ p: 1, justifyContent: 'center' }}>
                    {MODES.map((m) => {
                        const IconComp = m.Icon;
                        return (
                            <Grid item xs="auto" key={m.key}>
                                {loading ? (
                                    <Skeleton variant="rectangular"  sx={{ minWidth: 56, height: 72, display: 'flex', justifyContent: 'center', alignItems: 'center', px: 1 }}/>
                                ) : (
                                    <Tooltip title={m.label} placement="top">
                                        <ToggleButton value={m.key} sx={{ height: 72, minWidth: 56, px: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Box sx={{ color: 'text.primary' }}><IconComp /></Box>
                                        </ToggleButton>
                                    </Tooltip>
                                )}
                            </Grid>
                        );
                    })}
                </Grid>
            </ToggleButtonGroup>
        </Box>
    );
}

export default function BasementPage() {
    return (
        <Container>
            <ModeSelector />
        </Container>
    );
}
