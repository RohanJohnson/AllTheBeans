# Project Setup Guide  
This document will guide you through setting up the project on your local machine, including the necessary technologies and configurations.  

- [Project Setup Guide](#project-setup-guide)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Back-end API](#back-end-api)
    - [Setup](#setup)
      - [Step 1: Install Dependencies](#step-1-install-dependencies)
      - [Step 2: Configure PostgreSQL Database](#step-2-configure-postgresql-database)
      - [Step 3: Configure Environment Variables](#step-3-configure-environment-variables)
      - [Step 4: Run Database Migrations](#step-4-run-database-migrations)
      - [Step 5: Seed Data Into the Database](#step-5-seed-data-into-the-database)
      - [Step 6: Start the Nest Server](#step-6-start-the-nest-server)
    - [Testing](#testing)
    - [Endpoints](#endpoints)
      - [GET /bean-of-the-day](#get-bean-of-the-day)
      - [GET /bean-of-the-day/next](#get-bean-of-the-daynext)
      - [GET /coffee-beans](#get-coffee-beans)
      - [GET /coffee-beans/:id](#get-coffee-beansid)
      - [POST /coffee-beans](#post-coffee-beans)
      - [PUT /coffee-beans/:id](#put-coffee-beansid)
      - [DELETE /coffee-beans/:id](#delete-coffee-beansid)
      - [POST /orders](#post-orders)
  - [Front-end](#front-end)
      - [Step 1: Install Dependencies](#step-1-install-dependencies-1)
      - [Step 2: Run the server](#step-2-run-the-server)


## Prerequisites  
Ensure the following technologies are installed on your machine:  
- **Node.js (v22.x)** – [Download Node.js](https://nodejs.org/)  
- **PostgreSQL (v15.x) with pgAdmin** – [Download PostgreSQL with pgAdmin](https://www.postgresql.org/download/)  
- **Git (latest version)** – [Download Git](https://git-scm.com/)  



## Clone the Repository  
**NOTE:** The document I was given says 'a link to an accessible private
repository with your work in'. There is no way to make a private repository on GitHub accessible other than a personal invite or setting up a team. So please note that the repository is public, though no private information is on it.

1. Open a terminal or command prompt.  
2. Clone the project repository:  
    ```bash
    git clone https://github.com/RohanJohnson/AllTheBeans.git
    ```
3. Navigate to the project folder:  
    ```bash
    cd all-the-beans
    ```



## Back-end API

### Setup

#### Step 1: Install Dependencies  
1. Ensure you are in the project directory.  
    ```bash
    cd all-the-beans-api
    ```
2. Install the required Node.js dependencies:  
    ```bash
    npm install
    ```



#### Step 2: Configure PostgreSQL Database  
1. **Open pgAdmin**  
   - Launch pgAdmin and connect to your PostgreSQL server which you likely set up when you installed it. 

2. **Create a New Database**  
   - Right-click on the `Databases` node in the Object Browser.  
   - Select `Create > Database`.  
   - Set the Database Name to `all-the-beans`.  
   - Click **Save**.  



#### Step 3: Configure Environment Variables  
1. Create a `.env` file in the all-the-beans-api folder with the following content:  
    ```ini
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=<username>
    DATABASE_PASSWORD=<password>
    DATABASE_NAME=all-the-beans
    ```
2. Replace `<username>` and `<password>` with your PostgreSQL credentials.  



#### Step 4: Run Database Migrations  
1. Use the following command to apply database migrations:  
    ```bash
    npm run migration:run
    ```
2. This will create the necessary tables in your `all-the-beans` database.  



#### Step 5: Seed Data Into the Database
1. Make sure your terminal is in the correct directory:
    ```bash
    cd all-the-beans-api
    ```
2. Run the seeding command:
    ```bash
    npx ts-node seed.ts
    ```



#### Step 6: Start the Nest Server  
1. Run the development or production server (whichever you like):
    ```bash
    npm run start:dev
    OR
    npm run start:prod
    ```
2. The API will be available at [http://localhost:3000](http://localhost:3000) though there is no endpoint at the root.  

**PLEASE NOTE:** Seen as the bean of the day is selected at midnight, there will be none when you boot the application for the first time. For ease of testing, I have created an endpoint (listed below) that will allow you to manually get the next bean of the day.



### Testing
1. Make sure your terminal is in the correct directory:
    ```bash
    cd all-the-beans-api
    ```
2. Run the test command:
    ```bash
    npm run test
    ```


### Endpoints

#### GET /bean-of-the-day
Description: Retrieves the currently selected "Bean of the Day".

Response:

- 200 OK: Returns the details of the current "Bean of the Day".
- Example Response:

    ```json
    {
    "id": "1",
    "name": "TESTBEAN",
    "description": "Dolor fugiat duis dolore ut occaecat.",
    "country": "TESTCOUNTRY",
    "colour": "golden",
    "cost": 18.57,
    "image": "https://images.unsplash.com/photo-1641399756770-9b0b104e67c1"
    }
    ```
- 404 Not Found: If no bean has been selected yet, it returns:
    ```json
    { "message": "No bean selected yet." }
    ```

#### GET /bean-of-the-day/next
Description: Selects and returns a new "Bean of the Day". The new selection is different from the previous day's bean.

Response:

- 200 OK: Returns the details of the newly selected "Bean of the Day".
- Example Response:

    ```json
    {
    "id": "2",
    "name": "NEWBEAN",
    "description": "Anim adipisicing quis ut excepteur tempor magna.",
    "country": "NEWCOUNTRY",
    "colour": "dark brown",
    "cost": 20.5,
    "image": "https://images.unsplash.com/photo-1641399756770-abc12345"
    }
    ```
- 500 Internal Server Error: If no beans are available to select, it throws an error:

    ```json
    { "message": "No available coffee beans to select." }
    ```

#### GET /coffee-beans
Description: Retrieves a list of all coffee beans.

Response:

- 200 OK: Returns an array of coffee bean objects.
- Example Response:

    ```json
    [
    {
        "id": "1",
        "name": "TESTBEAN",
        "description": "Dolor fugiat duis dolore ut occaecat.",
        "country": "TESTCOUNTRY",
        "colour": "golden",
        "cost": 18.57,
        "image": "https://images.unsplash.com/photo-1641399756770-9b0b104e67c1"
    }
    ]
    ```

#### GET /coffee-beans/:id
Description: Retrieves details of a specific coffee bean by its ID.

Parameters:

- id: The ID of the coffee bean to retrieve.
Response:

- 200 OK: Returns the details of the specified coffee bean.

    ```json
    {
        "id": "1",
        "name": "TESTBEAN",
        "description": "Dolor fugiat duis dolore ut occaecat.",
        "country": "TESTCOUNTRY",
        "colour": "golden",
        "cost": 18.57,
        "image": "https://images.unsplash.com/photo-1641399756770-9b0b104e67c1"
    }
    ```

- 404 Not Found: If the coffee bean is not found, it throws a NotFoundException.

#### POST /coffee-beans
Description: Creates a new coffee bean.

Request Body:

  ```json
    {
        "name": "NEWBEAN",
        "description": "Dolor fugiat duis dolore ut occaecat.",
        "country": "NEWCOUNTRY",
        "colour": "golden",
        "cost": 18.57,
        "image": "https://images.unsplash.com/photo-1641399756770-9b0b104e67c1"
    }
  ```


- Response:

- 201 Created: Returns the newly created coffee bean.

    ```json
    {
        "id": 17,
        "name": "NEWBEAN",
        "description": "A freshly roasted coffee bean.",
        "country": "NEWCOUNTRY",
        "colour": "dark brown",
        "cost": 20.5,
        "image": "https://images.unsplash.com/photo-1641399756770-abc12345"
    }
    ```

#### PUT /coffee-beans/:id
Description: Updates an existing coffee bean.

Parameters:

- id: The ID of the coffee bean to update.

Request Body: Similar to the POST /coffee-beans request.

Response:

- 200 OK: Returns the updated coffee bean.
    ```json
    {
        "id": "1",
        "name": "TESTBEAN",
        "description": "Dolor fugiat duis dolore ut occaecat.",
        "country": "TESTCOUNTRY",
        "colour": "golden",
        "cost": 18.57,
        "image": "https://images.unsplash.com/photo-1641399756770-9b0b104e67c1"
    }
    ```
- 404 Not Found: If the coffee bean is not found, it throws a NotFoundException.

#### DELETE /coffee-beans/:id
Description: Deletes a coffee bean by its ID.

Parameters:

- id: The ID of the coffee bean to delete.
Response:

- 200 OK: Returns undefined on successful deletion.

#### POST /orders
Description: Would send customers and staff emails, however there is no SMTP server for this project so currently it does nothing. Though my steps to do this would be to pay for SendGrid and use their SMTP server for the emails.

Body:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@email.provider",
    "beanId": 12,
    "quantity": 2
  }
  ```
Response:
- 200 OK: returns a success message.
  ```json
  { "message": "Order received successfully!" };
  ```

## Front-end


#### Step 1: Install Dependencies  
1. Ensure you are in the project directory.  
    ```bash
    cd all-the-beans-frontend
    ```
2. Install the required Node.js dependencies:  
    ```bash
    npm install
    ```



#### Step 2: Run the server
1. Ensure you are in the project directory.  
    ```bash
    cd all-the-beans-frontend
    ```
2. Start the server
- Development
    ```bash
    npm run dev
    ```
  
- Production
    ```bash
    npm run build
    THEN
    npm run preview
    ```
  