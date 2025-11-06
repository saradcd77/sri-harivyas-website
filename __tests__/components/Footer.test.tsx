import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'footer.tagline': 'Spreading Divine Love and Devotion',
        'footer.quickLinks': 'Quick Links',
        'footer.contact': 'Contact',
        'footer.followUs': 'Follow Us',
        'footer.rights': 'All rights reserved',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Footer Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();
  });

  it('renders the logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders social media links', () => {
    const { container } = render(<Footer />);
    const links = container.querySelectorAll('a[href*="youtube"], a[href*="facebook"], a[href*="instagram"]');
    expect(links.length).toBe(3);
  });
});

