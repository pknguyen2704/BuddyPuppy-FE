import React from 'react';
import { Box, Typography } from '@mui/material';
const OurApproach = () => {
  return (
    <Box sx={{
      display: 'flex-column',
    }}>
      <Box sx={{
        display: 'flex-column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant='h5'>
          Our Approach
        </Typography>
        <Typography variant='body1'>
          Buddy Puppy được phát triển dựa trên nền tảng các nghiên cứu khoa học về giáo dục đặc biệt và công nghệ hỗ trợ học tập.
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        flex: 1
      }}>
      </Box>
      <Box sx={{
        display: 'flex',
        flex: 2
      }}>
      </Box>
    </Box>
  );
}

export default OurApproach;
