import React from 'react';
import { Box, Typography, Link, Grid, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#fffaf3',
        borderTop: '1px solid #f0e6d2',
        height: (theme) => theme.BuddyPuppy.appFooterHeight,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Phần bản quyền */}
      <Box
        sx={{
          textAlign: 'center',
          color: '#777',
          fontSize: '0.9rem',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} <strong>BuddyPuppy</strong> — Made with{' '}
          <FavoriteIcon
            sx={{ color: '#f0932b', fontSize: 16, verticalAlign: 'middle' }}
          />{' '}
          by the Buddy Team.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
