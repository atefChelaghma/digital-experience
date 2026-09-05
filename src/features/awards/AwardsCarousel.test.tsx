import { render, screen } from '@testing-library/react';

import { AwardsCarousel } from './AwardsCarousel';
import { awards } from './awards.data';

describe('AwardsCarousel', () => {
  it('renders the awards section', () => {
    render(<AwardsCarousel />);

    expect(
      screen.getByRole('heading', {
        name: /awards and recognition/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders all awards', () => {
    render(<AwardsCarousel />);

    awards.forEach((award) => {
      expect(screen.getAllByText(`(${award.number})`)).toHaveLength(2);
    });
  });

  it('renders the accessible heading', () => {
    render(<AwardsCarousel />);

    const heading = screen.getByRole('heading', {
      name: /awards and recognition/i,
    });

    expect(heading).toHaveClass('sr-only');
  });

  it('renders the award groups', () => {
    render(<AwardsCarousel />);

    const groups = screen.getAllByRole('generic', {
      hidden: true,
    });

    expect(groups.length).toBeGreaterThan(0);
  });

  it('uses the default animation speed', () => {
    render(<AwardsCarousel />);

    const track = screen
      .getByRole('heading', {
        name: /awards and recognition/i,
      })
      .parentElement?.querySelector('[class*="track"]');

    expect(track).toHaveStyle('--marquee-duration: 90s');
  });

  it('uses a custom animation speed', () => {
    render(<AwardsCarousel speed={120} />);

    const track = screen
      .getByRole('heading', {
        name: /awards and recognition/i,
      })
      .parentElement?.querySelector('[class*="track"]');

    expect(track).toHaveStyle('--marquee-duration: 120s');
  });
});
