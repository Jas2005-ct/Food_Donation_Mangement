# FoodShare: Food Donation Management System

FoodShare is a web application that provides a platform for managing food donations, connecting donors and NGOs to efficiently distribute surplus food to those in need. The system is built with a modern technology stack, offering a user-friendly interface and a robust backend.

## 🚀 Features

* **User Authentication**: Secure registration and login for both Donors and NGOs.
* **Donor Dashboard**: Donors can list food items with details such as title, description, quantity, meal type, and pickup location.
* **NGO Dashboard**: NGOs can view a real-time list of all available food donations and claim items that they wish to collect.
* **Donation Management**: The system automatically updates the status of a donation to "Claimed" once an NGO takes it.
* **Responsive UI**: The front end is built with React.js and is designed to be accessible on various devices.
* **Robust Backend**: The backend uses Django and Django Rest Framework to provide a secure and scalable API.

## 💻 Technology Stack

Frontend

* React.js: For building the user interface.
* Axios: For making API requests to the backend.
* HTML/CSS: For structuring and styling the application.

Backend

* Django: The primary web framework.
* Django Rest Framework (DRF): For building the RESTful API.
* Simple JWT: For secure, token-based authentication.
* PostgreSQL: A reliable and scalable relational database.

## ⚙️ Installation and Setup

### Prerequisites
* Python 3.11
* Node.js and npm
* PostgreSQL
* Git

### 1. Backend Setup
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/foodshare.git](https://github.com/yourusername/foodshare.git)
    cd foodshare/backend
    ```
2.  **Create a virtual environment and activate it:**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```
3.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Configure PostgreSQL:**
    Create a new database for the project. Update the DATABASES settings in settings.py with your database credentials.
5.  **Run migrations and create a superuser:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    python manage.py createsuperuser
    ```
6.  **Run the Django server:**
    ```bash
    python manage.py runserver
    ```
### 2. Frontend Setup
1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install npm dependencies:**
    ```bash
    npm install
    ```
3.  **Run the React application:**
    ```bash
    npm run dev
    ```
The application will be available at http://localhost:5173/ and the backend API at http://localhost:8000/.