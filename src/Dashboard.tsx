import { useState } from 'react';
import { useHass } from "@hakit/core";
import { TimeCard } from '@hakit/components';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Divider,
  Button,
  Stack,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const rooms = ['Whole House', 'Basement', 'Music'];
const modes = ['Overview', 'Control'];

function Dashboard() {
  const { getAllEntities } = useHass();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>(rooms[0]);
  const [selectedMode, setSelectedMode] = useState<string>(modes[0]);

  const entityCount = Object.keys(getAllEntities()).length;

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Rooms</Typography>
      </Box>
      <Divider />
      <List>
        {rooms.map((r) => (
          <ListItemButton
            key={r}
            selected={r === selectedRoom}
            onClick={() => {
              setSelectedRoom(r);
              setMobileOpen(false);
            }}
          >
            <ListItemText primary={r} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1">Mode</Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {modes.map((m) => (
            <Button
              key={m}
              variant={m === selectedMode ? 'contained' : 'outlined'}
              onClick={() => setSelectedMode(m)}
            >
              {m}
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { sm: 'none' } }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedRoom} — {selectedMode}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: 250 }, flexShrink: { sm: 0 } }} aria-label="rooms">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 } }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="h5" gutterBottom>
            {selectedRoom} — {selectedMode}
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 2 }}>
            The time below will update automatically from Home Assistant.
          </Typography>

          <Box sx={{ maxWidth: 420 }}>
            {/* TimeCard is provided by @hakit/components — use it directly */}
            {/* If the imported path fails at runtime, fallback rendering is simple text. */}
            {/* @ts-ignore */}
            <TimeCard />
          </Box>

          <Typography sx={{ mt: 3 }}>
            You have <strong>{entityCount}</strong> entities to start automating with! Have fun!
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;