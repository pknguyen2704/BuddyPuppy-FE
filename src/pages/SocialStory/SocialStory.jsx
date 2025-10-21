import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSocialStories } from '~/redux/slices/activeSocialStoriesSlice';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import SideBar from '~/components/SideBar/SideBar';
import StoryCard from './StoryCard/StoryCard';
import { Container, Box, Typography, CircularProgress } from '@mui/material';

const SocialStory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const { stories, status, error } = useSelector((state) => state.activeSocialStories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSocialStories());
    }
  }, [status, dispatch]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header onMenuClick={toggleSidebar} />

      {/* Main content */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: (theme) => theme.BuddyPuppy.appContentHeight,
        }}
      >
        {/* Sidebar */}
        <Box
          sx={{
            width: isSidebarOpen ? { xs: '200px', md: '250px' } : 0,
            borderRight: '1px solid #e0e0e0',
            overflow: 'hidden',
            transition: 'width 0.3s ease, opacity 0.3s ease',
            opacity: isSidebarOpen ? 1 : 0,
          }}
        >
          <SideBar />
        </Box>

        {/* Content Area */}
        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: '#f5f6fa',
            p: { xs: 2, md: 5 },
            overflowY: 'auto',
          }}
        >
          {/* Title Section */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderBottom: '1px solid #e0e0e0',
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif',
                mb: 0.5,
              }}
            >
              Social Story
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discover fun and meaningful stories
            </Typography>
          </Box>

          {/* Loading State */}
          {status === 'loading' && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error State */}
          {status === 'failed' && (
            <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
              {typeof error === 'string' ? error : error?.message || 'Đã có lỗi xảy ra khi tải dữ liệu'}
            </Typography>
          )}

          {/* Story Cards */}
          {status === 'succeeded' && stories.length > 0 && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 3,
                alignItems: 'stretch', // 🔥 các card cao bằng nhau
              }}
            >
              {stories.map((story) => (
                <StoryCard key={story._id || story.id} story={story} />
              ))}
            </Box>
          )}

          {/* Empty State */}
          {status === 'succeeded' && stories.length === 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textAlign: 'center', mt: 5 }}
            >
              Không có story nào được tìm thấy.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Container>
  );
};

export default SocialStory;
