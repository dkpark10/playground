import { test, expect, type Page } from '@playwright/test';

const checkReferrer = async (page: Page, referrer: string) => {
  await page.route('**/api/stat', (route) => {
    const request = route.request();
    const postData = request.postData();

    const payload = JSON.parse(postData!) as { referrer: string };
    expect(payload.referrer).toBe(referrer);

    route.continue();
  });
};

test.describe('레퍼러 테스트', () => {
  test('push state', async ({ page }) => {
    checkReferrer(page, '');
    await page.goto('/dynamic/22');

    await page.getByRole('link', { name: /다음/ }).click();
    checkReferrer(page, 'http://localhost:3000/dynamic/22');
    await expect(page).toHaveURL('http://localhost:3000/dynamic/23');

    await page.getByRole('link', { name: /다음/ }).click();
    checkReferrer(page, 'http://localhost:3000/dynamic/23');
    await expect(page).toHaveURL('http://localhost:3000/dynamic/24');

    await page.getByRole('link', { name: /다음/ }).click();
    checkReferrer(page, 'http://localhost:3000/dynamic/24');
    await expect(page).toHaveURL('http://localhost:3000/dynamic/25');

    await page.getByRole('link', { name: /이전/ }).click();
    checkReferrer(page, 'http://localhost:3000/dynamic/25');
    await expect(page).toHaveURL('http://localhost:3000/dynamic/24');

    await page.getByRole('link', { name: /이전/ }).click();
    checkReferrer(page, 'http://localhost:3000/dynamic/24');
    await expect(page).toHaveURL('http://localhost:3000/dynamic/23');

    checkReferrer(page, 'http://localhost:3000/dynamic/24');
    await page.getByRole('button', { name: /클릭 통계 버튼/ }).click();
  });

  test('replace state', async ({ page }) => {
    checkReferrer(page, '');
    await page.goto('/dynamic/22');

    await page.getByRole('link', { name: /다음/ }).click();
    checkReferrer(page, 'http://localhost:3000/dynamic/22');
    await expect(page).toHaveURL('http://localhost:3000/dynamic/23');

    await page.getByRole('link', { name: /다음/ }).click();
    checkReferrer(page, 'http://localhost:3000/dynamic/23');
    await expect(page).toHaveURL('http://localhost:3000/dynamic/24');

    await page.getByRole('link', { name: /다음/ }).click();
    checkReferrer(page, 'http://localhost:3000/dynamic/24');
    await expect(page).toHaveURL('http://localhost:3000/dynamic/25');
    
    checkReferrer(page, 'http://localhost:3000/dynamic/25');
    await page.goBack();
    await expect(page).toHaveURL('http://localhost:3000/dynamic/24');

    checkReferrer(page, 'http://localhost:3000/dynamic/24');
    await page.goBack();
    await expect(page).toHaveURL('http://localhost:3000/dynamic/23');

    checkReferrer(page, 'http://localhost:3000/dynamic/23');
    await page.goForward();
    await expect(page).toHaveURL('http://localhost:3000/dynamic/24');
  });
})
