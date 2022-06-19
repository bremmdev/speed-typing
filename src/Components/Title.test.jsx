import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "../../test-utils.js"
import Title from './Title.jsx'

describe('Title', () => {
  beforeEach(() => {
    render(<Title />)
  })

  it('should render title of the page', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('should render "type the following words"', () => {
    expect(screen.getByText("type the following words", { exact: false })).toBeInTheDocument()
  })
})