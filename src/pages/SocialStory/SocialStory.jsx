import React from 'react';
import Header from '~/components/Header/Header';
import { Typography } from '@mui/material';
import { Container, Box } from '@mui/material';
import Footer from '~/components/Footer/Footer';
import SideBar from '~/components/SideBar/SideBar';
import StoryCard from './StoryCard/StoryCard';

import story1 from '~/assets/SocialStory/SocialStory1/story1.png';
import story2 from '~/assets/SocialStory/SocialStory2/story2.png';
import story3 from '~/assets/SocialStory/SocialStory3/story3.png';

const SocialStory = () => {
  const stories = [
    { 
      id: 1,
      title: 'Control Your Anger',
      description: 'Learn how to stay calm and control your anger in tough situations.',
      image: story1,
      slug: 'control-your-anger'
    },
    {
      id: 2,
      title: 'Potty training',
      description: 'Discover how kindness can make a difference in your life and others.',
      image: story2,
      slug: 'potty-training'
    },
    {
      id: 3,
      title: 'Say hi and goodbye',
      description: 'Understand the importance of sharing and caring for friends.',
      image: story3,
      slug: 'say-hi-and-goodbye'
    }
  ];

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: (theme) => theme.BuddyPuppy.appContentHeight,
        }}
      >
        <Box
          sx={{
            width: '10%',
            borderRight: '1px solid #e0e0e0',
            flexShrink: 0,
            minWidth: '240px'
          }}
        >
          <SideBar />
        </Box>

        <Box
          sx={{
            width: '90%',
            backgroundColor: '#f5f6fa',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              py: 2,
              px: 10,
            }}
          >
            {/* Header section */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                borderBottom: '1px solid #e0e0e0',
                py: 2
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  component="h1"
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  Social Story
                </Typography>
                <Typography variant="body2">
                  Reading this
                </Typography>
              </Box>
            </Box>

            {/* Story cards */}
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              {stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Container>
  );
};

export default SocialStory;
