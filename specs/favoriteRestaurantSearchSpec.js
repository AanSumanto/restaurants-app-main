import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantSearchPresenter from '../src/scripts/view/pages/favorited-Restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantSearchView from '../src/scripts/view/pages/favorited-Restaurants/favorite-restaurant-search-view';

describe('Searching Restaurants', () => {
    let presenter;
    let favoriteRestaurants;
    let view;

    const searchRestaurants = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    const setRestaurantSearchContainer = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresenter = () => {
        favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
        presenter = new FavoriteRestaurantSearchPresenter({
            favoriteRestaurants,
            view,
        });
    };

    beforeEach(() => {
        setRestaurantSearchContainer();
        constructPresenter();
    });

    describe('When Query is not empty', () => {
        it('Should be able to capture the query typed by the user', () => {
            searchRestaurants('restaurant a');

            expect(presenter.latestQuery).toEqual('restaurant a');
        });

        it('should ask the model to search for restaurants', () => {
            searchRestaurants('restaurant a');

            expect(favoriteRestaurants.searchRestaurants)
                .toHaveBeenCalledWith('restaurant a');
        });

        it('should show the found restaurant', () => {
            presenter._showFoundRestaurants([{ id: 1 }]);
            expect(document.querySelectorAll('.restaurant-item').length).toEqual(1);

            presenter._showFoundRestaurants([{ 
                id: 1, 
                name: 'Satu', 
            }, { 
                id: 2, 
                name: 'Dua',
            }]);
            expect(document.querySelectorAll('.restaurant-item').length)
                .toEqual(2);
        });

        fit('Should show the name of the found restaurants', () => {
            presenter._showFoundRestaurants([{ 
                id: 1, 
                name: 'Satu',
            }]);
            expect(document.querySelectorAll('.restaurant__name')
            .item(0).textContent)
            .toEqual('Satu');
        });

        fit('should show - when the restaurant returned does not contain a name', (done) => {
           document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
            const restaurantTitles = document.querySelectorAll('.restaurant__name');
            expect(restaurantTitles.item(0).textContent).toEqual('-');

            done();
        });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
                { id: 444 },
            ]);

            searchRestaurants('restaurant a');
        }); 
        
    });

    describe('When Query is empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurants(' ');
            expect(presenter.latestQuery.length)
            .toEqual(0);

            searchRestaurants('    ');
            expect(presenter.latestQuery.length)
            .toEqual(0);

            searchRestaurants('');
            expect(presenter.latestQuery.length)
            .toEqual(0);

            searchRestaurants('\t');
            expect(presenter.latestQuery.length)
            .toEqual(0);
        });

        it('should show all favorite restaurants', () => {
            searchRestaurants('    ');

            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
        });
    });

    describe('When no favorite restaurant could be found', () => {
        it('Should show the empty message', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurant-item__not__found').length)
                    .toEqual(1);
                    done();
            });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

            searchRestaurants('restaurant a');
        });

        it('Should not show any restaurant', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                    expect(document.querySelectorAll('.restaurant-item').length)
                        .toEqual(0);
                done();
            });

            favoriteRestaurants.searchRestaurants.withArgs('restaurant a')
                .and
                .returnValues([]);

            searchRestaurants('restaurant a');
        });
    });
});