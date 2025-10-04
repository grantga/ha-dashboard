import { Container } from '@mui/material';
import useMultiviewMode from '../hooks/useMultiviewMode';
import ModeSelector from '../components/ModeSelector';
import MultiViewLayout from '../components/MultiViewLayout';

export default function BasementPage() {
  const { mode, setMode, loading } = useMultiviewMode();
  return (
    <Container>
      <ModeSelector mode={mode} setMode={setMode} loading={loading} />
      <MultiViewLayout mode={mode} loading={loading} />
    </Container>
  );
}
