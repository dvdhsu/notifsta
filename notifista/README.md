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

Returns:
    equiv. of get user if succeeded, otherwise {status:'Error'}

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
    equiv. of get event if succeeded, otherwise {status:'Error'}
```
Authenticate Event
```
POST /api/auth/event
Form data:
    name: string
    password: string

Returns:
    equiv. of get event if succeeded, otherwise {status:'Error'}

This will set the event-id cookie for the browser
```

Logout Event
```
GET /api/auth/event/logout
```


Get Message
```
GET /api/message 
Url args:
    event_name
    channel_name
    user_email
    last_time (OPTIONAL)

Returns 
{
    event_name: string,
    channel_name: string,
    message: message,
    answers : null | { name: string, value: string }
    result: null | { name: string, value: string  } //user's response

}

```

Create Message
```
POST /api/message
Form data:
    event_name : string 
    channel_name : string 
    message : string 
    answers: null { name: string, value: string }

returns same as get message w/o result
```

Send response for a survey

```
POST /api/message/response
Form data:
    id: string,
    answer : stringified JSON answer object
```
