import { Typography } from '@mui/material';
import { Box } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <Box>
      <Typography variant="body2" color="textSecondary" align="center">
        {'© '}
        BuddyPuppy {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}

export default Footer;
