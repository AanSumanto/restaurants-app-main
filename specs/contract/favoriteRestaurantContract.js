const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
    it('Should return the restaurant that has been added', async () => {
        favoriteRestaurant.putRestaurant({ id: 1 });
        favoriteRestaurant.putRestaurant({ id: 2 });

        expect(await favoriteRestaurant.getRestaurant(1))
            .toEqual({ id: 1 });
        expect(await favoriteRestaurant.getRestaurant(2))
            .toEqual({ id: 2 });
        expect(await favoriteRestaurant.getRestaurant(3))
            .toEqual(undefined);
    });

    it('Should refuse a restaurant from being added if it does not have the correct property', async () => {
        favoriteRestaurant.putRestaurant({ aProperty: 'property' });

        expect(await favoriteRestaurant.getAllRestaurants())
            .toEqual([]);
    });

    it('can return all of the restaurant that have been added', async () => {
        favoriteRestaurant.putRestaurant({ id: 1 });
        favoriteRestaurant.putRestaurant({ id: 2 });

        expect(await favoriteRestaurant.getAllRestaurants())
            .toEqual([
                { id: 1 },
                { id: 2 },
            ]);
    });

    it('Should remove favorite restaurant', async () => {
        favoriteRestaurant.putRestaurant({ id: 1 });
        favoriteRestaurant.putRestaurant({ id: 2 });
        favoriteRestaurant.putRestaurant({ id: 3 });

        await favoriteRestaurant.deleteRestaurant(1);

        expect(await favoriteRestaurant.getAllRestaurants())
            .toEqual([
                { id: 2 },
                { id: 3 },
            ]);
    });

    it('Should handle request to remove a restaurant even though the restaurant has not been added', async () => {
        favoriteRestaurant.putRestaurant({ id: 1 });
        favoriteRestaurant.putRestaurant({ id: 2 });
        favoriteRestaurant.putRestaurant({ id: 3 });

        await favoriteRestaurant.deleteRestaurant(4);

        expect(await favoriteRestaurant.getAllRestaurants())
            .toEqual([
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ]);
    });

    it('should be able to search for restaurants', async () => {
        favoriteRestaurant.putRestaurant({ id: 1, name: 'restaurant a' });
        favoriteRestaurant.putRestaurant({ id: 2, name: 'restaurant b' });
        favoriteRestaurant.putRestaurant({ id: 3, name: 'restaurant abcd' });
        favoriteRestaurant.putRestaurant({ id: 4, name: 'aha ini restaurant abcd' });

        expect(await favoriteRestaurant.searchRestaurants('restaurant a')).toEqual([
            { id: 1, name: 'restaurant a' },
            { id: 3, name: 'restaurant abcd' },
            { id: 4, name: 'aha ini restaurant abcd' },
        ]);
    });
};

export { itActsAsFavoriteRestaurantModel };