# How to build
- docker build -t web1_httpd .
- docker build -t web2_httpd .
- docker build -t web3_nginx .
- docker build -t web4_nginx .

# How to run
- docker run -d -p 8081:80 web1_httpd
- docker run -d -p 8082:80 web2_httpd
- docker run -d -p 8083:80 web3_nginx
- docker run -d -p 8084:80 web4_nginx

# How to stop
- docker stop web1
- docker stop web2
- docker stop web3
- docker stop web4

# How to remove
- docker rm web1
- docker rm web2
- docker rm web3
- docker rm web4
