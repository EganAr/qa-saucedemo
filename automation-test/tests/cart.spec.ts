import { test, expect } from '@playwright/test';

test('standard user can add a backpack to the cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

  await page
    .locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    .click();

  await expect(
    page.locator('[data-test="shopping-cart-badge"]')
  ).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(
    page.getByText('Sauce Labs Backpack', { exact: true })
  ).toBeVisible();

  await page
    .getByRole('button', {name: "Checkout"})
    .click();

  await expect(page).toHaveURL(/checkout-step-one\.html/);
  
  await page.getByLabel("First Name").fill('standard');
  await page.getByLabel("Last Name").fill('user');
  await page.getByLabel("Zip/Postal Code").fill('221122');

   await page
    .getByRole('button', {name: "Continue"})
    .click();
  
  await expect(page).toHaveURL(/checkout-step-two\.html/);

  await page
    .getByRole('button', {name: "Finish"})
    .click();

  await expect(
    page.getByText('Thank you for your order!', { exact: true })
  ).toBeVisible();

});

// test('locked out user cannot log in', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/');

//   await page.locator('[data-test="username"]').fill('locked_out_user');
//   await page.locator('[data-test="password"]').fill('secret_sauce');
//   await page.locator('[data-test="login-button"]').click();

//   await expect(page.locator('[data-test="error"]'))
//     .toContainText('locked out');
// });