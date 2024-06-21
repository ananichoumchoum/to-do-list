# To-Do List Application - Backend Hackathon

## Overview

This is the backend for a To-Do List application developed during an 8-hour hackathon. It provides API endpoints to manage to-do lists and their items. The backend is built with **Node.js** and **Express** and uses file-based storage to persist data.

## Features

- **Get All Lists**: Fetch all to-do lists.
- **Get Specific List**: Retrieve a specific to-do list by ID.
- **Get All Items for Specific List**: Fetch all items for a specific to-do list.
- **Add Item to List**: Add a new item to a specific to-do list.
- **Delete Item from List**: Delete a specific item from a to-do list.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **NPM**: Node Package Manager comes with Node.js.

### Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/ananichoumchoum/to-do-list.git
    ```
2. **Navigate to the Project Directory**:
    ```bash
    cd to-do-list
    ```
3. **Install Dependencies**:
    ```bash
    npm install
    ```

### Usage

1. **Start the Server**:
    ```bash
    npm start
    ```
2. **Access the API**:
    - The server will start on `http://localhost:3000`. You can use tools like Postman or your browser to test the endpoints.

### API Endpoints

#### Get All Lists

- **Endpoint**: `GET /`
- **Description**: Retrieves all to-do lists.
- **Example**:
    ```bash
    curl http://localhost:3000/
    ```

#### Get Specific List

- **Endpoint**: `GET /:listId`
- **Description**: Retrieves a specific to-do list by its ID.
- **Parameters**: 
  - `listId` (String): The ID of the list.
- **Example**:
    ```bash
    curl http://localhost:3000/1234
    ```

#### Get All Items for Specific List

- **Endpoint**: `GET /:listId/items`
- **Description**: Retrieves all items for a specific to-do list.
- **Parameters**: 
  - `listId` (String): The ID of the list.
- **Example**:
    ```bash
    curl http://localhost:3000/1234/items
    ```

#### Add Item to List

- **Endpoint**: `POST /:listId`
- **Description**: Adds a new item to a specific to-do list.
- **Parameters**:
  - `listId` (String): The ID of the list.
  - `body` (String): The content of the new item.
- **Request Body**:
    ```json
    {
      "body": "New task description"
    }
    ```
- **Example**:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"body": "New task"}' http://localhost:3000/1234
    ```

#### Delete Item from List

- **Endpoint**: `DELETE /:listId/:itemId`
- **Description**: Deletes a specific item from a to-do list.
- **Parameters**:
  - `listId` (String): The ID of the list.
  - `itemId` (String): The ID of the item to be deleted.
- **Example**:
    ```bash
    curl -X DELETE http://localhost:3000/1234/5678
    ```
