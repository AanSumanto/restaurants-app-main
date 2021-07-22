const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
    I.seeElement('#query');
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

    I.amOnPage('/');

    I.seeElement('.restaurant__name A');

    const firstRestaurant = locate('.restaurant__name A').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');

    I.amOnPage('/#/favorite');
    I.seeElement('.restaurant-item');
    const likedRestaurantName = await I.grabTextFrom('.restaurant__name');

    assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('searching restaurants', async ({ I }) => {
   I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

   I.amOnPage('/');

   I.seeElement('.restaurant__name A');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__name A').at(i));
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');
    titles.push(await I.grabTextFrom('.restaurant__name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurant);

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__name').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
