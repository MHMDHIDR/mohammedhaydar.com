'use client'

import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from './ui/select'
import { useToast } from '@/hooks/use-toast'
import SuccessMsg from './SuccessMsg'
import { sendContactEmail } from '@/lib/email'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

// Define services enum
const services = ['Web Development', 'Design', 'Consulting', 'Other'] as const

// Create Zod schema for contact form
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email cannot exceed 255 characters'),
  phone: z.string().refine(isValidPhoneNumber, {
    message: 'Please provide a valid phone number',
  }),
  subject: z
    .string()
    .min(2, 'Subject must be at least 2 characters')
    .max(200, 'Subject cannot exceed 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
  service: z.enum(services, {
    errorMap: () => ({ message: 'Please select a valid service' }),
  }),
})

const ContactForm = () => {
  const { toast } = useToast()
  const [status, setStatus] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: '',
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      service: value,
    }))
    setErrors(prevErrors => ({
      ...prevErrors,
      service: '',
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)
      const result = contactFormSchema.safeParse(formData)
      if (!result.success) {
        setErrors(
          result.error.issues.reduce(
            (acc, issue) => {
              acc[issue.path[0] as keyof typeof errors] = issue.message
              return acc
            },
            {
              name: '',
              email: '',
              phone: '',
              subject: '',
              message: '',
              service: '',
            }
          )
        )
        setLoading(false)
        return
      }
      const response = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        service: formData.service,
      })

      if (response.success) {
        setSuccess(true)
        setStatus('Success! Your message has been sent.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          service: '',
        })
      } else {
        toast({
          title: 'Error: Unable to send message',
          description: response.error || 'Please try again later.',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Data submitting Error', error)
      setStatus('Error! Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-2xl md:text-4xl text-lightSky'>Let&apos;s work together</h3>
      <p>I’m looking forward to working with you!</p>
      <>
        {success ? (
          <SuccessMsg status={status} />
        ) : (
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col md:flex-row gap-4 items-center'>
              <div className='flex-1 w-full'>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Your name please'
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  className={`disabled:bg-white/10 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.name && (
                  <p className='text-red-500 text-xs pt-2'>{errors.name}</p>
                )}
              </div>
              <div className='flex-1 w-full'>
                <Input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Email address please'
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className={`disabled:bg-white/10 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.email && (
                  <p className='text-red-500 text-xs pt-2'>{errors.email}</p>
                )}
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-4 items-center'>
              <div className='flex-1 w-full'>
                <Input
                  type='text'
                  id='phone'
                  name='phone'
                  placeholder='Phone number'
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                  className={`disabled:bg-white/10 ${
                    errors.phone ? 'border-red-500' : ''
                  }`}
                />
                {errors.phone && (
                  <p className='text-red-500 text-xs pt-2'>{errors.phone}</p>
                )}
              </div>
              <div className='flex-1 w-full'>
                <Input
                  type='text'
                  id='subject'
                  name='subject'
                  placeholder='Subject'
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={loading}
                  className={`disabled:bg-white/10 ${
                    errors.subject ? 'border-red-500' : ''
                  }`}
                  required
                />
                {errors.subject && (
                  <p className='text-red-500 text-xs pt-2'>{errors.subject}</p>
                )}
              </div>
            </div>
            <Textarea
              name='message'
              placeholder='Your message here'
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              className={`disabled:bg-white/10 ${errors.message ? 'border-red-500' : ''}`}
            />
            {errors.message && (
              <p className='text-red-500 text-xs pt-2'>{errors.message}</p>
            )}
            <Select onValueChange={handleSelectChange} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder='Select a service' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a service</SelectLabel>
                  {services.map(service => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.service && (
              <p className='text-red-500 text-xs pt-2'>{errors.service}</p>
            )}
            <Button
              disabled={loading}
              type='submit'
              className='w-full py-4 bg-lightSky/5 text-white/80 border border-lightSky/20 hover:bg-lightSky/10 hover:border-lightSky hover:text-hoverColor hoverEffect'
            >
              {loading ? 'Submitting message...' : 'Send Message'}
            </Button>
          </form>
        )}
      </>
    </div>
  )
}

export default ContactForm
