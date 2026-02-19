# Courses Vue App

A modern course management web application built with **Vue 3** and **Vite**. Users can register, log in, create courses, view course details, and manage their learning catalog.

## Features

- **User Authentication**: Registration and login system with form validation
- **Course Management**: Create, view, and manage courses
- **Course Cards**: Interactive course display with duration and creation date information
- **Responsive UI**: Clean, modular component architecture with reusable common components
- **State Management**: Centralized state management with Vue store
- **Date Formatting**: Automatic date formatting for course creation dates
- **Form Validation**: Input validation for course creation and user authentication

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend build tool
- **JavaScript (ES6+)** - Core application logic

## Project Structure

```
src/
├── components/          # Feature components
│   ├── CourseForm/      # Form for creating/editing courses
│   ├── CourseInfo/      # Detailed course information
│   ├── Courses/         # Course listing and management
│   ├── Header/          # Application header and logo
│   ├── Login/           # User login page
│   └── Registration/    # User registration page
├── common/              # Reusable UI components
│   ├── Button/          # Reusable button component
│   └── Input/           # Reusable input component
├── helpers/             # Utility functions
│   ├── formatCreationDate.js
│   ├── getCourseDuration.js
│   ├── generateUUID.js
│   └── ...
├── store.js             # State management
├── constants.js         # Application constants
├── App.vue              # Root component
└── main.js              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```sh
npm install
```

### Development

Start the development server with hot module replacement:

```sh
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Production Build

Create an optimized production build:

```sh
npm run build
```

## Recommended Development Tools

### IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension (disable Vetur if installed)

### Browser Extensions

**Chrome/Edge/Brave:**
- [Vue.js DevTools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Enable Custom Object Formatter in DevTools settings for better debugging

**Firefox:**
- [Vue.js DevTools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- Enable Custom Object Formatter in DevTools for better debugging

## Configuration

Learn more about customizing your setup in the [Vite Configuration Reference](https://vite.dev/config/).

## License

MIT
