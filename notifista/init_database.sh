curl -b cookies.txt -c cookies.txt --data "name=event1&password=asdfasdf"  http://localhost:1337/api/event  
curl -b cookies.txt -c cookies.txt --data "name=ch1"  http://localhost:1337/api/event/channel  
curl -b cookies.txt -c cookies.txt --data "name=ch2"  http://localhost:1337/api/event/channel  
curl -b cookies.txt -c cookies.txt --data "email=lukas@me.com&password=asdfasdf" "http://localhost:1337/api/user" 
curl --data "event-name=event1&channel-name=ch1" http://localhost:1337/api/user/channel -b cookies.txt -c cookies.txt
curl --data "event-name=event1&channel-name=ch2" http://localhost:1337/api/user/channel -b cookies.txt -c cookies.txt
