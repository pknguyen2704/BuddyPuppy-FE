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
      p: 2,
      gap: 2
    }}>
      {/* Menu Items */}
      <Home />
      <Pecs />
      <SocialStory />
    </Box>
  );
}

export default SideBar;
