import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render the app landing page', () => {
        render(<App />);
        expect(screen.getByText(/Headless UI Library/i)).toBeInTheDocument();
        expect(screen.getByText('Get Started')).toBeInTheDocument();
        expect(screen.getByText('View Components')).toBeInTheDocument();
    });

    it('should navigate to Guide view', () => {
        render(<App />);
        fireEvent.click(screen.getByText('Get Started'));
        expect(screen.getByText('Getting Started')).toBeInTheDocument();
        expect(screen.getByText('Installation')).toBeInTheDocument();

        // Test Back button
        fireEvent.click(screen.getByText('← Back to Home'));
        expect(screen.getByText(/Headless UI Library/i)).toBeInTheDocument();
    });

    it('should navigate to Components view', () => {
        render(<App />);
        fireEvent.click(screen.getByText('View Components'));
        expect(screen.getByText('Components')).toBeInTheDocument();
        expect(screen.getByText('Toast')).toBeInTheDocument(); // Check for Toast demo
    });
});
