import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
import { describe, expect, it, vi } from 'vitest';

describe('Button', () => {
    it('renders with text', () => {
        render(<Button variant="primary" text="Click me" />);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies primary class', () => {
        render(<Button variant="primary" text="Primary" />);
        expect(screen.getByRole('button')).toHaveClass('btn-primary');
    });

    it('applies outline class', () => {
        render(<Button variant="outline" text="Outline" />);
        expect(screen.getByRole('button')).toHaveClass('btn-outline');
    });

    it('disables button', () => {
        render(<Button variant="primary" text="Disabled" disabled />);
        const button = screen.getByRole('button', { name: /disabled/i });
        expect(button).toBeDisabled();
    });

    it('fires onClick handler', async () => {
        const handleClick = vi.fn();
        render(<Button variant="primary" text="Click" onClick={handleClick} />);
        await userEvent.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders icon with spacing', () => {
        render(<Button variant="primary" icon={<svg data-testid="icon" />} text="Text" />);
        const icon = screen.getByTestId('icon');
        expect(icon.parentElement).toHaveClass('mr-2');
    });

    it('renders icon without spacing if no text', () => {
        render(<Button variant="primary" icon={<svg data-testid="icon" />} />);
        const icon = screen.getByTestId('icon');
        expect(icon.parentElement).toHaveClass('mr-0');
    });
});
