import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import ModeSelector from '../components/ModeSelector';
import MultiViewLayout from '../components/MultiViewLayout';
import DevicePower from '../components/DevicePower';

export default function BasementPage() {

    const { value: mode, setValue: setMode, loadingValue: loadMode } = useSelectEntityMode('select.orei_uhd_401mv_multiview_mode');
    const { value: tripleMode, setValue: setTripleMode, loadingValue: loadingTriple } = useSelectEntityMode('select.orei_uhd_401mv_triple_mode');
    const { value: quadMode, setValue: setQuadMode, loadingValue: loadingQuad } = useSelectEntityMode('select.orei_uhd_401mv_quad_mode');
    const { value: pbpMode, setValue: setPbpMode, loadingValue: loadingPbp } = useSelectEntityMode('select.orei_uhd_401mv_pbp_mode');

    const loadingAny = loadMode != "" || loadingTriple != "" || loadingQuad != "" || loadingPbp != "";
    //handle the alt pbp, triple and quad modes
    let detailedMode = mode;
    if (mode == "PBP" && pbpMode == "PBP mode 2") {
        detailedMode = "PBP2"
    } else if (mode == "Triple" && tripleMode == "Triple mode 2") {
        detailedMode = "Triple2"
    } else if (mode == "Quad" && quadMode == "Mode 2") {
        detailedMode = "Quad2"
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ maxWidth: 650, width: '100%' }}>
                <Stack spacing={2}>
                    <Card variant="outlined">
                        <CardContent>
                            <DevicePower />
                        </CardContent>
                    </Card>
                    <Card variant="outlined">
                        <CardContent>
                            <ModeSelector mode={detailedMode} setMode={setMode} setTripleMode={setTripleMode} setQuadMode={setQuadMode} setPbpMode={setPbpMode} loading={loadingAny} />
                            <MultiViewLayout mode={detailedMode} loading={loadingAny} />
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </Box>
    );
}
