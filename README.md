# Disease Detector

A project to detect diseases based on symptoms using a machine learning model. The frontend is built with Vite and TypeScript, and the backend is powered by Python using Flask.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Data](#data)
- [Contributing](#contributing)
- [License](#license)

## Features

- Input symptoms to predict potential diseases.
- View detailed descriptions and precautions for predicted diseases.
- User-friendly interface with search and selection capabilities.

## Technologies

### Frontend

- Vite
- TypeScript
- React

### Backend

- Python 3
- Flask
- scikit-learn
- pandas

## Setup

### Prerequisites

- vite/react (for frontend)
- Python 3 (for backend)
- pip (Python package installer)

### Frontend Setup

1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

### Backend Setup

1. Navigate to the backend directory:
   cd backend

2. Create a virtual environment (optional but recommended):
   python -m venv venv

3. Activate the virtual environment:
   source venv/bin/activate

4. Install dependencies:
   pip install -r requirements.txt

5. Run the Flask server:
   python app.py

## Usage

1. Start the frontend and backend servers as described in the setup instructions.
2. Open your browser and navigate to the frontend URL (usually http://localhost:5173 or similar).
3. Use the interface to select symptoms and predict potential diseases.

## Data

The machine learning model uses a dataset sourced from Kaggle. The dataset includes symptoms mapped to various diseases, along with descriptions and precautions.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License.
