import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate, useLocation } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => {
    navigate('/home')
  }
  const isActive = location.pathname === '/home'
  return (
    <Box>
      <Button sx={{
        color: isActive ? 'white' : 'black',
        backgroundColor: isActive ? '#EE0033' : 'transparent',
        '&:hover': { 
          backgroundColor: isActive ? '#EE0033' : '#f5f6fa',
          color: isActive ? 'white' : '#EE0033',
        },
      }} onClick={handleClick} variant="text">
        Home
      </Button>
    </Box>
  )
}

export default Home