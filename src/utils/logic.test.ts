import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute, getLocalizedPath } from './router';
import { validateReviewForm } from './validation';
import { formatPrice, formatPriceTiers } from './pricing';

test('router resolves French (default) routes correctly', () => {
  assert.deepEqual(resolveRoute('/'), { locale: 'fr', page: 'home', path: '/' });
  assert.deepEqual(resolveRoute('/menu'), { locale: 'fr', page: 'menu', path: '/menu' });
  assert.deepEqual(resolveRoute('/a-propos'), { locale: 'fr', page: 'about', path: '/a-propos' });
  assert.deepEqual(resolveRoute('/adresses'), { locale: 'fr', page: 'locations', path: '/adresses' });
});

test('router resolves English routes correctly', () => {
  assert.deepEqual(resolveRoute('/en'), { locale: 'en', page: 'home', path: '/en' });
  assert.deepEqual(resolveRoute('/en/menu'), { locale: 'en', page: 'menu', path: '/en/menu' });
  assert.deepEqual(resolveRoute('/en/about'), { locale: 'en', page: 'about', path: '/en/about' });
  assert.deepEqual(resolveRoute('/en/locations'), { locale: 'en', page: 'locations', path: '/en/locations' });
});

test('router resolves legacy routes without breaking', () => {
  assert.equal(resolveRoute('/de').locale, 'fr');
  assert.equal(resolveRoute('/about-us').page, 'about');
  assert.equal(resolveRoute('/locations').page, 'locations');
});

test('getLocalizedPath returns corresponding localized destination', () => {
  assert.equal(getLocalizedPath('about', 'fr'), '/a-propos');
  assert.equal(getLocalizedPath('menu', 'en'), '/en/menu');
  assert.equal(getLocalizedPath('locations', 'fr'), '/adresses');
});

test('form validation rejects empty inputs and invalid emails', () => {
  const invalidResult = validateReviewForm({
    date: '',
    rating: 0,
    name: '',
    email: 'not-an-email',
    message: '',
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.date);
  assert.ok(invalidResult.errors.rating);
  assert.ok(invalidResult.errors.name);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.message);

  const validResult = validateReviewForm({
    date: '2026-10-22',
    rating: 5,
    name: 'Jean Dupont',
    email: 'jean@example.mu',
    message: 'Le Wagyu Noire Signature était incroyable !',
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('pricing formats prices and tiers into clean Mauritian Rupee (Rs) representations', () => {
  assert.equal(formatPrice(350), 'Rs 350');
  assert.equal(formatPrice(835), 'Rs 835');
  assert.equal(formatPriceTiers({ 'ONE SIZE': 350 }), 'Rs 350');
});

test('hero headlines have exactly 3 balanced lines in FR and EN', async () => {
  const { UI_STRINGS } = await import('../data/content');
  assert.equal(UI_STRINGS.fr.hero.headlineLines.length, 3);
  assert.deepEqual(UI_STRINGS.fr.hero.headlineLines, ['DES BURGERS.', 'DU FEU.', 'DU CARACTÈRE.']);

  assert.equal(UI_STRINGS.en.hero.headlineLines.length, 3);
  assert.deepEqual(UI_STRINGS.en.hero.headlineLines, ['BURGERS.', 'FIRE.', 'CHARACTER.']);
});

test('menu products catalog contains exactly 6 confirmed items in MUR', async () => {
  const { MENU_PRODUCTS } = await import('../data/menu');
  assert.equal(MENU_PRODUCTS.length, 6);
  for (const item of MENU_PRODUCTS) {
    assert.ok(item.id);
    assert.ok(item.priceMur > 0);
    assert.ok(item.name.fr);
    assert.ok(item.name.en);
    assert.ok(item.description.fr);
    assert.ok(item.description.en);
    assert.ok(item.image);
  }
});
