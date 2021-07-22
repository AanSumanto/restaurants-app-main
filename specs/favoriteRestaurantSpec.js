import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Favorite A restaurant', () => {
    const addFavoriteButtonContainer = () => {
        document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
    };

    beforeEach(() => {
        addFavoriteButtonContainer();
    });

    it('Should Show the Favorite Button the restaurant has not been favorite before', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="favorite this restaurant"]'))
            .toBeTruthy();
    });

    it('Should Not Show the UnFavorite Button the restaurant has not been favorite before', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        expect(document.querySelector('[aria-label="unfavorite this restaurant"]'))
            .toBeFalsy();
    });

    it('Should be able to Favorite the Restaurant', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
        const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

        expect(restaurant).toEqual({ id: 1 });

        FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    it('Should not add a Restaurant again when its ready favorited', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ id: 1 });

        await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
        // Simulasikan pengguna menekan tombol Favorite Restaurant
        document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));
        // Tidak ada restaurant ganda
        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);

        FavoriteRestaurantIdb.deleteRestaurant(1);
    });

    it('Should not add a restaurant when it has no id', async () => {
        await TestFactories.createFavoriteButtonPresenterWithRestaurant({ });

        document.querySelector('#favoriteButton').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
});