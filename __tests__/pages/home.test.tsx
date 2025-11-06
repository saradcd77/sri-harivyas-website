import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({ children, href }: React.PropsWithChildren<{ href?: string }>) => {
    return <a href={href}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'home.welcome': 'Welcome to Sri Harivyas Nikunja Mandir',
        'home.subtitle': 'A Sacred Place of Divine Love and Devotion',
        'home.about': 'About Us',
        'home.teachings': 'Teachings',
        'home.videos': 'Videos',
        'home.events': 'Events',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <p {...props}>{children}</p>,
  },
}));

// Mock VideoGallery component
jest.mock('@/components/VideoGallery', () => {
  return function MockVideoGallery() {
    return <div data-testid="video-gallery">Video Gallery</div>;
  };
});

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByTestId('video-gallery')).toBeInTheDocument();
  });

  it('renders hero section with image', () => {
    render(<Home />);
    const heroImage = screen.getByAltText('Sri Harivyas Nikunja Mandir');
    expect(heroImage).toBeInTheDocument();
  });

  it('renders video gallery component', () => {
    render(<Home />);
    expect(screen.getByTestId('video-gallery')).toBeInTheDocument();
  });
});

