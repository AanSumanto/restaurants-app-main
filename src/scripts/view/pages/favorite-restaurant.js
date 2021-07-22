import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchPresenter from './favorited-Restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantSearchView from './favorited-Restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from './favorited-Restaurants/favorite-restaurant-show-presenter';

const view = new FavoriteRestaurantSearchView();

const Favorite = {
    async render() {
        return view.getTemplate();
    },

    async afterRender() {
       new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
       new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    },
};

export default Favorite;