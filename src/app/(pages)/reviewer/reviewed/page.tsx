import Column from '@/components/Column'
import FileUpload from '@/components/reviewerComponents/FileUpload'
import React from 'react'

export default function page() {
  return (
      <Column className="flex-1">
          <FileUpload/>
    </Column>
  )
}
