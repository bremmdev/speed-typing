import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "../../test-utils.js"
import TestStats from './TestStats.jsx'

describe('TestStats', () => {
  beforeEach(() => {
    render(<TestStats timeRemaining={60} wordsPerMinute={0}/>)
  })

  it('should render "time remaining"', () => {
    expect(screen.getByText(/time remaining/i)).toBeInTheDocument()
  })

  it('should initiate "time remaining" time at 60 seconds', () => {
    expect(+screen.getByTestId('time-remaining').textContent).toEqual(60)
  })

  it('should render "speed"', () => {
    expect(screen.getByText(/speed/i)).toBeInTheDocument()
  })

  it('should initiate speed in WPM at 0', () => {
    expect(+screen.getByTestId('typing-speed').textContent).toEqual(0)
  })
})
