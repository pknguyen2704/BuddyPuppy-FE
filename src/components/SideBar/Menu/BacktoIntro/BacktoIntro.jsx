import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import Diversity3Icon from '@mui/icons-material/Diversity3';
function BacktoIntro() {
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => {
    navigate('/introduction')
  }
  const isActive = location.pathname === '/introduction'
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
        Back to homepage
      </Button>
    </Box>
  )
}

export default BacktoIntro