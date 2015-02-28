# notifista

a [Sails](http://sailsjs.org) application


Get User
```
GET /api/user

Url Params:
    email :  string

```

Create User
```
POST /api/user

Form data:
    email : string
    password : string
```

Authenticate User
```
POST /api/auth/user
Form data:
    email: string
    password: string

This will set the user-id cookie for the browser
```

Logout User
```
GET /api/auth/user/logout
```

Authenticate Event
```
POST /api/auth/event
Form data:
    name: string
    password: string

This will set the event-id cookie for the browser
```

Logout Event
```
GET /api/auth/event/logout
```
