
# MovieoGraph

## Schemes

### User
* \_id
* E-mail: String
* Username: String
* Watchlist: List<\MovieId>
* Watchedlist: List< WatchedMovie>
* Activities: List < Activity >

### WatchedMovie
* \_id
* MovieId: String
* WatchedOn: DateTime
* Rating: Double
* Note: String

### Activity
* \_id
* Icon: String
* Content: String
* MovieId: String
* Date: DateTime


### Adaptations
* routes:
  - get users / get user  
    Ervoor gezorgd dat hash en salt niet worden doorgestuurd
  - CRUD watchedMovies
    Extra beveiliging: de post zal de watchedmovie toevoegen bij de user wiens token is meegegeven
