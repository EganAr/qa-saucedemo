# SauceDemo Playwright Test Plan

## 1. Purpose and scope

Define repeatable UI coverage for login, product display, cart operations, checkout validation, and successful checkout at <https://www.saucedemo.com/>. The normal regression suite checks expected behavior with `standard_user`. A separate diagnostic suite investigates the reported account-specific differences without treating them as confirmed defects.

In scope: public demo-account login, inventory and product details, cart state, checkout information and order confirmation, plus bounded diagnostic checks of the four named accounts. Formal load testing, API testing, security testing, and cross-browser-specific certification are out of scope.

## 2. Test environment and data

- Use the existing Playwright project configuration: `testDir: ./tests`, with Chromium, Firefox, and WebKit projects. No `baseURL` is currently configured.
- Run against the public SauceDemo site; the site and its demo data can change independently of this repository.
- Normal regression account: `standard_user`; password: `secret_sauce`.
- Diagnostic accounts: `problem_user`, `performance_glitch_user`, `error_user`, and `visual_user`; password: `secret_sauce`.
- Login validation also uses `locked_out_user` with `secret_sauce`; invalid-credential cases use a deliberately incorrect username or password.
- Start each scenario with a fresh browser context/page and app state. Do not depend on execution order or shared cart state. Use a non-empty cart for checkout validation and successful-checkout cases unless stated otherwise.
- Prefer accessible roles/names and the app's existing `data-test` attributes. Assert user-visible state, not merely that an action completed. Do not add hard performance thresholds to functional tests.

## 3. How to interpret results

**Expected behavior** below is the proposed normal acceptance baseline. **Actual findings** are observations from `manual-test-report/findings.md` and `../manual-testing/case.md`; they are not requirements and are not confirmed bugs. A diagnostic case should record the actual result and useful evidence. Promote an observation to a regression assertion only after its expected behavior is agreed and the behavior is reproducible.

On the live site during plan preparation, `standard_user` showed six inventory products; the Backpack card and detail displayed the same title, description, and price. Opening a product showed its image, title, description, price, and Add to cart control. The empty cart's Checkout button opened checkout information; submitting that form empty displayed “First Name is required.” These spot checks are context, not a substitute for executing the cases in the configured browsers.

## 4. Normal regression suite

### TC-AUTH-001 — Log in with valid credentials

- **Suite:** Normal regression
- **Preconditions:** Login page is available; use a fresh context.
- **Steps:**
  1. Open the login page.
  2. Enter `standard_user` and `secret_sauce`.
  3. Select Login.
- **Expected results:** Login succeeds, the inventory page is shown, and the Products heading and product list are visible.

### TC-AUTH-002 — Reject an empty username

- **Suite:** Normal regression
- **Preconditions:** Login page is available; use a fresh context.
- **Steps:**
  1. Leave Username empty.
  2. Enter `secret_sauce` in Password.
  3. Select Login.
- **Expected results:** Login is rejected, the user remains on the login page, and a visible validation message identifies the missing username.

### TC-AUTH-003 — Reject an empty password

- **Suite:** Normal regression
- **Preconditions:** Login page is available; use a fresh context.
- **Steps:**
  1. Enter `standard_user` in Username.
  2. Leave Password empty.
  3. Select Login.
- **Expected results:** Login is rejected, the user remains on the login page, and a visible validation message identifies the missing password.

### TC-AUTH-004 — Reject invalid credentials

- **Suite:** Normal regression
- **Preconditions:** Login page is available; use a fresh context.
- **Steps:**
  1. Enter an invalid username with `secret_sauce` (or `standard_user` with an incorrect password).
  2. Select Login.
- **Expected results:** Login is rejected and visible error feedback is shown; the inventory page is not opened.

### TC-AUTH-005 — Reject a locked-out account

- **Suite:** Normal regression
- **Preconditions:** Login page is available; use a fresh context.
- **Steps:**
  1. Enter `locked_out_user` and `secret_sauce`.
  2. Select Login.
- **Expected results:** Login is rejected, the user remains on the login page, and the error feedback indicates the account is locked out.

### TC-PROD-001 — Display the standard inventory

- **Suite:** Normal regression
- **Preconditions:** Fresh context; `standard_user` can log in.
- **Steps:**
  1. Log in as `standard_user`.
  2. Inspect the inventory heading and product cards.
- **Expected results:** The inventory page is displayed with six products. Each card has a non-empty title, price, description, product image with meaningful alternative text, and an Add to cart control. No image is broken.

### TC-PROD-002 — Keep product information consistent between listing and detail

- **Suite:** Normal regression
- **Preconditions:** Logged in as `standard_user`; inventory is displayed.
- **Steps:**
  1. Choose a product card, such as Sauce Labs Backpack.
  2. Open its detail page.
  3. Compare the detail title, price, description, and image alternative text with the selected card.
  4. Return to the inventory.
- **Expected results:** The detail page identifies the same product and shows matching title, price, and description; the product image loads and identifies the same item. The return control takes the user back to the inventory.

### TC-CART-001 — Add and remove a product from the inventory

- **Suite:** Normal regression
- **Preconditions:** Fresh context; logged in as `standard_user`; cart is empty.
- **Steps:**
  1. Add Sauce Labs Backpack from its inventory card.
  2. Verify the cart indicator and the card's action state.
  3. Remove the Backpack from the inventory.
- **Expected results:** Adding updates the cart indicator to one and changes the product action to Remove. Removing restores the Add to cart action and clears the cart indicator.

### TC-CART-002 — Verify cart contents and remove an item from the cart

- **Suite:** Normal regression
- **Preconditions:** Fresh context; logged in as `standard_user`; cart is empty.
- **Steps:**
  1. Add Sauce Labs Backpack and Sauce Labs Bike Light.
  2. Open the cart.
  3. Verify both products and their quantities.
  4. Remove the Backpack from the cart page.
- **Expected results:** The cart shows exactly the two selected products with quantity one each. Removing the Backpack removes only that row and updates the cart indicator; the Bike Light remains.

### TC-CHECK-001 — Require first name in checkout information

- **Suite:** Normal regression
- **Preconditions:** Logged in as `standard_user`; at least one product is in the cart; checkout information page is open.
- **Steps:**
  1. Leave First Name empty; fill Last Name and Zip/Postal Code with valid test values.
  2. Select Continue.
- **Expected results:** Checkout does not advance; visible validation feedback identifies First Name as required.

### TC-CHECK-002 — Require last name in checkout information

- **Suite:** Normal regression
- **Preconditions:** Same as TC-CHECK-001; start with a fresh checkout attempt.
- **Steps:**
  1. Fill First Name and Zip/Postal Code with valid test values; leave Last Name empty.
  2. Select Continue.
- **Expected results:** Checkout does not advance; visible validation feedback identifies Last Name as required.

### TC-CHECK-003 — Require postal code in checkout information

- **Suite:** Normal regression
- **Preconditions:** Same as TC-CHECK-001; start with a fresh checkout attempt.
- **Steps:**
  1. Fill First Name and Last Name with valid test values; leave Zip/Postal Code empty.
  2. Select Continue.
- **Expected results:** Checkout does not advance; visible validation feedback identifies Zip/Postal Code as required.

### TC-CHECK-004 — Complete a valid purchase

- **Suite:** Normal regression
- **Preconditions:** Fresh context; logged in as `standard_user`; add Sauce Labs Backpack to the cart.
- **Steps:**
  1. Open the cart and verify the Backpack is present.
  2. Select Checkout.
  3. Enter non-empty first name, last name, and postal code; select Continue.
  4. Review the order summary and select Finish.
- **Expected results:** The order summary contains the selected product and a coherent subtotal, tax, and total. Finish completes checkout and shows the order-confirmation message. This is an end-to-end happy path; do not duplicate it in a new test if the existing test already verifies it.

## 5. Separate diagnostic suite

Run these cases independently from normal regression. Their expected results describe what to inspect and record; they do not assert that the historical observation is a confirmed defect. Capture the account, product, route, observed value/state, and screenshot or trace when useful. Use the same viewport and browser when comparing accounts.

### TC-DIAG-STD-001 — Recheck reported standard-user catalog mismatch

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh context; `standard_user` credentials; inventory is available.
- **Steps:**
  1. Inspect the Sauce Labs Backpack and Test.allTheThings() T-Shirt (Red) cards.
  2. Open each product detail and compare title, description, price, and image with its own card.
- **Expected results:** Record whether each product's card and detail data are internally consistent. The manual report mentioned an apparent Backpack-description/T-shirt-title mismatch; verify the products and capture evidence before assigning expected catalog content or logging a defect.

### TC-DIAG-PROBLEM-001 — Inspect problem-user product listing and details

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh context; log in as `problem_user`.
- **Steps:**
  1. Inspect all product cards and image loading.
  2. Locate Sauce Labs Fleece Jacket and attempt to open its details.
  3. Compare any opened detail title, price, description, and image with its listing card.
- **Expected results:** Record missing products, broken images, inaccessible details, and field mismatches with product names and evidence. Historical reports mention these symptoms; their cause and correct expected content are unverified.

### TC-DIAG-PROBLEM-002 — Inspect problem-user cart operations

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh `problem_user` session; empty cart.
- **Steps:**
  1. Attempt to add representative products, including the reported inaccessible product if it is reproducible.
  2. Check the cart indicator and cart rows after each action.
  3. Attempt removal from both the inventory and cart page.
- **Expected results:** Record each action's result and whether cart count, row contents, and button state agree. The report of an item being addable but absent from the cart/removal controls is unconfirmed; do not encode it as expected behavior.

### TC-DIAG-PROBLEM-003 — Inspect problem-user checkout information

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh `problem_user` session with at least one cart item; checkout information page is open.
- **Steps:**
  1. Fill First Name, Last Name, and Zip/Postal Code with non-empty values.
  2. Verify the displayed Last Name value.
  3. Select Continue and record the resulting page or validation.
- **Expected results:** Record whether Last Name accepts input and checkout advances. The manual report says Last Name could not be filled; confirm reproducibility before determining whether behavior violates the normal checkout expectation.

### TC-DIAG-PERF-001 — Observe performance-glitch inventory loading

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh browser context; record browser/project and viewport; `performance_glitch_user` credentials available.
- **Steps:**
  1. Log in as `performance_glitch_user` and observe navigation to inventory.
  2. Record navigation and inventory-render timing for several repeat runs; optionally repeat with `standard_user` under the same conditions.
  3. Check whether all product cards become visible and usable.
- **Expected results:** Record timings, run conditions, and any incomplete rendering or interaction failures. Historical notes describe the inventory as unusually slow. This is an observation only: do not fail functional regression on an arbitrary duration or present these repeats as formal load testing.

### TC-DIAG-ERROR-001 — Inspect error-user product details

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh context; logged in as `error_user`.
- **Steps:**
  1. Open product details for items reported to have empty descriptions.
  2. Record title, price, description, and image state.
- **Expected results:** Record which product fields are empty or inconsistent and capture evidence. The reported empty description is unconfirmed; compare with the listing and a standard-user session before drawing a conclusion.

### TC-DIAG-ERROR-002 — Inspect error-user cart actions

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh `error_user` session; empty cart.
- **Steps:**
  1. Add a representative product from inventory and verify the cart.
  2. Attempt to remove it from inventory.
  3. If it remains, remove it from the cart page and recheck the indicator and rows.
- **Expected results:** Record whether each action updates button state, cart count, and cart rows consistently. The report says some add/remove actions failed or removal worked only from the cart; these remain observations pending reproduction.

### TC-DIAG-ERROR-003 — Inspect error-user checkout flow

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh `error_user` session with a cart item; checkout information page is open.
- **Steps:**
  1. Fill each checkout field and verify the values shown.
  2. Select Continue and record whether the order summary opens.
  3. If available, select Finish and record the result.
- **Expected results:** Record whether Last Name accepts input and whether checkout reaches the summary and confirmation. The reported Last Name and completion problems are unconfirmed; compare behavior with the normal checkout baseline without weakening its assertions.

### TC-DIAG-VISUAL-001 — Inspect visual-user product and layout rendering

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh context; fixed browser project and viewport; logged in as `visual_user`.
- **Steps:**
  1. Compare product titles, prices, descriptions, and images with their cards/details.
  2. Inspect alignment of Add to cart controls, especially the last product row, and the cart control.
  3. Capture screenshots at the same viewport as a standard-user run.
- **Expected results:** Record visible content differences and layout displacement with screenshots. Historical reports mention product inconsistency and misalignment; do not assert pixel-perfect parity or call a visual defect confirmed without an agreed visual baseline.

### TC-DIAG-VISUAL-002 — Inspect visual-user cart and checkout behavior

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh `visual_user` session; add one product to the cart.
- **Steps:**
  1. Open the cart and verify item state and controls.
  2. Select Checkout and observe the transition to checkout information.
  3. Complete all fields, continue, review the order summary, and attempt Finish.
  4. Record cart-icon visibility/alignment throughout and capture screenshots.
- **Expected results:** Record whether cart operations and checkout reach confirmation, plus the cart icon's appearance at each step. Manual findings say cart actions worked, cart-page checkout was unexpected, the icon remained visible/misaligned, and checkout appeared successful; each point requires verification and is not a confirmed defect.

### TC-DIAG-CHECK-001 — Determine empty-cart checkout behavior

- **Suite:** Separate diagnostic
- **Preconditions:** Fresh `standard_user` session; cart is empty.
- **Steps:**
  1. Open the cart and verify it contains no product rows.
  2. Select Checkout.
  3. Enter valid checkout information and continue.
  4. Record the order summary and whether Finish can produce a confirmation.
- **Expected results:** Record each reachable route, displayed summary, and final outcome. Manual findings and live exploration show checkout can be initiated from an empty cart, but the intended empty-cart policy and whether an order can be completed have not been established. Do not classify this observation as a defect without that requirement.

## 6. Existing automation coverage and gaps

- `tests/cart.spec.ts` already exercises a `standard_user` end-to-end path: login, inventory visibility, adding the Backpack, cart badge and contents, checkout information, order summary, Finish, and confirmation. TC-CHECK-004 documents this existing happy path; avoid adding a duplicate test.
- The current test does not cover login validation, product-data consistency, cart removal, checkout field validation, empty-cart behavior, or the four diagnostic accounts.
- `tests/seed.spec.ts` is a generated-code placeholder, not a completed test. Leave it unchanged; use the existing project configuration and seed file as context when selecting future automation targets.
- This plan does not modify existing tests or application code. Add future tests only after checking the scenario against the coverage above.

## 7. Execution and reporting

Run normal regression independently from diagnostic checks, using the configured browser projects. Keep scenarios isolated with fresh contexts and explicit account setup; do not rely on test ordering. For a reproducible failure, report the case ID, account, browser/project, steps, expected result, actual result, and relevant screenshot or trace. For diagnostics, distinguish a reproduced observation from a confirmed defect and state what expected behavior remains to be agreed.
