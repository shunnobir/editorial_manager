import React from 'react'
import { Check } from 'lucide-react';
import { Button } from '../ui/button';

export default function SubmissionSuccessPage() {
  return (
    <div className='h-screen flex flex-col gap-2 items-center justify-center'>
          <Button className='bg-[#059669] rounded-full p-2'><Check className='' /></Button>
          <h1 className='text-base'>Proposal Submitted Successfully</h1>
          <h4 className='font-semibold text-sm'>Go back to <a className='text-blue-700'>Dashboard</a></h4>
    </div>
  )
}
