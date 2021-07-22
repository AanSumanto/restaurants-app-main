import { createRestaurantItemTemplate } from '../../../templates/template-creator';
import RestaurantDbSource from '../../data/restaurantdb-source';

const ListRestaurant = {
    async render() {
        return `
            <div class="content">
                <h2 class="content_heading">Expolorer Restaurant</h2>
                <div id="restaurants" class="restaurants">
                </div>
            </div>
        `;
    },

    async afterRender() {
        const restaurants = await RestaurantDbSource.listRestaurant();
        const restaurantContainer = document.querySelector('#restaurants');
        restaurants.forEach((restaurant) => {
            restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
    },

};

export default ListRestaurant;