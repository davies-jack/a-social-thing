import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Navigation', () => {
  it('renders correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/randompage');
    render(<Navigation username="Test Username" />);
    const linkList = screen.getByRole('list');
    expect(linkList).toHaveClass('rounded-md');

    const linkListItems = screen.getAllByRole('listitem');
    expect(linkListItems[0]).toHaveClass('p-2 px-4 rounded-md bg-bg-card cursor-pointer shadow-md font-bold');
    expect(linkListItems[1]).toHaveClass('p-2 px-4 my-4 rounded-md bg-bg-card cursor-pointer shadow-md font-bold');
  });

  it('renders with the correct active styling classes when on the profile page', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile/jack');
    render(<Navigation username="jack" />);
    expect(screen.getByText('your profile')).toHaveClass('border border-bg-button');
  });

  it('renders with the correct active styling classes when on the dashboard page', () => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
    render(<Navigation username="jack" />);
    expect(screen.getByText('dashboard')).toHaveClass('border border-bg-button');
  });
});