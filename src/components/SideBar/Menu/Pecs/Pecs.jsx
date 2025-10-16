import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate, useLocation } from 'react-router-dom'
import MenuBookIcon from '@mui/icons-material/MenuBook';
function Pecs() {
  const navigate = useNavigate()
  const location = useLocation()
  const handleClick = () => {
    navigate('/pecs')
  }
  const isActive = location.pathname === '/pecs'
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
        <MenuBookIcon sx={{
          mr: 1
        }}/>
        Pecs
      </Button>
    </Box>
  )
}

export default Pecs