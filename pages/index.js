import React, { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  const isLogedIn = false

  useEffect(() => {
    if (!isLogedIn) {
      router.push('/login')
    }
  }, [])

  return <></>
}
