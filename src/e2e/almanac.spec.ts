import { test, expect } from '@playwright/test';

test.describe('World Cup Almanac E2E Tests', () => {
  
  test('should render Home page correctly', async ({ page }) => {
    // 1. Acessa a página inicial
    await page.goto('/');

    // 2. Verifica se o título ALMANAQUE está visível
    const almanaqueText = page.locator('span:has-text("A")').first();
    await expect(almanaqueText).toBeVisible();

    // 3. Verifica se o carimbo EUA 2026 está na tela
    const carimbo = page.locator('div:has-text("EUA 2026")').last();
    await expect(carimbo).toBeVisible();
  });

  test('should render player details (Scrapbook)', async ({ page }) => {
    // 1. Vai direto para a página do Brasil
    await page.goto('/team/brasil');

    // 2. Localiza o texto do Vinícius Júnior
    const playerCardText = page.locator('h3:has-text("Vinícius Júnior")');
    await expect(playerCardText).toBeVisible();

    // 3. Verifica se a imagem (sticker) do jogador foi renderizada
    const stickerImg = page.locator('img[alt="Ilustração de Vinícius Júnior"]');
    await expect(stickerImg).toBeVisible();

    // 4. Verifica se os gols na carreira estão visíveis
    const goalsText = page.locator('div:has-text("145 gols na carreira")').last();
    await expect(goalsText).toBeVisible();
  });
});
