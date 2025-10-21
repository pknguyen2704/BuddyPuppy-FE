import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import logo from '~/assets/logo.svg';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ onMenuClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: (theme) => theme.BuddyPuppy.appBarHeight,
        p: 2,
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Icon toggle sidebar */}
        <IconButton onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>

        {/* Logo + Tên app */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img src={logo} alt="BuddyPuppy Logo" style={{ height: '40px', width: '40px' }} />
          <Typography
            sx={{
              color: '#e67e22',
              fontWeight: 'bold',
              fontSize: '24px',
            }}
          >
            BuddyPuppy
          </Typography>
        </Box>
      </Box>

      {/* Avatar + Notification */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <NotificationsIcon sx={{ marginRight: '20px' }} />
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Box>
    </Box>
  );
};

export default Header;
