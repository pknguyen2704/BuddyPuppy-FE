import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import SideBar from '~/components/SideBar/SideBar';
import Content from './Content/Content';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      {/* Header */}
      <Header onMenuClick={toggleSidebar} />

      {/* Main area */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: (theme) => theme.BuddyPuppy.appContentHeight,
        }}
      >
        {/* Sidebar với hiệu ứng smooth */}
        <Box
          sx={{
            width: isSidebarOpen ? { xs: '200px', md: '250px' } : 0,
            // minWidth: isSidebarOpen ? '200px' : 0,
            borderRight: '1px solid #e0e0e0',
            overflow: 'hidden',
            transition: 'width 0.3s ease, opacity 0.3s ease',
            opacity: isSidebarOpen ? 1 : 0,
          }}
        >
          <SideBar />
        </Box>

        {/* Content tự mở rộng */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: '#f5f6fa',
            transition: 'all 0.3s ease',
          }}
        >
          <Content />
        </Box>
      </Box>

      <Footer />
    </Container>
  );
};

export default Home;
