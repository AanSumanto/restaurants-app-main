import { createRestaurantItemTemplate } from '../../../../templates/template-creator';

class FavoriteRestaurantSearchView {
    getTemplate() {
        return `
        <style>
            .search-container > input {
                padding: 16px;
                border: 0;
                border-bottom: 1px solid black;
                font-weight: bold;
                background-color: #F7FD04;
                align-content: center;
            }

            .search-container > input:focus {
                outline: 0;
                border-bottom: 2px solid black;
            }

            .search-container > input:focus::placeholder {
                font-weight: bold;
            }

            .search-container >  input::placeholder {
                color: cornflowerblue;
                font-weight: normal;
            }

            .search-container > button {
                width: 30%;
                cursor: pointer;
                margin-left: auto;
                padding: 15px;
                width: auto;
                background-color: cornflowerblue;
                color: white;
                border: 0;
                text-transform: uppercase;
            }

            @media screen and (max-width: 550px){
                .search-container {
                    flex-direction: column;
                    position: static;
                }

                .search-container > input {
                    width: 100%;
                    margin-bottom: 12px;
                }

                .search-container input::placeholder  {
                    width: 50%;
                    font-size:15px
                }

                .search-container > button {
                    width: 100%;
                }
            }

            </style>

        <div id="search-container" class="content search-container">
            <input placeholder="Search Favorite Restaurant" id="query" type="search">
            <button id="searchButtonElement" type="submit">Search</button>

            <div id="restaurants" class="restaurants">
            </div>
        </div>
        `;
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value);
        });
    }

    showRestaurants(restaurants) {
        this.showFavoriteRestaurants(restaurants);
    }

    showFavoriteRestaurants(restaurants = []) {
        let html;
        if (restaurants.length) {
            html = restaurants.reduce((carry, restaurants) => carry.concat(createRestaurantItemTemplate(restaurants)), '');
        } else {
            html = this._getEmptyRestaurantTemplate();
        }

        document.getElementById('restaurants').innerHTML = html;

        document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
    }

    _getEmptyRestaurantTemplate() {
        return '<div class="restaurant-item__not__found restaurants__not__found">Tidak ada restaurant untuk ditampilkan</div>';
    }
}

export default FavoriteRestaurantSearchView;