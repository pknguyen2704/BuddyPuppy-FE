import React from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from '@mui/material'
import logo from '~/assets/logo.svg'
const IntroductionHeader = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: (theme) => theme.BuddyPuppy.appBarHeight,
      p: 2,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f0932b'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}>
        <Box sx={{display: 'flex-column'}}>
          <Typography sx={{
            fontWeight: 'bold',
            fontSize: '24px',
            color: 'white'
          }}>BuddyPuppy</Typography>
        </Box>
      </Box>
      {/* Login, Register */}
      <Box sx={{
        display: 'flex', 
        alignItems: 'center',
        gap: 2
        }}>
          <Button sx={{
            background: 'white',
            borderRadius: '50px',
            width: '100px'
            }}>Login</Button>
          <Button sx={{
            background: 'white',
            borderRadius: '50px',
            width: '100px'
          }}>Register</Button>
      </Box>
    </Box>
  );
}

export default IntroductionHeader;
