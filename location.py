from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="geoapiExercises")
def city_state_country(coord):
    location = geolocator.reverse(coord, exactly_one=True)
    address = location.raw['address']
    city = address.get('city', '')
    state = address.get('state', '')
    country = address.get('country', '')
    return {"city":city, "state":state, "country":country}
# print(city_state_country("47.470706,-99.704723"))