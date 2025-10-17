import { Box, Typography } from '@mui/material';
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import Home from './Menu/Home/Home';
import Pecs from './Menu/Pecs/Pecs';
import SocialStory from './Menu/SocialStory/SocialStory';

const SideBar = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      p: 2,
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        <Home />
        <Pecs />
        <SocialStory />
      </Box>
    </Box>
  );
}

export default SideBar;
