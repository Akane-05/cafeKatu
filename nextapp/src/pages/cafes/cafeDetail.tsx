// import { NextPage } from 'next'
// import Router from 'next/router'
import { Button, Grid, Typography, Link } from '@mui/material'
import React, { useState, useEffect } from 'react'
import CafeCard from '@/components/elements/CafeCard'
import ReviewCard from '@/components/elements/ReviewCard'
import CustomPaper, { LinkPaper } from '@/components/layouts/CustomPaper'
import { useCafe } from '@/features/cafes/api/useCafe'
import { useRouter } from 'next/router'
import { path, strage, requests } from '@/const/Consts'
import { useSetRecoilState, RecoilRoot } from 'recoil'
import { haveTokenState } from '@/globalStates/haveToken'
import ReviewsList from '@/components/elements/ReviewsList'
import useSWR, { useSWRConfig } from 'swr'

export default function CafeDetail() {
  const router = useRouter()
  const { response, isLoading, isError, mutate } = useCafe(router.query.id)

  const setHaveToken = useSetRecoilState(haveTokenState)

  const handleLink = (path: string) => {
    router.push(path)
  }

  if (isLoading) {
    return (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Typography variant="body1">読み込み中...</Typography>
        </Grid>
      </Grid>
    )
  }

  if (isError && isError?.response?.status == 401) {
    setHaveToken(false)

    return (
      <>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item xs={12} p={2}>
            <Typography variant="body1">
              ログイン情報を取得できませんでした。再度ログインしてください。
            </Typography>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLink(path.top)}
          >
            Top画面に戻る
          </Button>
        </Grid>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item xs={12} p={2}>
            <Typography variant="body1">エラーが発生しました</Typography>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLink(path.top)}
          >
            Top画面に戻る
          </Button>
        </Grid>
      </>
    )
  }

  return (
    <>
      <LinkPaper elevation={0}>
        <Link
          onClick={() => handleLink(path.cafesList)}
          component="button"
          variant="body1"
        >
          店舗一覧に戻る
        </Link>
      </LinkPaper>

      <CustomPaper>
        <CafeCard cafeInfo={response.data.cafe} detail={true}></CafeCard>
      </CustomPaper>

      <ReviewsList
        id={router.query.id ? router.query.id : null}
        parentMutate={mutate}
      />
    </>
  )
}
