import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: (theme) => theme.BuddyPuppy.appFooterHeight
    }}>
      <Typography variant='body2' sx={{
      
      }}>
        BuddyPuppy - 2025
      </Typography>
    </Box>
  );
}

export default Footer;
