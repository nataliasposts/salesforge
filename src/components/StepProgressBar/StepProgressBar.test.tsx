import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import StepProgressBar from './StepProgressBar'
import { StepPath } from '../../features/enum'

const renderWithPath = (path: string) => {
    render(
        <MemoryRouter initialEntries={[path]}>
            <Routes>
                <Route path="*" element={<StepProgressBar />} />
            </Routes>
        </MemoryRouter>
    )
}

describe('StepProgressBar', () => {
    it('renders all steps with titles and descriptions', () => {
        renderWithPath(StepPath.ProductName)

        expect(screen.getByText('Name & Product')).toBeInTheDocument()
        expect(screen.getByText('Provide sequence name & product')).toBeInTheDocument()

        expect(screen.getByText('Sequence steps')).toBeInTheDocument()
        expect(screen.getByText('Create sequence steps for your sequence')).toBeInTheDocument()

        expect(screen.getByText('Summary')).toBeInTheDocument()
        expect(screen.getByText('Summary of your sequence')).toBeInTheDocument()
    })

    it('marks only first step as active initially', () => {
        renderWithPath(StepPath.ProductName)

        const nameStep = screen.getByText('Name & Product')
        expect(nameStep).toHaveClass('text-purple-700')

        const otherSteps = ['Sequence steps', 'Summary']
        otherSteps.forEach(title => {
            expect(screen.getByText(title)).toHaveClass('text-gray-900')
        })
    })

    it('marks first step as completed and second as active', () => {
        renderWithPath(StepPath.SequenceSteps)

        const nameStepCircle = screen.getByText('Name & Product').previousSibling as HTMLElement
        expect(nameStepCircle.className).toMatch(/border-purple-500/)

        const sequenceStep = screen.getByText('Sequence steps')
        expect(sequenceStep).toHaveClass('text-purple-700')
    })

    it('marks all steps as completed except last when at summary', () => {
        renderWithPath(StepPath.Summary)

        const doneSteps = ['Name & Product', 'Sequence steps']
        doneSteps.forEach((label) => {
            const circle = screen.getByText(label).previousSibling as HTMLElement
            expect(circle.className).toMatch(/border-purple-500/)
        })

        const summaryStep = screen.getByText('Summary')
        expect(summaryStep).toHaveClass('text-purple-700')
    })

    it('shows StepDoneIcon when step is completed', () => {
        renderWithPath(StepPath.Summary)

        const doneIcons = screen.getAllByTestId('step-done-icon')
        expect(doneIcons.length).toBeGreaterThanOrEqual(2)
    })
})
