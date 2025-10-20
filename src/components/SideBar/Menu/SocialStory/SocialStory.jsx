import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import Diversity3Icon from '@mui/icons-material/Diversity3';
function SocialStory() {
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => {
    navigate('/social-story')
  }
  const isActive = location.pathname === '/social-story'
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
    }}>
      <Button sx={{
        color: isActive ? '#d35400' : 'black',
        backgroundColor: isActive ? '#ffbe76' : 'transparent',
        justifyContent: 'left',
      }} 
        onClick={handleClick} 
        fullWidth
        variant="text">
        <Diversity3Icon sx={{
          mr: 1
        }}/>
        Social Story
      </Button>
    </Box>
  )
}

export default SocialStory