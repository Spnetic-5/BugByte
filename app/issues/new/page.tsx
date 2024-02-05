"use client";

import { TextField, TextArea, Button } from '@radix-ui/themes'
import React from 'react'

const NewIssue = () => {
  return (
    <div className='max-w-lg space-y-3'>
        <TextField.Root>
          <TextField.Input placeholder='Title' />
        </TextField.Root>
        <TextArea placeholder='Description' />
        <Button>
          Submit Issue
        </Button>
    </div>
  )
}

export default NewIssue