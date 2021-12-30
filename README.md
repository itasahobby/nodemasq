Sample NodeJS app to demostrate how to protect against dns rebinding on docker.

Steps to reproduce:
* Build docker image
    ```
    sudo docker build . -t nodemasq
    ```

* Run container without modifying dns
    ```
    sudo docker run -it --rm -p 1337:1337 samplednsmasq:latest
    ```

* Make a query to a domain that resolves to a local address:
    ```
    curl http://localhost:1337/?host=itasahobby.com
    # Output
    #Servers: 192.168.71.2
    #Records:127.0.0.1
    ```
* Stop the container and run it again this time specify the dns to be localhost:
    ```
    sudo docker run -it --rm -p 1337:1337 --dns 127.0.0.1 samplednsmasq:latest
    ```

* Make the same query again
    ```
    curl http://localhost:1337/?host=itasahobby.com
    # Output
    #Error: queryA ENODATA itasahobby.com
    ```
    > Also in the logs we can see the following message: `dnsmasq: possible DNS-rebind attack detected: itasahobby.com`
