import React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/social-stories/${story.slug}`);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // 🔥 giúp card co giãn đều khi cha stretch
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        },
      }}
      onClick={handleClick}
    >
      {/* Phần hình ảnh */}
      <Box
        sx={{
          width: '100%',
          height: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
          flexShrink: 0,
        }}
      >
        <CardMedia
          component="img"
          image={story.image}
          alt={story.title}
          sx={{
            objectFit: 'contain',
            width: '100%',
            height: '100%',
            p: 1,
          }}
          loading="lazy"
        />
      </Box>

      {/* Phần nội dung */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            fontWeight: 'bold',
            textTransform: 'capitalize',
            fontFamily: 'Montserrat, sans-serif',
            mb: 1,
          }}
        >
          {story.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
          }}
        >
          {story.description}
        </Typography>
      </CardContent>

      {/* Nút hành động */}
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          size="small"
          variant="contained"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            backgroundColor: '#ffbe76',
            color: '#d35400',
            '&:hover': { backgroundColor: '#f6b55e' },
          }}
        >
          Read
        </Button>
      </CardActions>
    </Card>
  );
};

export default StoryCard;
