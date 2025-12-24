import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render the app', () => {
        render(<App />);
        expect(screen.getByText(/Headless UI Library/i)).toBeInTheDocument();
    });

    it('should have proper heading structure', () => {
        render(<App />);
        const heading = screen.getByRole('heading', { level: 1 });
        expect(heading).toHaveTextContent('Headless UI Library');
    });
});
