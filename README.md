---

# **Action History API**

This is a Node.js/Typescript API for logging actions related to products in an inventory management system. It includes functionality for logging actions like adding, updating, or deleting products, and retrieving the product history with filtering and pagination support, All those actions are retreived from the inv service api.

---

## **Features**

- **Log Actions**: Allows logging of actions performed on products in the inv service api.
- **Retrieve History**: Fetch the history of actions performed on products, with support for various filters like `store_id`, `plu`, `action`, `from_date`, and `to_date`.
- **Pagination**: Supports pagination for retrieving large datasets.

---

## **Technologies Used**

- [**Node.js**
- **Express**
- **PostgreSQL**
- **Typescript**

---

## **How to get started**

### **Steps**

1. **Clone the Repository**
  
  ```bash
  git clone <repository-url>
  cd <repository-folder>
  ```
  
2. **Install Dependencies**
  
  ```bash
  npm install
  ```
  
3. **Configure Environment Variables**
  Refactor `.env.example` file in the project root and remove the .example then add your info, the file should look like this
  
  ```env
  NODE_ENV=development
  PORT=5000
  SERVER_URL=http://localhost:5000
  DB_USER=your_db_user
  DB_HOST=your_db_host
  DB_NAME=your_db_name
  DB_PASSWORD=your_db_password
  DB_PORT=5432
  DB_URL=postgresql://your_db_user:your_db_password@your_db_host:5432/your_db_name
  ```
  
4. **Create the database table:**
  Run the SQL command below to create the `product_history` table in your PostgreSQL database:
  
  ```sql
  CREATE TABLE product_history (
     id SERIAL PRIMARY KEY,
     store_id INT,
     plu VARCHAR(12),
     action VARCHAR(50) NOT NULL,
     description TEXT,
     created_at TIMESTAMP DEFAULT NOW()
  );
  ```
  

---

Running the Application

To start the application, run:

```bash
npm start
```

## API Endpoints

### POST `/api/history`

Logs an action for a product. should be automatically used by the inv service api

**Request Body**:

```json
{
  "store_id": 1,
  "plu": "ABC123",
  "action": "add",
  "description": "Added 10 units of product ABC123."
}
```

**Response**:

```json
{
  "success": true,
  "message": "Action logged successfully.",
  "data": {
    "id": 1,
    "store_id": 1,
    "plu": "ABC123",
    "action": "add",
    "description": "Added 10 units of product ABC123.",
    "created_at": "2024-11-21T12:34:56.000Z"
  }
}
```

### GET `/api/history`

Fetches the product history based on filters.

**Query Parameters**:

- `store_id`: Filter by store ID.
- `plu`: Filter by product code (PLU).
- `action`: Filter by action type.
- `from_date`: Filter by start date (format: `YYYY-MM-DD`).
- `to_date`: Filter by end date (format: `YYYY-MM-DD`).
- `page`: Page number (optional, defaults to 1).
- `limit`: Results per page (optional, defaults to 10).

**Response**:

```json
{
  "success": true,
  "message": "History fetched successfully.",
  "data": [
    {
      "id": 1,
      "store_id": 1,
      "plu": "ABC123",
      "action": "add",
      "description": "Added 10 units of product ABC123.",
      "created_at": "2024-11-21T12:34:56.000Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "limit": 10,
    "total_pages": 1,
    "total_records": 1,
    "next_page": null,
    "prev_page": null
  }
}
```

---