# Chat

### Entity Relational Diagram

![Entity Relational Diagram](images/ERD.png)

## Endpoints

### Users

`/users` - GET, POST  
`/users/:id` - GET, PATCH, DELETE  
`/users/:id/posts` - GET  
`/users/:id/posts-liked` - GET  
`/users/:id/posts-followed` - GET

### Posts

`/posts` - GET, POST  
`/posts/:id` - GET, PATCH, DELETE  
`/posts/:id/likes` - POST, DELETE  
`/posts/:id/follows` - POST, DELETE  
`/posts/:id/replies` - GET, POST

### Replies

`/replies/:id` - GET, PATCH, DELETE
