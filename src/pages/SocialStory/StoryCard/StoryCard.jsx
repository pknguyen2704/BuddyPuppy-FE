import { Box } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const StoryCard = ({ story }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/social-story/${story.slug}`);
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          sx={{ height: 160 }}
          image={story.image}
          title={story.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            {story.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {story.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            sx={{
              backgroundColor: '#ffbe76',
              color: '#d35400',
              '&:hover': { backgroundColor: '#f6b55e' }
            }}
            onClick={handleClick}
          >
            Read
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default StoryCard;
