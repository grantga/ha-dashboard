import { Container } from '@mui/material';
import useSelectEntityMode from '../hooks/useSelectEntityMode';
import ModeSelector from '../components/ModeSelector';
import MultiViewLayout from '../components/MultiViewLayout';

export default function BasementPage() {

    const { value: mode, setValue: setMode, loading: loadMode } = useSelectEntityMode('select.orei_uhd_401mv_multiview_mode');
    const { value: tripleMode, setValue: setTripleMode, loading: loadingTriple } = useSelectEntityMode('select.orei_uhd_401mv_triple_mode');
    const { value: quadMode, setValue: setQuadMode, loading: loadingQuad } = useSelectEntityMode('select.orei_uhd_401mv_quad_mode');
    const { value: pbpMode, setValue: setPbpMode, loading: loadingPbp } = useSelectEntityMode('select.orei_uhd_401mv_pbp_mode');

    const loadingAny = loadMode || loadingTriple || loadingQuad || loadingPbp;
    //handle the alt pbp, triple and quad modes
    let detailedMode = mode;
    if (mode == "PBP" && pbpMode == "Mode 2") {
        detailedMode = "PBP2"
    } else if (mode == "Triple" && tripleMode == "Mode 2") {
        detailedMode = "Triple2"
    } else if (mode == "Quad" && quadMode == "Mode 2") {
        detailedMode = "Quad2"
    }

    return (
        <Container>
            <ModeSelector mode={detailedMode} setMode={setMode} setTripleMode={setTripleMode} setQuadMode={setQuadMode} setPbpMode={setPbpMode} loading={loadingAny} />
            <MultiViewLayout mode={detailedMode} loading={loadingAny} />
        </Container>
    );
}
