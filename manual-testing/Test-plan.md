# Manual QA Test Plan — SauceDemo

## 1. Test Information

- **Application:** SauceDemo
- **URL:** https://www.saucedemo.com/
- **Test Type:** Manual Functional Testing and Exploratory Testing
- **Tester:** eganAr
- **Test Date:** 2026-10-20 - 2026-10-21

## 2. Test Objectives

The objectives of this testing activity are to:

- Verify core e-commerce functionality.
- Identify unexpected behavior and inconsistencies across different demo accounts.
- Evaluate input validation and user flow behavior.
- Document actual results and capture screenshots as supporting evidence.
- Build practical experience in test design, execution, and defect reporting.

## 3. Test Scope

### In Scope

**Login**
- Login with valid credentials.
- Login with empty fields.
- Login with invalid credentials.
- Login with locked-out user credentials.

**Product Display**
- Verify product listings and product information.
- Check product titles, descriptions, prices, and images.
- Investigate unexpected product display behavior across demo accounts.
- Observe page loading behavior.

**Shopping Cart**
- Add products to the cart.
- Remove products from the cart.
- Verify cart contents and button behavior.
- Investigate differences across demo accounts.

**Checkout**
- Access the checkout process.
- Check customer information fields.
- Observe checkout behavior with empty carts.
- Verify whether the checkout process can be completed across different demo accounts.

### Out of Scope

- Formal performance and load testing.
- Production security testing and penetration testing.
- API testing.
- Cross-browser compatibility testing beyond the selected test environment.
- Testing against internal implementation details unavailable to the tester.

## 4. Test Environment

- **Application:** SauceDemo
- **Platform:** Web application
- **Browser:** Record the browser and version used during execution.
- **Operating System:** Record the operating system used during execution.
- **Test Data:** Public SauceDemo demo accounts.

## 5. Test Approach

Testing is performed manually through the application's user interface.

1. Log in using the selected demo account.
2. Execute the applicable test scenario.
3. Compare the observed behavior with the expected result, where defined.
4. Record the actual result.
5. Capture screenshots for unexpected behavior.
6. Repeat the test when necessary to check reproducibility.
7. Document confirmed and reproducible issues separately from observations whose expected behavior has not been established.

Different demo accounts are used to investigate account-specific behavior. Observations alone are not treated as confirmed defects without sufficient evidence and a clear expected result.

## 6. Entry Criteria

Testing can begin when:

- The SauceDemo website is accessible.
- Demo account credentials are available.
- The browser and test environment are operational.
- The relevant test scenarios are documented.

## 7. Exit Criteria

The testing activity is considered complete when:

- Planned test scenarios have been executed or their execution status documented.
- Actual results and relevant screenshots have been recorded.
- Unexpected behaviors have been documented.
- Reproducible issues have sufficient information for further investigation.
- Known limitations and unverified observations are clearly identified.

## 8. Test Deliverables

- `README.md` — Portfolio overview and repository guide.
- `../manual-testing/Test-plan.md` — Testing objectives, scope, and approach.
- `../manual-testing/Test-case.md` — Test cases and recorded execution results.
- `image-result/` — Screenshots collected during testing.