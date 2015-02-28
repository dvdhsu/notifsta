# notifista

a [Sails](http://sailsjs.org) application


Get User
```
GET /api/user

Url Params:
    email :  string

Returns
{
    status: "Error|Success",
    data : {
        email: email,
        events: [
            { 
                name: string
                channels: [
                    channel: string
                ]
            }
       ]
    }
}

```

Create User
```
POST /api/user

Form data:
    email : string
    password : string

Returns: success i think
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

Get Event
```
GET /api/Event

Url Params:
    name :  string

Returns
{
    status: "Error|Success",
    data : {
        name: email,
        channels: [
            { 
                name: string 
                //possibly more information here
            }
       ]
    }
}

```

Create Event
```
POST /api/Event

Form data:
    name : string
    password : string

Returns: 
    { status: 'Error|Success' }
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
