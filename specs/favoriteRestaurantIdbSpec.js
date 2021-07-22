import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

describe('Favorite restaurant idb contract test implementation', () => {
    afterEach(async () => {
        (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
            await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
        });
    });

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});