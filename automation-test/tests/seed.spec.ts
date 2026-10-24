import { expect, test, type Page } from '@playwright/test';

const baseUrl = 'https://www.saucedemo.com/';
const password = 'secret_sauce';

async function loginAsStandardUser(page: Page) {
  await page.goto(baseUrl);
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill(password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
}

test.describe('SauceDemo normal regression', () => {
  test('TC-AUTH-002 rejects an empty username', async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(baseUrl);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username is required',
    );
  });

  test('TC-AUTH-003 rejects an empty password', async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(baseUrl);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Password is required',
    );
  });

  test('TC-AUTH-004 rejects invalid credentials', async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(baseUrl);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match',
    );
  });

  test('TC-AUTH-005 rejects a locked-out account', async ({ page }) => {
    await page.goto(baseUrl);
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(baseUrl);
    await expect(page.locator('[data-test="error"]')).toContainText(
      'locked out',
    );
  });

  test('TC-CART-001 adds and removes a product from inventory', async ({
    page,
  }) => {
    await loginAsStandardUser(page);

    const addBackpack = page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]',
    );
    await addBackpack.click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      '1',
    );
    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]'),
    ).toBeVisible();

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
    ).toHaveCount(0);
    await expect(
      page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
    ).toBeVisible();
  });

  test('TC-CART-002 verifies cart contents and removes one item', async ({
    page,
  }) => {
    await loginAsStandardUser(page);
    await page
      .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
      .click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();

    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      '2',
    );
    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText('Sauce Labs Bike Light', { exact: true }),
    ).toBeVisible();

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByText('Sauce Labs Bike Light', { exact: true }),
    ).toBeVisible();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText(
      '1',
    );
  });
});
