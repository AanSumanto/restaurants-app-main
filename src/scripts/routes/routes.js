import Detail from '../view/pages/detail-restaurant';
import Favorite from '../view/pages/favorite-restaurant';
import ListRestaurant from '../view/pages/list-restaurant';

const routes = {
    '/': ListRestaurant,
    '/list-restaurant': ListRestaurant,
    '/detail/:id': Detail,
    '/favorite': Favorite,

};

export default routes;