import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.teachings': 'Teachings',
        'nav.videos': 'Videos',
        'nav.events': 'Events',
        'nav.contact': 'Contact',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock LanguageSwitcher component
jest.mock('@/components/LanguageSwitcher', () => {
  return function MockLanguageSwitcher() {
    return <div data-testid="language-switcher">Language Switcher</div>;
  };
});

describe('Header Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Header />);
    expect(container).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Teachings')).toBeInTheDocument();
    expect(screen.getByText('Videos')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the language switcher', () => {
    render(<Header />);
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('renders the logo image', () => {
    render(<Header />);
    const logo = screen.getByAltText('Sri Harivyas Nikunja Mandir');
    expect(logo).toBeInTheDocument();
  });
});

