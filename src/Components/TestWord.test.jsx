import { describe, expect, it } from "vitest"
import '@testing-library/jest-dom'
import { render, screen } from "../../test-utils.js"
import TestWord from './TestWord.jsx'

describe('TestWord', () => {
  it('should have test-word class on render', () => {
    render(<TestWord word="imagine" isActive={false} isWrong={false}/>)
    expect(screen.getByText('imagine')).toHaveClass('test-word')
  })

  it('should not have active class on render', () => {
    render(<TestWord word="imagine" isActive={false} isWrong={false}/>)
    expect(screen.getByText('imagine')).not.toHaveClass('active')
  })

  it('should not have wrong class on render', () => {
    render(<TestWord word="imagine" isActive={false} isWrong={false}/>)
    expect(screen.getByText('imagine')).not.toHaveClass('wrong')
  })

  it('should have test-word class when word isActive', () => {
    render(<TestWord word="imagine" isActive={true} isWrong={false}/>)
    expect(screen.getByText('imagine')).toHaveClass('test-word')
  })

  it('should have active class when word isActive', () => {
    render(<TestWord word="imagine" isActive={true} isWrong={false}/>)
      expect(screen.getByText('imagine')).toHaveClass('active')
  })

  it('should not have wrong class when word isActive', () => {
    render(<TestWord word="imagine" isActive={true} isWrong={false}/>)
    expect(screen.getByText('imagine')).not.toHaveClass('wrong')
  })

  it('should have test-word class when word isWrong', () => {
    render(<TestWord word="imagine" isActive={false} isWrong={true}/>)
    expect(screen.getByText('imagine')).toHaveClass('test-word')
  })

  it('should not have active class when word isWrong', () => {
    render(<TestWord word="imagine" isActive={false} isWrong={true}/>)
    expect(screen.getByText('imagine')).not.toHaveClass('active')
  })

  it('should have wrong class when word isWrong', () => {
    render(<TestWord word="imagine" isActive={false} isWrong={true}/>)
     expect(screen.getByText('imagine')).toHaveClass('wrong')
  })
})