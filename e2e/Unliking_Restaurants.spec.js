const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
});

Scenario('showing empty liked menu restaurant', ({ I }) => {
    I.seeElement('#query');
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});
   
Scenario('unliking one restaurant', async ({ I }) => {
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
    I.amOnPage('/');
    I.seeElement('.restaurant__name a');
   
    const firstRestaurant= locate('.restaurant__name a').first();
    const firstRestaurantsName = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);
   
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');
   
    I.amOnPage('/#/favorite');
    I.seeElement('.restaurant-item');
   
    const unlikedRestaurantsName = await I.grabTextFrom('.restaurant__name');
    assert.strictEqual(firstRestaurantsName, unlikedRestaurantsName);
   
    I.seeElement('.restaurant__name a');
    await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);
   
    I.seeElement('#favoriteButton');
    I.click('#favoriteButton');

    I.amOnPage('/#/favorite');
    I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});