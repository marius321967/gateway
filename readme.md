Service which provides a central gateway for applications (microservices) to push and pull data via async events or continuous streams. It solves the issues of connection, authorization and credentials keeping. Data producers and consumers are decoupled - this helps to develop applications asychronously.

For example, you deploy an application to your RaspberryPI which measures temperature. The application then sends the data to Gateway via an event of type measurement:weather. Another application - a cloud service - listens for new events of this specific type and processes them once they are received.

For more, read the [wiki](https://github.com/marius321967/gateway/wiki).
