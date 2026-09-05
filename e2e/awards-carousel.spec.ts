import { expect, test } from '@playwright/test';

test.describe('AwardsCarousel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the awards section', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Awards and recognition',
      }),
    ).toBeVisible();
  });

  test('renders the award cards', async ({ page }) => {
    const heading = page.getByRole('heading', {
      name: 'Awards and recognition',
    });

    await expect(heading).toBeVisible();

    const cards = page.locator('article');

    await expect(cards).toHaveCount(26);
  });
  test('hides the duplicated award group from screen readers', async ({ page }) => {
    const groups = page.getByTestId('awards-carousel-group');

    await expect(groups).toHaveCount(2);

    await expect(groups.nth(0)).toHaveAttribute('aria-hidden', 'false');

    await expect(groups.nth(1)).toHaveAttribute('aria-hidden', 'true');
  });
  test('renders correctly on mobile', async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto('/');

    await expect(
      page.getByRole('heading', {
        name: 'Awards and recognition',
      }),
    ).toBeVisible();
  });
});
