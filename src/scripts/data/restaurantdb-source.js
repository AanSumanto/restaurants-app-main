import API_ENDPOINT from '../global/api-endpoint';

class RestaurantDbSource {
  static async listRestaurant() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
    const responseJSON = await response.json();
    return responseJSON.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id));
    const responseJSON = await response.json();
    return responseJSON.restaurant;
  }

  static async searchRestaurant(keyword) {
    const response = await fetch(API_ENDPOINT.SEARCH_RESTAURANT(keyword));
    const responseJSON = await response.json();
    if (responseJSON.restaurants) {
      return Promise.resolve(responseJSON.restaurants);
    } else {
      return Promise.reject(new Error(`${keyword} Tidak Ketemu`));
    }
  }
}

export default RestaurantDbSource;