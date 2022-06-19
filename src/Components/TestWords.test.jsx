import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "../../test-utils.js"
import TestWords from './TestWords.jsx'

describe('TestWords', () => {
  beforeEach(() => {
    render(<TestWords />)
  })

  it('should render testWords container', () => {
    expect(screen.getByTestId('test-words')).toBeInTheDocument()
  })

  it('should render 60 words', () => {
    const wordElements = screen.getByTestId('test-words').querySelectorAll('span')
    expect(wordElements).toHaveLength(60)
  })

  it('should render 60 different words', () => {
    const words = []
    const wordElements = screen.getByTestId('test-words').querySelectorAll('span')
    wordElements.forEach(element => {
      words.push(element.textContent)
    })
    const uniqueValues = [...new Set(words)]
    expect(uniqueValues).toHaveLength(60)
  })
})