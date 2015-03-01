curl -b cookies.txt -c cookies.txt --data "name=HackLondon&password=asdfasdf"  http://localhost:1337/api/event  
curl -b cookies.txt -c cookies.txt --data "name=food"  http://localhost:1337/api/event/channel  
curl -b cookies.txt -c cookies.txt --data "name=general"  http://localhost:1337/api/event/channel  
curl -b cookies.txt -c cookies.txt --data "event-name=HackLondon&channel-name=food&message=We're ordering more pizza soon!"  http://localhost:1337/api/message  
curl -b cookies.txt -c cookies.txt --data "event-name=HackLondon&channel-name=food&message=Ready for some beer?"  http://localhost:1337/api/message  
curl -b cookies.txt -c cookies.txt --data "event-name=HackLondon&channel-name=general&message=Happy hacking!"  http://localhost:1337/api/message  
curl -b cookies.txt -c cookies.txt --data "email=lukas@me.com&password=asdfasdf" http://localhost:1337/api/user  
curl --data "event-name=HackLondon&channel-name=food" http://localhost:1337/api/user/channel -b cookies.txt -c cookies.txt
curl --data "event-name=HackLondon&channel-name=general" http://localhost:1337/api/user/channel -b cookies.txt -c cookies.txt
