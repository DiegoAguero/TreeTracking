# To configure backend
- Create a `config.properties` file in `/backend/src/main/resources` with:

JDBC_URL=${urlFromYourDataBase_MySQL}
JDBC_USER=${yourUserFromDataBase}
JDBC_PASS=${yourPasswordFromDataBase}
WEATHER_API_KEY=${yourApikeyFrom_home.openweathermap.org}


# Endpoints TreeTracking

- I will use "localhost:8080" to refer to the URL where the backend is hosted.
- I will use `${VariableName}` to refer to a value or variable that needs to be passed.
- In all cases, if no data is found, an empty JSON will be returned.

## Endpoint for current day's data:

`localhost:8080/conditions`

*If there is no data available for today, it should first query the API to fetch current day's data.

## Endpoint for temperature filter:

`localhost:8080/conditions/temperature?min=${minValue}&max=${maxValue}`

*If variables are not correctly provided, it redirects to `/conditions`.

## Endpoint for humidity filter:

`localhost:8080/conditions/humidity?min=${minValue}&max=${maxValue}`

*If variables are not correctly provided, it redirects to `/conditions`.

## Endpoint for fire detected filter:

`localhost:8080/conditions/fireDetected?value=${stateVariable}`

*If the variable is not correctly provided, it redirects to `/conditions`.
**In this case, values 'true'/'false' or '1'/'0' are considered valid.

## Endpoint for location ID filter:

`localhost:8080/conditions/ubication?id=${locationId}`

*If the variable is not correctly provided, it redirects to `/conditions`.
**The `locationId` corresponds to `id_property`.

## Endpoint for Conditions interval by location ID and days:

`localhost:8080/conditions/ubication/interval?id=${locationId}&days=${intervalDays}`

*If the variables are not correctly provided, it redirects to `/conditions`.
**The `locationId` corresponds to `id_property`.

