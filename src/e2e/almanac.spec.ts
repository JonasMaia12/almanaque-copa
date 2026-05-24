import { test, expect } from '@playwright/test';

test.describe('World Cup Almanac E2E Tests', () => {
  
  test('should navigate from Home cover to Team details page', async ({ page }) => {
    // 1. Acessa a página inicial
    await page.goto('/');

    // 2. Verifica se o cabeçalho de grupos da capa está visível
    const headerTitle = page.locator('h2:has-text("Coleção de Grupos")');
    await expect(headerTitle).toBeVisible();

    // 3. Expande o Grupo G (Brasil) no accordion (já começa aberto no estado inicial, mas vamos clicar para garantir)
    const groupGButton = page.locator('button:has-text("Grupo G")');
    await expect(groupGButton).toBeVisible();
    
    // 4. Localiza o adesivo do Brasil e clica nele
    const brasilSticker = page.locator('[data-testid="sticker-container"]:has(img[alt="Escudo de Brasil"])');
    await expect(brasilSticker).toBeVisible();
    await brasilSticker.click();

    // 5. Verifica se navegou com sucesso para a rota da seleção do Brasil e o título está visível
    const teamTitle = page.locator('h1:has-text("Brasil")');
    await expect(teamTitle).toBeVisible({ timeout: 10000 });
    expect(page.url()).toContain('/team/brasil');

    // 7. Verifica se o técnico Carlo Ancelotti é exibido
    const managerText = page.locator('span:has-text("Carlo Ancelotti")');
    await expect(managerText).toBeVisible();
  });

  test('should render player cards and allow flipping them to view stats', async ({ page }) => {
    // 1. Vai direto para a página do Brasil
    await page.goto('/team/brasil');

    // 2. Localiza o card do Vinícius Júnior
    const playerCardText = page.locator('h3:has-text("Vinícius Júnior")');
    await expect(playerCardText).toBeVisible();

    // 3. Localiza o invólucro do card 3D
    const wrapper = page.locator('[data-testid="papercard-3d-wrapper"]').first();
    await expect(wrapper).toBeVisible();

    // 4. Verifica se a frente do card está visível
    const frontSide = page.locator('[data-testid="card-front"]').first();
    await expect(frontSide).toBeVisible();

    // 5. Clica no card para realizar o flip
    await wrapper.click();

    // 6. Verifica se o verso do card é exibido (estatísticas de gols e biografia)
    const backSide = page.locator('[data-testid="card-back"]').first();
    await expect(backSide).toBeVisible();
  });
});
