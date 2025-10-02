import { useState } from 'react';
import { useHass } from "@hakit/core";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const drawerWidth = 240;
const miniDrawerWidth = 64;

const headerHeight = 64; // matches Toolbar default
const itemHeight = 48; // height for each ListItem

const roomConfig = [
  { key: 'home', label: 'Home', path: '/', icon: <HomeIcon /> },
  { key: 'basement', label: 'Basement', path: '/basement', icon: <MeetingRoomIcon /> },
  { key: 'living-room', label: 'Living Room', path: '/living-room', icon: <MeetingRoomIcon /> },
];

function Dashboard() {
  useHass();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);

  // entityCount is available via Home Assistant if needed in pages

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const location = useLocation();

  const getActiveIndex = (path: string) => {
    const idx = roomConfig.findIndex((r) => r.path !== '/' ? path.startsWith(r.path) : path === '/' );
    return idx >= 0 ? idx : 0;
  };

  const activeIndex = getActiveIndex(location.pathname);

  const drawer = (
  <Box sx={{ position: 'relative' }}>
      {/* use Toolbar to match AppBar height exactly */}
      <Toolbar sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: drawerOpen ? 'space-between' : 'center',
        px: drawerOpen ? 2 : 1,
      }}>
        {drawerOpen && <Typography noWrap variant="h6">Seattle House</Typography>}
        <IconButton onClick={handleDrawerToggle}>
          {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List sx={{ position: 'relative' }}>
        {/* animated indicator */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: `calc(${headerHeight}px + ${activeIndex} * ${itemHeight}px)`,
            width: drawerOpen ? '6px' : '0px',
            height: `${itemHeight}px`,
            bgcolor: 'primary.main',
            borderRadius: '0 4px 4px 0',
            transition: 'top 200ms, width 200ms',
          }}
        />
        {roomConfig.map((rc, idx) => (
          <ListItemButton
            key={rc.key}
            selected={idx === activeIndex}
            onClick={() => {
              setMobileOpen(false);
              navigate(rc.path);
            }}
            sx={{
              minHeight: itemHeight,
              justifyContent: drawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              {rc.icon}
            </ListItemIcon>
            {drawerOpen && <ListItemText primary={rc.label} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      <Box 
        component="nav" 
        sx={{ 
          width: { sm: drawerOpen ? drawerWidth : miniDrawerWidth }, 
          flexShrink: { sm: 0 },
          transition: 'width 0.2s',
        }} 
        aria-label="rooms"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ 
            display: { xs: 'block', sm: 'none' }, 
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } 
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{ 
            display: { xs: 'none', sm: 'block' }, 
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerOpen ? drawerWidth : miniDrawerWidth,
              transition: 'width 0.2s',
              overflowX: 'hidden',
            } 
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AppBar  position="static" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: 1, borderColor: 'divider' }}>
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
            <Typography variant="h6" component="div">
              {roomConfig[activeIndex].label}
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
          {/* render child route pages here */}
          <Outlet />
        
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;