# SauceDemo — Manual Testing Findings

## Application Information

- Application: SauceDemo
- URL: https://www.saucedemo.com/
- Testing type: Manual Functional Testing
- Tester: eganAr
- Test date: 2026-10-20

## Objective

Use existing manual testing observations to create a structured Playwright test plan, generate automated regression tests, and investigate test failures without hiding genuine application defects.

## Test Accounts

- `standard_user`
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`
- `error_user`
- `visual_user`

Use `secret_sauce` as the password for the demo accounts.

## 1. Login

Existing scenarios:

- Successful login using `standard_user`.
- Login with an empty username.
- Login with an empty password.
- Login with incorrect credentials.
- Login using `locked_out_user`.

Expected behavior:

- Valid credentials should allow access to the inventory page.
- Missing or invalid credentials should display an appropriate error.
- A locked account should not be allowed to log in.

## 2. Product Display

Observed findings:

### standard_user
- Sauce Labs Backpack description appeared inconsistent with the product title `Test.allTheThings() T-Shirt (Red)`.

### problem_user
- Some product images were broken.
- Sauce Labs Fleece Jacket could not be found or opened as expected.
- Product detail titles, prices, or descriptions appeared inconsistent.

### performance_glitch_user
- The inventory page appeared unusually slow to load.

### error_user
- A product detail page displayed an empty description.

### visual_user
- Product details appeared inconsistent.
- Add to Cart buttons and the cart icon appeared misaligned.

## 3. Cart

### standard_user
- Adding and removing products appeared to work as expected.

### problem_user
- Some products could not be added or removed as expected.
- A product that was inaccessible from the listing appeared to be addable but did not appear in the cart and could not be removed as expected.

### error_user
- Some add/remove operations did not behave as expected.
- Some products could only be removed from the cart page.

### visual_user
- Cart actions appeared to work.
- Checkout behavior from the cart page appeared unexpected and requires verification.

## 4. Checkout

### Multiple accounts
- Checkout could apparently be initiated with an empty cart. Verify the exact behavior and whether an order can actually be completed.

### problem_user
- The last name field could not be filled as expected, blocking checkout.

### error_user
- The last name field could not be filled as expected.
- The checkout button still appeared to work, but the checkout process could not be completed.

### visual_user
- The cart icon remained visible during checkout.
- The observed checkout flow appeared to complete successfully. Verify the confirmation page and order summary.

## Automation Scope

Prioritize the following:

1. Login success and login validation.
2. Product listing and product details.
3. Add/remove cart operations.
4. Checkout form validation.
5. Successful checkout with a valid cart.
6. Empty-cart checkout behavior.
7. Account-specific anomalies listed above.
8. Performance and visual findings where reliable automated assertions are appropriate.

## Rules for Test Generation

- Use the manual findings as observations, not unquestionable requirements.
- Separate expected behavior from observed behavior.
- Do not label an observation a confirmed defect without a reproducible test and a clear expected result.
- Prefer stable, accessible locators or existing `data-test` attributes.
- Use meaningful assertions; do not assert only that a click completed.
- Avoid unnecessary duplication across accounts.
- Keep the normal regression suite focused on expected application behavior.
- Put known-bug or exploratory checks in a separate suite when they are expected to fail.
- Document account-specific differences rather than assuming all accounts should behave identically.

## Rules for Test Healing

- A failed test may indicate a genuine application defect, a bad locator, a timing issue, or an incorrect expectation.
- Investigate the root cause before modifying a failing test.
- Never weaken or delete an assertion solely to make a test pass.
- Never change the expected result without explaining the requirement or evidence that supports the change.
- If the application behaves contrary to the expected result, preserve the failure and report it as a potential defect.