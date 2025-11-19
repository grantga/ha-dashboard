import { Box, Card, CardContent, Stack, Fade } from '@mui/material';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import ModeSelector from '../components/ModeSelector';
import MultiViewLayout from '../components/MultiViewLayout';
import DevicePower from '../components/DevicePower';
import MediaPlayerControl from '../components/MediaPlayerControl';
import ThemeToggle from '../components/ThemeToggle';

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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100%', mt: 4, mb: 4, position: 'relative' }}>
            {/* Theme Toggle - Floating in top-right */}
            <Box sx={{ position: 'absolute', top: -8, right: 16, zIndex: 10 }}>
                <ThemeToggle />
            </Box>

            <Box sx={{ maxWidth: 800, width: '100%' }}>
                <Stack spacing={3}>
                    <Fade in timeout={300}>
                        <Card
                            variant="outlined"
                            sx={{
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(148, 163, 184, 0.1)',
                            }}
                        >
                            <CardContent sx={{ p: 2.5 }}>
                                <DevicePower />
                            </CardContent>
                        </Card>
                    </Fade>

                    <Fade in timeout={400}>
                        <Card
                            variant="outlined"
                            sx={{
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(148, 163, 184, 0.1)',
                            }}
                        >
                            <CardContent sx={{ p: 2.5 }}>
                                <MediaPlayerControl entityId='media_player.rx_v6a_bf8066' />
                            </CardContent>
                        </Card>
                    </Fade>

                    <Fade in timeout={500}>
                        <Card
                            variant="outlined"
                            sx={{
                                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(148, 163, 184, 0.1)',
                            }}
                        >
                            <CardContent sx={{ p: 2.5 }}>
                                <ModeSelector mode={detailedMode} setMode={setMode} setTripleMode={setTripleMode} setQuadMode={setQuadMode} setPbpMode={setPbpMode} loading={loadingAny} />
                                <MultiViewLayout mode={detailedMode} loading={loadingAny} />
                            </CardContent>
                        </Card>
                    </Fade>
                </Stack>
            </Box>
        </Box>
    );
}
