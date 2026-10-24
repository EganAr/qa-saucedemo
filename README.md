# SauceDemo QA Testing Portfolio

A QA portfolio demonstrating manual functional testing, exploratory testing, defect reporting, and browser automation using Playwright and TypeScript.

## Project Overview

This project evaluates [SauceDemo](https://www.saucedemo.com/), a demonstration e-commerce application, through manual testing and automated regression testing.

The goal is to identify unexpected application behavior, validate critical user flows, document reproducible findings, and automate important test scenarios.

The portfolio is organized into two complementary projects:

- **Manual Testing:** Test planning, test case design, exploratory testing, defect documentation, and screenshot evidence.
- **Automation Testing:** Automated browser tests using Playwright and TypeScript, supported by Playwright Test Agents and a GitHub Actions workflow.

## Project Structure

```text
qa-saucedemo/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── manual-testing/
│   ├── Test-case.md
│   ├── Test-plan.md
│   └── image-result/
├── automation-test/
│   ├── .github/
│   │   └── agents/
│   ├── .vscode/
│   ├── manual-test-report/
│   │   └── findings.md
│   ├── specs/
│   │   └── saucedemo-test-plan.md
│   ├── tests/
│   ├── package.json
│   ├── package-lock.json
│   └── playwright.config.ts
└── README.md
```

Generated files such as `node_modules/`, `playwright-report/`, and `test-results/` are omitted from the structure above because they are dependencies or test artifacts rather than primary source files.

## 1. Manual Testing

The manual testing project focuses on functional behavior and exploratory testing across different SauceDemo demo accounts.

### Testing Scope

- **Login:** Valid and invalid credentials, empty fields, and locked-account validation.
- **Product Display:** Product information consistency, product images, product details, and account-specific behavior.
- **Shopping Cart:** Adding and removing products, cart contents, and cart behavior across accounts.
- **Checkout:** Required-field validation, checkout flow, and observed account-specific issues.

### Testing Deliverables

- Test plan and documented test cases.
- Actual results and observed application behavior.
- Bug reports for reproducible findings.
- Screenshots supporting test observations.

Observed behavior is distinguished from expected behavior. Findings are not automatically classified as confirmed defects without sufficient evidence and a clear expected result.

## 2. Automation Testing

The automation project uses Playwright and TypeScript to execute browser-based tests and verify application behavior through assertions.

### Automated Test Coverage

- Login validation, including invalid credentials and locked accounts.
- Adding and removing products from the shopping cart.
- Cart contents and item-count validation.
- Checkout and other critical user journeys covered by the existing test suite.

The automation suite complements manual testing by repeatedly checking important flows for regressions.

### Playwright Test Agents

Playwright Test Agents are used to support the test development workflow:

- **Planner:** Explores the application and creates a structured test plan.
- **Generator:** Converts selected scenarios into Playwright test code.
- **Healer:** Helps investigate failing tests and proposes evidence-based corrections.

Generated tests are reviewed against expected behavior and existing manual findings. Agent-generated code is not treated as automatically correct, and assertions should not be weakened merely to obtain passing results.

### Automation Test Workflow

The general workflow is:

1. Review manual test cases and recorded findings.
2. Create and review the automation test plan.
3. Generate or write automated tests.
4. Execute tests and investigate failures.
5. Review the results and maintain the regression suite.

## Tools and Technologies

- Manual Functional Testing
- Exploratory Testing
- Test Case Design and Defect Reporting
- Playwright
- TypeScript
- Node.js and npm
- Playwright Test Agents
- Git and GitHub
- GitHub Actions
- Markdown

## Running the Automated Tests

Prerequisites: Node.js and npm.

Open a terminal in the repository root, then navigate to the automation project:

```bash
cd automation-test
npm ci
npx playwright install
npx playwright test
```

To open the HTML test report after execution:

```bash
npx playwright show-report
```

The test runner reports the number of passed, failed, and skipped tests. Failed tests should be investigated to determine whether the cause is an automation issue, an incorrect expectation, or unexpected application behavior.

## Continuous Integration

The GitHub Actions workflow is intended to run the Playwright test suite when relevant automation files are pushed or included in a pull request.

The workflow installs dependencies, installs Playwright browsers, executes the test suite, and uploads the Playwright HTML report as a build artifact.

Workflow results and execution reports can be reviewed in the repository's **Actions** tab. A successful local test run does not by itself establish that the CI workflow is passing; the CI result should be verified separately.

## Test Environment and Accounts

Application: [SauceDemo](https://www.saucedemo.com/)

Test accounts:

- `standard_user`
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`
- `error_user`
- `visual_user`

The accounts are used to explore normal user flows and intentionally differing demo-account behavior. Account-specific observations are assessed separately from the normal regression suite.

## Project Scope and Limitations

This is an independent QA practice project using a publicly available demonstration application. The findings reflect the tested scenarios and environment; they do not constitute a comprehensive assessment of the application.

Test results and coverage may change as the test suite evolves. Only behaviors that have been reproduced and evaluated against an appropriate expected result should be reported as confirmed defects.

## Author

GitHub: [EganAr](https://github.com/EganAr)