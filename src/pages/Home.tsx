import { Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container>
      <Typography variant="h4">Home</Typography>
      <Typography sx={{ mt: 2 }}>Overview and controls for the whole house.</Typography>
    </Container>
  );
}
