import React from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const IntroductionHeader = () => {
  const navigate = useNavigate()
  const handleLoginClick = () => {
    navigate('/login')
  }
  const handleSignupClick = () => {
    navigate('/signup')
  }
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
      {/* Login, Signup */}
      <Box sx={{
        display: 'flex', 
        alignItems: 'center',
        gap: 2
        }}>
          <Button 
            sx={{
              background: 'white',
              borderRadius: '50px',
              width: '120px',
              textTransform: 'uppercase'
            }}
            onClick={handleLoginClick} 
            >Login</Button>
          <Button 
            sx={{
              background: 'white',
              borderRadius: '50px',
              width: '120px',
              textTransform: 'uppercase'
            }}
            onClick={handleSignupClick} 
          >Signup</Button>
      </Box>
    </Box>
  );
}

export default IntroductionHeader;
