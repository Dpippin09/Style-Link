import SearchClient from './SearchClient'
import React, { Suspense } from 'react'

export default function SearchPage() {
  return (
    <Suspense fallback={<div />}> 
      <SearchClient />
    </Suspense>
  )
}
