import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurant = [];

const FavoriteRestaurantArray = {

    getRestaurant(id) {
        if (!id) {
            return;
        }

        return favoriteRestaurant.find((restaurant) => restaurant.id == id);
    },

    getAllRestaurants() {
        return favoriteRestaurant;
    },

    putRestaurant(restaurant) {
        if (!restaurant.hasOwnProperty('id')) {
            return;
        }
        if (this.getRestaurant(restaurant.id)) {
        return;
        }

        favoriteRestaurant.push(restaurant);
    },

    deleteRestaurant(id) {
        favoriteRestaurant = favoriteRestaurant.filter((restaurant) => restaurant.id != id);
    },

    searchRestaurants(query) {
        return this.getAllRestaurants()
          .filter((restaurant) => {
            const loweredCaseRestaurantTitle = (restaurant.name || '-').toLowerCase();
            const jammedRestaurantTitle = loweredCaseRestaurantTitle.replace(/\s/g, '');

            const loweredCaseQuery = query.toLowerCase();
            const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

            return jammedRestaurantTitle.indexOf(jammedQuery) !== -1;
        });
    },
};

describe('Favorite Restaurant Array Contract test implementation', () => {
    afterEach(() => favoriteRestaurant = []);

    itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});