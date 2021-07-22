import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchView from '../src/scripts/view/pages/favorited-Restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/view/pages/favorited-Restaurants/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurants', () => {
    let view;

    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('when no restaurants have been liked', () => {
        it('should ask for the favorite restaurants', () => {
            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
        });

        it('should the information that the no restaurants have been liked', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant-item__not__found').length)
                    .toEqual(1);

                done();
            });

            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
            favoriteRestaurants.getAllRestaurants.and.returnValue([]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });

    describe('When favorite restaurant exist', () => {
        it('should show the restaurant', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
                done();
            });

            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
            favoriteRestaurants.getAllRestaurants.and.returnValue([
                {
                    id: 1, name: 'A', rating: 4, overview: 'Restaurant A',
                },
                {
                    id: 22, name: 'B', rating: 3, overview: 'Restaurant B',
                },
            ]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });
});