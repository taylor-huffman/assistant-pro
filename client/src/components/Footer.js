import React from 'react'
import { Typography } from '@mui/material'

function Footer() {
  return (
    <footer style={{ backgroundColor: '#222222', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography align='center' sx={{ fontSize: '1rem', color: '#FDFDFD', padding: '1rem 0' }}>
            Copyright 2023 | Taylor Huffman
        </Typography>
    </footer>
  )
}

export default Footer
