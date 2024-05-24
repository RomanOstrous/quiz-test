# Quiz Application

This project is a Quiz Application built with React and Tailwind CSS. The application allows users to create, edit, delete, and search for quizzes. Each quiz can have multiple questions with one options.

## Features

- Add, edit, delete quizzes
- Add, edit, delete questions within a quiz
- Add, edit, delete options for each question
- Search for quizzes
- Take quizzes with a timer
- Display results at the end of a quiz

## Technologies Used

- React
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

Before you begin, ensure you have Node.js and npm installed on your machine. You can download Node.js and npm from [here](https://nodejs.org/).
Use node v20.11.1

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/quiz-application.git
    ```

2. Navigate to the project directory:

    ```bash
    cd quiz-application
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

### Running the Application

To start the application, run:

```bash
npm start
```

4. Open the app in your web browser by navigating to http://localhost:3000.

## Project Structure

The project is structured as follows:

```java
quiz-application/
│
├── public/               # Static files
├── src/                  # Source files
│   ├── components/       # React components
│   │   ├── GeneralPage.tsx
│   │   ├── QuizCard.tsx
│   │   ├── QuizCreateForm.tsx
│   │   └── QuizList.tsx
│   ├── types/            # TypeScript types
│   │   └── QuizType.ts
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   └── ...               # Other files
│
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Usage

### Adding a Quiz

1. Click the "Add quiz" button.
2. Fill in the quiz name and details.
3. Click "Create Quiz".

### Editing a Quiz

1. Click the "Edit" button on the quiz card.
2. Modify the quiz details, questions, or options as needed.
3. Click "Accept" to save the changes.

### Deleting a Quiz

1. Click the "Remove" button on the quiz card.
2. Confirm the deletion.

### Searching for Quizzes

- Use the search bar to filter quizzes by name.

### Taking a Quiz

1. Click the "Start" button on the quiz card.
2. Answer each question within the given time.
3. Click "Next Question" to move to the next question.
4. At the end of the quiz, the results will be displayed.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
