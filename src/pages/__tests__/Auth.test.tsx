import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import AuthPage from '../Auth'

jest.mock('@/utils/api')
jest.mock('next/navigation', () => ({
  redirect: jest.fn()
}))

describe('AuthPage', () => {
  it('renders login and register forms', () => {
    render(<AuthPage />)
    
    expect(screen.getByText('Login or register')).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText('Email')[0]).toBeInTheDocument()
    expect(screen.getAllByPlaceholderText('Password')[0]).toBeInTheDocument()
  })
})
