import { expect, test } from "@playwright/test";

test.beforeEach("go to localhost", async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page
    .getByRole("button", { name: "Button Triggering AJAX Request" })
    .click();
});

test.skip("Set Timeouts", async ({ page }) => {
  // wait for particular response
  await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  const pText = page.locator(".bg-success");

  // overwrite default 5 sec timeout for locator assertions
  await expect(pText).toBeVisible({ timeout: 20_000 });
  await expect(pText).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20_000,
  });
});
