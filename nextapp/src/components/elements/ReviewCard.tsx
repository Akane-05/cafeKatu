// import { NextPage } from 'next'
// import Router from 'next/router'
import {
  Grid,
  TextField,
  Button,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  CardActions,
  Hidden,
  Rating,
} from '@mui/material'
import React from 'react'
import { ReviewInfo } from '@/features/reviews/types/index'

type Props = {
  review: ReviewInfo
}

export default function ReviewCard(props: Props) {
  const [value, setValue] = React.useState<number | null>(2)
  const review = props.review

  return (
    <Card sx={{ mt: 1, mb: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        {/* <Grid item xs={12} sm={3}>
          <CardMedia
            component="img"
            // sx={{ width: 151 }}
            image="/cake.jpg"
            alt="写真の説明"
            sx={{ width: '100%', height: '100%' }}
          />
        </Grid> */}

        <Grid item xs={12} sm={12}>
          <CardContent sx={{ alignSelf: 'stretch' }}>
            {review.nickname != '' ? (
              <Typography component="div" variant="h6" sx={{ mb: 1 }}>
                {review.nickname}
              </Typography>
            ) : (
              <></>
            )}
            {/* <Typography component="div" variant="h6" sx={{ mb: 1 }}>
              {review.nickname}
            </Typography> */}

            <Grid container>
              <Grid item xs={6} sm={3}>
                <Rating
                  name="star-rating"
                  readOnly
                  value={review.rating}
                  precision={0.1}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ mr: 3 }}
                >
                  {review.rating}
                </Typography>
              </Grid>
              <Grid item xs={0} sm={6}>
                <Hidden></Hidden>
              </Grid>
            </Grid>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{ mb: 1 }}
            >
              {review.comment}
            </Typography>
            {/* <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
            </Grid> */}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}
