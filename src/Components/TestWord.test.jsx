import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "../../test-utils.js"
import TestWord from './TestWord.jsx'

describe('TestWord', () => {
  it('should have test-word class on render', () => {
    render(<TestWord word="imagine" isCurrent={false} isIncorrect={false}/>)
    expect(screen.getByText('imagine')).toHaveClass('test-word')
  })

  it('should not have current class on render', () => {
    render(<TestWord word="imagine" isCurrent={false} isIncorrect={false}/>)
    expect(screen.getByText('imagine')).not.toHaveClass('current')
  })

  it('should not have incorrect class on render', () => {
    render(<TestWord word="imagine" isCurrent={false} isIncorrect={false}/>)
    expect(screen.getByText('imagine')).not.toHaveClass('incorrect')
  })

  it('should have test-word class when word isCurrent', () => {
    render(<TestWord word="imagine" isCurrent={true} isIncorrect={false}/>)
    expect(screen.getByText('imagine')).toHaveClass('test-word')
  })

  it('should have current class when word isCurrent', () => {
    render(<TestWord word="imagine" isCurrent={true} isIncorrect={false}/>)
      expect(screen.getByText('imagine')).toHaveClass('current')
  })

  it('should not have incorrect class when word isCurrent', () => {
    render(<TestWord word="imagine" isCurrent={true} isIncorrect={false}/>)
    expect(screen.getByText('imagine')).not.toHaveClass('incorrect')
  })

  it('should have test-word class when word isIncorrect', () => {
    render(<TestWord word="imagine" isCurrent={false} isIncorrect={true}/>)
    expect(screen.getByText('imagine')).toHaveClass('test-word')
  })

  it('should not have current class when word isIncorrect', () => {
    render(<TestWord word="imagine" isCurrent={false} isIncorrect={true}/>)
    expect(screen.getByText('imagine')).not.toHaveClass('current')
  })

  it('should have incorrect class when word isIncorrect', () => {
    render(<TestWord word="imagine" isCurrent={false} isIncorrect={true}/>)
     expect(screen.getByText('imagine')).toHaveClass('incorrect')
  })
})