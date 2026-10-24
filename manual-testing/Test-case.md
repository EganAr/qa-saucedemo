# Manual QA Test Cases — SauceDemo

## 1. Test Information

- **Application:** SauceDemo
- **URL:** https://www.saucedemo.com/
- **Test type:** Manual Functional Testing
- **Tester:** eganAr (https://github.com/EganAr)
- **Test date:** 2026-10-20 - 2026-10-21

## 2. Test Cases

### Feature: Login
### Objective: Ensure that login validation is handled correctly.

#### TC-LOGIN-001 — Log in with valid credentials

- **Preconditions:** The login page is accessible, and valid test credentials are available.
- **Test data:** Username: `standard_user`; Password: `secret_sauce`

**Steps:**
1. Open the login page.
2. Enter a valid username.
3. Enter the corresponding valid password.
4. Click the Login button.

- **Expected result:** The user successfully logs in and is redirected to the expected page.
- **Actual result:**
    - Login is successful. ![successfully login](/manual-testing/image-result/image.png)

#### TC-LOGIN-002 — Log in with an empty username

- **Preconditions:** The login page is accessible.
- **Test data:** Empty username; password populated.

**Steps:**
1. Open the login page.
2. Leave the username field empty.
3. Enter a password.
4. Click the Login button.

- **Expected result:** Login is rejected, and appropriate validation feedback is displayed.
- **Actual result:**
    - Login is rejected, and the appropriate error feedback is displayed. ![empty username](/manual-testing/image-result/image-1.png)

#### TC-LOGIN-003 — Log in with an empty password

- **Preconditions:** The login page is accessible.
- **Test data:** Username populated; empty password.

**Steps:**
1. Open the login page.
2. Enter a username.
3. Leave the password field empty.
4. Click the Login button.

- **Expected result:** Login is rejected, and appropriate validation feedback is displayed.
- **Actual result:**
    - Login is rejected, and the appropriate error feedback is displayed. ![empty password](/manual-testing/image-result/image-2.png)

#### TC-LOGIN-004 — Log in with incorrect credentials

- **Preconditions:** The login page is accessible.
- **Test data:** Incorrect username with a valid password; valid username with an incorrect password.

**Steps:**
1. Open the login page.
2. Enter an invalid username and/or password.
3. Click the Login button.

- **Expected result:** Login is rejected, and appropriate validation feedback is displayed for invalid credentials.
- **Actual result:**
    - Login is rejected, and the appropriate error feedback is displayed. ![wrong credentials](/manual-testing/image-result/image-3.png)

#### TC-LOGIN-005 — Log in with locked-out user credentials

- **Preconditions:** The login page is accessible.
- **Test data:** `locked_out_user` credentials.

**Steps:**
1. Open the login page.
2. Enter the `locked_out_user` credentials.
3. Click the Login button.

- **Expected result:** Login is rejected, and appropriate feedback is displayed to indicate that the user is locked out.
- **Actual result:**
    - Login is rejected, and the appropriate error feedback is displayed. ![locked-out](image-4.png)

### Feature: Product Display
### Objective: Verify that all products are displayed correctly.

#### TC-PROD-001 — Access `/inventory.html` with `standard_user`

- **Preconditions:** Log in with valid `standard_user` credentials.
- **Actual result:**
    - The description of the Sauce Labs Backpack and the title of the Test.allTheThings() T-Shirt (Red) need a fix.
![wrong displayed products](/manual-testing/image-result/image.png)

#### TC-PROD-002 — Access `/inventory.html` with `problem_user`

- **Preconditions:** Log in with valid `problem_user` credentials.
- **Actual result:**
    - All product images are displayed incorrectly.
    - The Sauce Labs Fleece Jacket resulting is not found.
    - On some product detail pages, the title, price, and description are inconsistent.
![problem-user-product](/manual-testing/image-result/image-5.png)
![items-not-found](/manual-testing/image-result/image-6.png)

#### TC-PROD-003 — Access `/inventory.html` with `performance_glitch_user`

- **Preconditions:** Log in with valid `performance_glitch_user` credentials.
- **Actual result:**
    - All products are displayed correctly. However, performance degrades when opening `/inventory.html`.

#### TC-PROD-004 — Access `/inventory.html` with `error_user`

- **Preconditions:** Log in with valid `error_user` credentials.
- **Actual result:**
    - All products are displayed correctly. However, the product detail page displays an empty description.
![empty-desc](/manual-testing/image-result/image-9.png)

#### TC-PROD-005 — Access `/inventory.html` with `visual_user`

- **Preconditions:** Log in with valid `visual_user` credentials.
- **Actual result:**
    - Products are not displayed correctly.
    - Product details, such as titles, images, and prices, are inconsistent.
    - The Add to Cart buttons in the last product row are misaligned.
    - The cart icon is misaligned.
![add-to-cart-not-align](/manual-testing/image-result/image-11.png)
![cart-logo-not-align](/manual-testing/image-result/image-12.png)

### Feature: Add/Remove Items from Cart
### Objective: Verify that adding and removing items works correctly and that `/cart.html` behaves as expected.

#### TC-CART-001 — Add and remove items from the cart with `standard_user`

- **Preconditions:** Log in with valid `standard_user` credentials.
- **Actual result:**
    - All Add to Cart and Remove buttons work correctly.
    - No unexpected behavior is observed on the `/cart.html` page.
![standard_users-cart](/manual-testing/image-result/image-14.png)
![standard_users-cart.html](/manual-testing/image-result/image-15.png)

#### TC-CART-002 — Add and remove items from the cart with `problem_user`

- **Preconditions:** Log in with valid `problem_user` credentials.
- **Actual result:**
    - Some products cannot be added to the cart, and some items cannot be removed.
    - An item `is not found` can be added to the cart, but it is not displayed in the cart and cannot be removed.
![problem_users-product](/manual-testing/image-result/image-8.png)
![problem_usesr-product](/manual-testing/image-result/image-7.png)

#### TC-CART-003 — Add and remove items from the cart with `error_user`

- **Preconditions:** Log in with valid `error_user` credentials.
- **Actual result:**
    - Some products cannot be added to the cart, and some items cannot be removed.
    - An item can only be removed from the `/cart.html` page.
![error_users-cart](/manual-testing/image-result/image-10.png)

#### TC-CART-004 — Add and remove items from the cart with `visual_user`

- **Preconditions:** Log in with valid `visual_user` credentials.
- **Actual result:**
    - All Add to Cart and Remove buttons work correctly.
    - The Checkout button on `/cart.html` behaves unexpectedly.
![visual_users-cart](/manual-testing/image-result/image-13.png)

### Feature: Checkout
### Objective: Verify that the checkout process is handled correctly.

#### TC-CHECK-001 — Checkout with `standard_user`

- **Preconditions:** Log in with valid `standard_user` credentials.
- **Actual result:**
    - Checkout can be initiated with an empty cart.
![checkout-standard_users](/manual-testing/image-result/image-16.png)

#### TC-CHECK-002 — Checkout with `problem_user`

- **Preconditions:** Log in with valid `problem_user` credentials.
- **Actual result:**
    - Checkout can be initiated with an empty cart.
    - The Last Name field cannot be filled in, preventing the checkout process from proceeding.
![checkout-problem_user](/manual-testing/image-result/image-17.png)

#### TC-CHECK-003 — Checkout with `performance_glitch_user`

- **Preconditions:** Log in with valid `performance_glitch_user` credentials.
- **Actual result:**
    - Checkout can be initiated with an empty cart.

#### TC-CHECK-004 — Checkout with `error_user`

- **Preconditions:** Log in with valid `error_user` credentials.
- **Actual result:**
    - Checkout can be initiated with an empty cart.
    - The Last Name field cannot be filled in, but the Checkout button remains functional.
    - The checkout process cannot be finished on `/checkout-step-two.html`.
![checkout-error_user](/manual-testing/image-result/image-18.png)

#### TC-CHECK-005 — Checkout with `visual_user`

- **Preconditions:** Log in with valid `visual_user` credentials.
- **Actual result:**
    - Checkout can be initiated with an empty cart.
    - The cart icon remains visible and misaligned throughout the checkout process.
![visual_user-cart](/manual-testing/image-result/image-19.png)
![checkout-process-success](/manual-testing/image-result/image-20.png)