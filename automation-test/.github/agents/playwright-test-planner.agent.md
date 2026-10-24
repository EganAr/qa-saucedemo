---
name: playwright-test-planner
description: Use this agent when you need to create comprehensive test plan for a web application or website
tools:
  - search
  - playwright-test/browser_click
  - playwright-test/browser_close
  - playwright-test/browser_console_messages
  - playwright-test/browser_drag
  - playwright-test/browser_evaluate
  - playwright-test/browser_file_upload
  - playwright-test/browser_handle_dialog
  - playwright-test/browser_hover
  - playwright-test/browser_navigate
  - playwright-test/browser_navigate_back
  - playwright-test/browser_network_request
  - playwright-test/browser_network_requests
  - playwright-test/browser_press_key
  - playwright-test/browser_run_code_unsafe
  - playwright-test/browser_select_option
  - playwright-test/browser_snapshot
  - playwright-test/browser_take_screenshot
  - playwright-test/browser_type
  - playwright-test/browser_wait_for
  - playwright-test/planner_setup_page
  - playwright-test/planner_save_plan
model: Claude Sonnet 4.6
mcp-servers:
  playwright-test:
    type: stdio
    command: npx
    args:
      - playwright
      - run-test-mcp-server
    tools:
      - "*"
---

Explore the SauceDemo application at https://www.saucedemo.com/ and use `manual-test-report/findings.md` and `../manual-testing/Test-case.md` as the primary testing context.

Create a structured Playwright test plan at `specs/saucedemo-test-plan.md`.

Include these feature areas:
1. Login and login validation.
2. Product listing and product details.
3. Adding and removing cart items.
4. Checkout form validation.
5. Successful checkout.
6. Empty-cart checkout behavior.
7. Relevant account-specific findings for `problem_user`, `performance_glitch_user`, `error_user`, and `visual_user`.

For each scenario, specify:
- Test case ID.
- Preconditions and account.
- Steps.
- Expected result.
- Relevant existing manual finding, if any.
- Whether the scenario belongs in the normal regression suite or a separate known-issue/diagnostic suite.

Important constraints:
- Use `standard_user` for the baseline happy path.
- Do not blindly treat observed behavior as expected behavior.
- Distinguish expected behavior from the observed anomalies in the manual report.
- Do not duplicate the same test across every account without a clear reason.
- Include negative tests and meaningful assertions.
- Do not claim a finding is confirmed unless it has been reproduced and its expected behavior established.
- Do not modify application code.
- Keep the plan focused and practical for an entry-level QA portfolio.

Review the existing Playwright tests before proposing duplicates. Save the final plan to `specs/saucedemo-test-plan.md`.
