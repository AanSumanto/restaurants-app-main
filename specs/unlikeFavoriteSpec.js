import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

const addFavoriteButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
};

describe('Unfavorite A Restaurant', () => {
    beforeEach(async () => {
        addFavoriteButtonContainer();
        await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    });

    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    it('Should display unfavorite widget when the restaurant has been favorited', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="unfavorite this restaurant"]'))
        .toBeTruthy();
    });

    it('Should not Display favorite widget when the restaurant has been favorited', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="favorite this restaurant"]'))
        .toBeFalsy();
    });

    it('Should be able to remove favorited restaurant from the list', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        document.querySelector('[aria-label="unfavorite this restaurant"]').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });

    it('Should not throw error if the unfavorite restaurant is not in the list', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        // hapus dulu restaurant dari daftar restaurant favorite
        await FavoriteRestaurantIdb.deleteRestaurant(1);

        document.querySelector('[aria-label="unfavorite this restaurant"]').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
});