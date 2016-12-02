
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
