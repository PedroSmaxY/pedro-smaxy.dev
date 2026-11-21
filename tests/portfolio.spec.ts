import { test, expect } from "@playwright/test";

test.describe("Portfolio E2E", () => {
  test("renders pt-BR home with zero console errors, hydration errors, or HTTP 4xx/5xx", async ({
    page,
  }) => {
    const errors: string[] = [];
    const badResponses: string[] = [];

    page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(`console.error: ${msg.text()}`);
      }
    });
    page.on("response", (res) => {
      if (res.status() >= 400) {
        badResponses.push(`${res.status()} ${res.url()}`);
      }
    });

    await page.goto("/", { waitUntil: "networkidle" });

    await expect(page).toHaveTitle(/Pedro Novais/i);
    await expect(page.locator("h1")).toBeVisible();
    await expect(
      page.locator('a[href="/pedro-novais-cv.pdf"]')
    ).toBeVisible();

    expect(errors).toEqual([]);
    expect(badResponses).toEqual([]);
  });

  test("switches locale between PT and EN and updates CV download link", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("button", { name: "EN", exact: true }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(
      page.locator('a[href="/pedro-novais-cv-en.pdf"]')
    ).toBeVisible();

    await page.getByRole("button", { name: "PT", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.locator('a[href="/pedro-novais-cv.pdf"]')
    ).toBeVisible();
  });

  test("serves both PT-BR and EN PDF resumes with HTTP 200", async ({
    request,
  }) => {
    for (const file of ["/pedro-novais-cv.pdf", "/pedro-novais-cv-en.pdf"]) {
      const res = await request.get(file);
      expect(res.status(), file).toBe(200);
      expect(res.headers()["content-type"]).toContain("application/pdf");
    }
  });

  test("supports keyboard navigation and capture toggle in desktop projects showcase", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const projectButtons = page.locator("#projects .lg\\:grid button[aria-pressed]");
    const first = projectButtons.nth(0);
    const second = projectButtons.nth(1);

    await expect(first).toHaveAttribute("aria-pressed", "true");
    await first.focus();
    await page.keyboard.press("ArrowDown");
    await expect(second).toHaveAttribute("aria-pressed", "true");

    const captureToggle = page.locator("#projects .lg\\:grid").getByRole("button", {
      name: /\[CAPTURE\]|\[SCHEMATIC\]/i,
    });
    if ((await captureToggle.count()) > 0) {
      await captureToggle.first().click();
      await expect(captureToggle.first()).toHaveAttribute("aria-pressed", "true");
    }
  });

  test("toggles BlackHoleCanvas between ASCII and HALF-BLOCK modes", async ({
    page,
  }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /\[M\]/ });
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
  });

  test("renders cleanly on mobile without horizontal overflow and opens mobile menu", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", { waitUntil: "networkidle" });

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    expect(hasOverflow).toBe(false);

    const menuButton = page.getByRole("button", { name: "Menu" });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const projectsMenuItem = page.getByRole("menuitem", { name: /Projetos/i });
    await expect(projectsMenuItem).toBeVisible();
    await projectsMenuItem.click();
    await expect(page).toHaveURL(/#projects$/);
  });
});
