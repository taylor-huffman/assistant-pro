import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Typography, Button, Box, Card, CardContent, Rating, Avatar } from '@mui/material'

function Home() {
  
    const [categories, setCategories] = useState([])
    const [spotlight, setSpotlight] = useState({})
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('/task_categories')
        .then(r => r.json())
        .then(data => {
            const firstEight = data.slice(0, 8)
            setCategories(firstEight)
        })
    }, [])

    useEffect(() => {
        fetch('/employers')
        .then(r => r.json())
        .then(data => {
            setSpotlight(data[Math.floor(Math.random()*data.length)])
        })
    }, [])

    useEffect(() => {
        fetch('/reviews')
        .then(r => r.json())
        .then(data => {
            const firstTwo = data.slice(0, 2)
            setReviews(firstTwo)
        })
    }, [])

    console.log(reviews)

    return (
        <>
            <Container maxWidth="lg" sx={{ padding: '5rem 1rem' }}>
                <Grid container spacing={12}>
                    <Grid xs={12} md={6}>
                        <Typography variant='h1' sx={{ marginBottom: '1.5rem' }}>
                            Top Assistants For Business Leaders and Entrepreneurs
                        </Typography>
                        <Typography variant='p' sx={{ fontSize: '1.3rem' }}>
                            Regain time and ease your stress! Find qualified assistants today to fulfill your project needs.
                        </Typography>
                        <Box sx={{ marginTop: '2.5rem' }}>
                            <Button href='/search/assistants' variant="contained" sx={{ borderRadius: '1.5rem', marginRight: '1rem', marginBottom: '1.5rem', padding: '.4rem 1.6rem', boxShadow: 'none' }}>
                                Find An Assistant
                            </Button>
                            <Button variant="contained" color="secondary" sx={{  borderRadius: '1.5rem', marginBottom: '1.5rem', padding: '.4rem 1.6rem', boxShadow: 'none' }}>
                                Post A Job
                            </Button>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <img alt="Employer Illustration" src={require('../media/ap-employer-ceo.png')} style={{ marginRight: 'auto', maxWidth: '100%' }} />
                    </Grid>
                </Grid>
                <Grid container spacing={12}>
                    <Grid xs={12}>
                        <Typography variant='h2'>
                            Top Categories
                        </Typography>
                    </Grid>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', paddingTop: '0' }}>
                            {categories.map(category => {
                                return <Grid key={category.id} xs={12} sx={{ backgroundColor: '#EEF6EB', textAlign: 'center', padding: '50px 20px', borderRadius: '1.5rem', marginBottom: '20px', width: '24%' }}>
                                    <Typography variant="p" sx={{ fontWeight: '900' }}>
                                        {category.name}
                                    </Typography>
                                </Grid>
                            })}
                        </Grid>
                    </Box>
                </Grid>
                <Grid container spacing={12} sx={{ marginTop: '60px' }}>
                    <Grid xs={12} md={6} sx={{ backgroundColor: '#34422E', borderTopLeftRadius: '40px', borderBottomLeftRadius: '40px', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant='p' sx={{ fontSize: '1.3rem', color: '#FDFDFD' }}>
                            Business Spotlight
                        </Typography>
                        <Typography variant='h2' sx={{ marginBottom: '1.5rem', marginTop: '1.5rem', color: '#FDFDFD' }}>
                            {spotlight.company_name}
                        </Typography>
                        <Typography variant='p' sx={{ fontSize: '1.3rem', color: '#FDFDFD' }}>
                            {spotlight.company_bio}
                        </Typography>
                        <Box sx={{ marginTop: 'auto' }}>
                            {/* <Button variant="contained" sx={{ borderRadius: '1.5rem', marginRight: '1rem', marginBottom: '1.5rem', padding: '.4rem 1.6rem', boxShadow: 'none' }}>
                                Find An Assistant
                            </Button> */}
                            <Button variant="outlined" color="secondary" sx={{  borderRadius: '1.5rem', marginBottom: '0', padding: '.4rem 1.6rem', boxShadow: 'none' }}>
                                See Job Posts
                            </Button>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={6} sx={{ padding: '0' }}>
                        <img alt="Employers Sitting At Table" src={require('../media/workers.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }} />
                    </Grid>
                </Grid>
                <Grid container spacing={12} sx={{ marginTop: '80px' }}>
                    <Grid xs={12} sx={{ paddingBottom: '1.5rem' }}>
                        <Typography variant='h2'>
                            Assistant Reviews
                        </Typography>
                    </Grid>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1} sx={{ justifyContent: 'space-between', paddingTop: '0' }}>
                            {reviews.map(review => {
                                return <Grid key={review.id} xs={12} sx={{  textAlign: 'center', borderRadius: '1.5rem', marginBottom: '20px', width: '48%' }}>
                                    <Card sx={{ backgroundColor: 'white', boxShadow: 'none', textAlign: 'left' }}>
                                        <CardContent sx={{ padding: '0' }}>
                                            <Grid>
                                                <Box>
                                                    <Grid sx={{ display: 'flex' }}>
                                                        <Box>
                                                            <Typography variant="p" component="p" sx={{ fontWeight: '900' }}>
                                                                {review.task_agreement.assistant.company_name}
                                                            </Typography>
                                                            <Typography sx={{ mb: 1.5, display: 'flex', marginTop: '0.5rem' }} color="text.secondary">
                                                                <Rating name="half-rating-read" defaultValue={2.5} precision={0.1} value={review.rating} readOnly sx={{ marginRight: '0.5rem' }} /> {review.rating.toFixed(1)}
                                                            </Typography>
                                                        </Box>
                                                        <Avatar sx={{ backgroundColor: 'red', marginLeft: 'auto'}} aria-label="assistant">
                                                            
                                                        </Avatar>
                                                    </Grid>
                                                    <Typography variant="body2">
                                                        {review.review_text}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            })}
                        </Grid>
                    </Box>
                </Grid>
                <Grid container spacing={12} sx={{ marginTop: '20px' }}>
                    <Grid xs={12} md={6}>
                        <img alt="Employer Illustration" src={require('../media/ap-employer-ceo-1.png')} style={{ marginRight: 'auto', maxWidth: '100%' }} />
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Typography variant='h2' sx={{ marginBottom: '1.5rem' }}>
                            Supercharge your business with the Assistant Pro method.
                        </Typography>
                        <Typography variant='p' sx={{ fontSize: '1.3rem' }}>
                            ABOUT US BLURB - At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.
                        </Typography>
                        <Box sx={{ marginTop: '2.5rem' }}>
                            <Button variant="contained" sx={{ borderRadius: '1.5rem', marginRight: '1rem', marginBottom: '1.5rem', padding: '.4rem 1.6rem', boxShadow: 'none' }}>
                                Learn More
                            </Button>
                        </Box>
                    </Grid>
                </Grid> 
            </Container>
        </>
    )
}

export default Home
