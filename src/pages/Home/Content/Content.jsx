import { Typography } from '@mui/material'
import React from 'react'
import { blend, Box } from '@mui/system'
import Avatar from '@mui/material/Avatar'
import { Gradient } from '@mui/icons-material'
const Content = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      py: 2,
      px: 10,
    }}>
      <Box sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderBottom: '1px solid #e0e0e0',
        py: 2
      }}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <Box>
          <Typography variant="h6" component="h1" sx={{
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',

          }}>
            Hello, Phung Khoi Nguyen
          </Typography>
          <Typography variant="body2">
            Let's start studying with us!
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        pt: 2
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h5" component="h2" sx={{
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '14px',
          }}>
            Study Progress
          </Typography>
          <Box sx={{
            // backgroundColor: '#d35400',
            borderRadius: 2,
            width: '400px',
            mt: 2,
            background: 'linear-gradient(60deg, #d35400 0%, #f39c12 100%)',
          }}>
            <Typography variant="body1" sx={{
              color: 'white',
              p: 1
            }}>
              You have completed 20% of your learning journey. Keep up the great work!
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Content;
