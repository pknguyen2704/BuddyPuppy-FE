import React from 'react';
import { Box, Typography } from '@mui/material';
const OurTeam = () => {
  return (
    <Box sx={{
      display: 'flex-column'
    }}>
      <Box sx={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography variant='h5'>
          Đội ngũ phát triển
        </Typography>
      </Box>

      <Box>
        <Typography>
          Nhóm nghiên cứu
        </Typography>
      </Box>
      <Box>
        <Typography>
          Đội ngũ phát triển
        </Typography>
      </Box>
    </Box>
  );
}

export default OurTeam;
