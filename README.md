# SauceDemo — Manual & Automation QA Testing Portfolio

## Project Overview

This project documents manual functional testing performed on [SauceDemo](https://www.saucedemo.com/), a demo e-commerce application.

The objective is to evaluate application behavior, identify unexpected results, verify core user flows, and document test evidence across different demo accounts.

This portfolio demonstrates my approach to functional testing, exploratory testing, test case documentation, and defect identification.

## Scope of Testing

The following features have been tested:

- **Login:** Valid credentials, empty fields, invalid credentials, and locked-out user behavior.
- **Product Display:** Product information consistency, images, product details, and account-specific display behavior.
- **Shopping Cart:** Adding and removing products, cart contents, and account-specific behavior.
- **Checkout:** Checkout behavior, customer information fields, and checkout flow across different demo accounts.

## Test Accounts

Testing covers the following SauceDemo accounts:

- `standard_user`
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`
- `error_user`
- `visual_user`

These accounts are used to explore differences in application behavior under different conditions.

## Repository Structure

```text
manual-testing/
├── Test-case.md
├── test-plan.md
└── image-result/
    ├── image.png
    ├── image-1.png
    └── ...
```

- **Test-case.md:** Documents test scenarios, preconditions, test steps, expected results where defined, actual results, and supporting screenshots.
- **test-plan.md:** Describes the testing objectives, scope, approach, environment, and completion criteria.
- **image-result/:** Contains screenshots captured during testing.

## Testing Approach

I use manual functional and exploratory testing to evaluate application behavior. I compare observed results with expected behavior, investigate inconsistencies, and capture screenshots as supporting evidence.

## Tools and Technologies

- Manual Testing
- Markdown
- Git and GitHub
- Browser-based testing
- Playwright and TypeScript

## Disclaimer

This is an independent QA practice project using the publicly available SauceDemo demonstration application. Observed behaviors are documented for learning and portfolio purposes and should not be interpreted as confirmed defects in a production application.