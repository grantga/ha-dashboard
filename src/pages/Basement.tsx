import { Container, Typography } from '@mui/material';

export default function BasementPage() {
  return (
    <Container>
      <Typography variant="h4">Basement</Typography>
      <Typography sx={{ mt: 2 }}>Controls and status for the basement.</Typography>
    </Container>
  );
}
