openssl req -config ssl.conf -new -x509 -sha256 -newkey rsa:2048 -nodes -keyout key.pem -days 3650 -out cert.pem