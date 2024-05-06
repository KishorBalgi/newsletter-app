<!-- PROJECT LOGO -->
<div align="center">
    <img src="https://github.com/KishorBalgi/Peer-to-Peer-Video-Communication/assets/75678927/4867b00c-4dc6-4a52-ae05-6d994a875528" alt="Logo" width="200" height="200">

  <h3 align="center">Newsletter Client Application</h3>

  <p align="center">
    The client application for the newsletter app built using Next.js, Tailwind CSS, and Shadcn/ui
    <br />
    <a href="">View Demo</a>
    ·
    <a href="https://github.com/KishorBalgi/newsletter-platform/issues">Report Bug</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<a name="readme-top"></a>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#demonstration">Demonstration</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

The newsletter application is a comprehensive platform designed to streamline the creation, management, and distribution of newsletters and articles. Leveraging modern technologies and best practices, this project offers a robust and scalable solution for publishers and subscribers alike.

#### Key Features

- **CRUD Operations:** The Node.js main server handles all CRUD operations, including authentication, newsletter management, and article creation.
- **JWT Authentication:** Secure access to protected resources is ensured through _JSON Web Token (JWT)_ authentication.
- **Redis Cache:** Utilizing _Redis_ as a caching layer optimizes performance by storing frequently accessed data such as newsletters and articles.
- **Asynchronous Communication:** _RabbitMQ_ facilitates asynchronous communication between components, enabling decoupled and scalable architecture.
- **Email Notification:** Subscribers receive timely email notifications whenever new articles are published, with the help of a dedicated _email server_ and _Nodemailer_ integration.
- **Relational Database:** Data is stored in _PostgreSQL_, offering reliability, consistency, and powerful querying capabilities through _Prisma ORM_.
- **Dockerization:** _Docker_ containers ensure easy deployment and scalability across different environments, promoting consistency and reliability.
- **Modern Frontend Stack:** The frontend is built using _Next.js_ for server-side rendering, _Tailwind CSS_ for styling, and _Shadcn/ui_ for UI components, providing a seamless user experience.

**Home Page**
<img src="" alt="Home Page">

**Signup Page**
<img src="" alt="Signup Page">

**Login Page**
<img src="" alt="Login Page">

**Browse Newsletters**
<img src="" alt="Browse Newsletters Page">

**Browse Articles**
<img src="" alt="Browse Articles Page">

**Create Newsletter**
<img src="" alt="Create Newsletter Page">

**Create Article**
<img src="" alt="Create Article Page">

**Subscribe to Newsletter**
<img src="" alt="Subscribe to Newsletter Page">

#### Architecture

- **Article Creation**:

  - Authors use the application's interface to create new articles. This process likely involves filling out a form.
  - Upon submission, the article data is sent to the Node.js main server.

- **Data Persistence**:

  - The Node.js server receives the article data and interacts with the PostgreSQL database using Prisma ORM to persist the article information.
  - The article's details, including its title, content, author information, publication date, and any associated metadata, are stored securely in the database.

- **Cache Update**:

  - The Node.js server also updates the Redis cache with the newly created newsletter's and article's information. This step helps optimize read performance for frequently accessed articles.

- **Event Publishing**:

  - After successfully storing the article in the database, the Node.js server publishes a message to the RabbitMQ server. This message contains information about the newly published article, such as its unique identifier or a reference to its database record.
  - RabbitMQ facilitates asynchronous communication and decouples the article publishing process from the subsequent notification of subscribers.

- **Subscriber Notification**:

  - A separate server, dedicated to handling email notifications, consumes messages from the RabbitMQ queue. This server will be running in the background, continuously checking for new messages.
  - Upon receiving a message indicating that a new article has been published, the email server retrieves the article details from the database, and the subscribers' information from the of the newsletter.
  - The email server then crafts personalized email notifications addressed to each subscriber of the relevant newsletter and sends them out using Nodemailer and the Gmail SMTP service.
  - The email server then sends out these notifications, informing subscribers about the newly published article and providing links or excerpts to encourage engagement.

- **Email Delivery**:

  - Gmail's SMTP service handles the delivery of email notifications to subscribers' inboxes. This ensures reliable and timely delivery of updates.
  - Subscribers receive the email notifications and can click on the provided links to read the full articles directly on the application's website.

- **User Interaction**:
  - Subscribers can access the articles via the links provided in the email notifications or by visiting the application's frontend interface directly.
  - The frontend, built using Next.js, Tailwind CSS, and Shadcn/ui, provides a user-friendly experience for browsing and reading articles. Subscribers can navigate through the list of available newsletters, view articles, and interact with various UI components.

#### Project Goal

This project serves as an exploration of modern web development practices, tools, and technologies. By implementing a newsletter platform, the aim is to showcase the end-to-end process of building a full-stack application, from database design and server-side logic to frontend development and user interface design.

The project's architecture emphasizes scalability, maintainability, and performance, with a focus on decoupling components and leveraging asynchronous communication patterns. By incorporating industry-standard tools and libraries.

### Built With

#### Front-End:

[![Next][Next.js]][Next-url]
[![Tailwind][tailwind]][tailwind-url]
[![Shadcn/ui][Shadcn]][Shadcn-url]

#### Main Server:

[![Node.js][Node.js]][Node.js-url]
[![Express][Express]][Express-url]

#### Email Server:

[![Node.js][Node.js]][Node.js-url]
[![Express][Express]][Express-url]
[![Nodemailer][Nodemailer]][Nodemailer-url]

#### Database and ORM:

[![PostgreSQL][Postgre]][Postgre-url]
[![Prisma ORM][prisma]][prisma-url]

#### Messaging and Caching:

[![RabbitMQ][RabbitMQ]][RabbitMQ-url]
[![Redis][Redis]][Redis-url]

#### Tools:

[![TypeScript][TS]][TS-url]
[![Turborepo][Turborepo]][Turborepo-url]
[![Git][Git]][Git-url]
[![GitHub][GitHub]][GitHub-url]
[![Docker][Docker]][Docker-url]

<!-- [![Prometheus][Prometheus]][Prometheus-url]
[![Grafana][Grafana]][Grafana-url] -->

<!-- GETTING STARTED -->

## Installation

1. Fork the [repo](https://github.com/KishorBalgi/newsletter-platform)

   Clone the repo to your local system

   ```git
    git clone https://github.com/KishorBalgi/newsletter-platform newsletter-platform
   ```

2. Install all the dependencies

   ```bash
    cd newsletter-platform
    npm install # This will install all the required dependencies for all the workspaces
   ```

3. Environment Configurations:

- Frontend:

  - `.env` file for development

  ```bash
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
  ```

  - `.env.prod` file for production

  ```bash
    NEXT_PUBLIC_API_URL=https://<API_HOST>/api/v1
  ```

- Main Server:

  - `.env` file for development

  ```bash
    NODE_ENV="development"
    PORT=5000

    # DB
    DATABASE_URL=""postgresql://postgres:mysecretpassword@localhost:5432/newsletter?schema=public"

    # RabbitMQ
    RABBITMQ_URL="amqp://guest:guest@localhost"

    # Redis
    REDIS_HOST="localhost"
    REDIS_PORT=6379
    REDIS_PASSWORD=""

    # Frontend
    CLIENT_URL="http://localhost:3000"

    # Server
    JWT_SECRET="mysecretkey"
    JWT_EXPIRES_IN=10d
    JWT_COOKIE_EXPIRES_IN=10
  ```

  - `.env.prod` file for production

  ```bash
    NODE_ENV="production"
    PORT=5000

    # DB
    DATABASE_URL="postgresql://postgres:<DB_PASS>@<DB_HOST>:5432/newsletter?schema=public"

    # RabbitMQ
    RABBITMQ_URL="amqp://<RABBITMQ_HOST>:5672"

    # Redis
    REDIS_HOST="<REDIS_HOST>"
    REDIS_PORT=6379
    REDIS_PASSWORD="<REDIS_PASS>"

    # Frontend
    CLIENT_URL="https://<CLIENT_HOST>"

    # Server
    JWT_SECRET="<JWT_SECRET>"
    JWT_EXPIRES_IN=10d
    JWT_COOKIE_EXPIRES_IN=10
  ```

- Email Server:

  - `.env` file for development

  ```bash
    NODE_ENV="production"
    PORT=5000

    # DB
    DATABASE_URL="postgresql://postgres:mysecretpassword@<DB_HOST>:5432/newsletter?schema=public"

    # RabbitMQ
    RABBITMQ_URL="amqp://<RABBITMQ_HOST>:5672"

    # Frontend
    CLIENT_URL="https://<CLIENT_HOST>"

    # Gmail:
    NODEMAILER_EMAIL=<GMAIL_EMAIL>
    NODEMAILER_PASS=<GMAIL_PASS>
  ```

  - `.env.prod` file for production

  ```bash
    NODE_ENV="production"
    PORT=5000

    # DB
    DATABASE_URL="postgresql://postgres:<DB_PASS>@<DB_HOST>:5432/newsletter?schema=public"

    # RabbitMQ
    RABBITMQ_URL="amqp://<RABBITMQ_HOST>:5672"

    # Frontend
    CLIENT_URL="https://<CLIENT_HOST>"

    # Gmail:
    NODEMAILER_EMAIL=<GMAIL_EMAIL>
    NODEMAILER_PASS=<GMAIL_PASS>
  ```

4. Run the RabbitMQ Server:

   ```bash
   docker run -d --hostname my-rabbit --name some-rabbit -p 15672:15672 -p 5672:5672  rabbitmq:3-management
   ```

5. Run the Redis Server:

   ```bash
    docker run --name some-redis -d -p 6379:6379 redis
   ```

6. Run the PostgreSQL Server:

   ```bash
    docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
   ```

7. Run the Front End:

   ```bash
   cd apps/client

   npm run dev # For Development purposes

   npm run build # For Production purposes
   npm run start
   ```

8. Run the Main Server:

   ```bash
    cd apps/main-server

    npm run dev # For Development purposes

    npm run build # For Production purposes
    npm run start
   ```

9. Run the Email Server:

   ```bash
    cd apps/email-server

    npm run dev # For Development purposes

    npm run build # For Production purposes
    npm run start
   ```

### Run with Docker

Set the environment variables in the `.env` and `.env.prod` files as mentioned above.

#### Create Docker Secrets files

```bash
    cd secrets/
    echo "mysecretpassword" | docker secret create db_password -
    echo "mysecretpassword" | docker secret create mq_password -
    echo "mysecretpassword" | docker secret create redis_password -

    cd ..
```

1. Build the Docker Images

   ```bash
    docker-compose build
   ```

2. Run the Docker Containers

   ```bash
    docker-compose up
   ```

3. Stop the Docker Containers

   ```bash
    docker-compose down
   ```

<!-- Demonstration -->

## Demonstration

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the GNU License. See [`LICENSE`](https://github.com/KishorBalgi/newsletter-platform/blob/main/LICENSE) for more information.

<!-- CONTACT -->

## Contact

[![Linkedin][lnk]][lnk-url]
[![Twitter][twitter]][twitter-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[TS]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[Express]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Postgre]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Postgre-url]: https://www.postgresql.org/
[prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[RabbitMQ]: https://img.shields.io/badge/Rabbitmq-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white
[RabbitMQ-url]: https://www.rabbitmq.com/
[Redis]: https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white
[Redis-url]: https://redis.io/
[lnk]: https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[lnk-url]: https://www.linkedin.com/in/kishorbalgi/
[twitter]: https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white
[twitter-url]: https://twitter.com/KishorBalgi
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Grafana]: https://img.shields.io/badge/grafana-%23F46800.svg?style=for-the-badge&logo=grafana&logoColor=white
[Grafana-url]: https://grafana.com/
[Prometheus]: https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=Prometheus&logoColor=white
[Prometheus-url]: https://prometheus.io/
[Git]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/
[GitHub]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[GitHub-url]: https://github.com
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/en/
[Nodemailer]: https://img.shields.io/badge/Nodemailer-009CAB?style=for-the-badge&logo=Nodemailer&logoColor=white
[Nodemailer-url]: https://nodemailer.com/about/
[Turborepo]: https://img.shields.io/badge/turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=white
[Turborepo-url]: https://turborepo.com/
[Shadcn]: https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn&logoColor=white
[Shadcn-url]: https://shadcn.com/
