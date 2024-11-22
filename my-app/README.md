# Elier Portfolio

**Elier Portfolio** is a personal portfolio website showcasing the work and skills of the developer. The project is built using modern web technologies and is hosted on GitHub Pages.

## Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The project is organized as follows:

```bash
/
├── public/                 # Public assets and index.html
├── src/
│   ├── components/        # React components
│   │   └── ChatModal/    # Interactive AI chatbot component
│   ├── contexts/         # React contexts (Language, Theme)
│   ├── data/            # Static data and configurations
│   ├── hooks/           # Custom React hooks
│   └── styles/          # CSS and styling files
├── .github/              # GitHub-specific files
├── README.md             # Project documentation
├── package.json          # Project dependencies and scripts
└── .gitignore           # Git ignore configuration
```

## Tech Stack

- **HTML/CSS**: For the structure and responsive design of the site
- **JavaScript (React)**: To add interactivity and dynamic content
- **Git/GitHub**: For version control and project management
- **GitHub Pages**: Used for hosting the portfolio website
- **Custom Domain**: Configured for personalized URL
- **React Icons**: For consistent and scalable iconography
- **Context API**: For state management and internationalization

## Features

### Interactive AI Chatbot
- Bilingual support (Spanish/English)
- Dynamic navigation through portfolio sections
- Interactive benefits exploration
- Real-time typing indicators
- Message history preservation
- Smooth animations and transitions
- Quick access to key sections
- Responsive design for all devices

### Technical Highlights
- Optimized React components using Hooks
- Efficient state management
- Modular CSS with variables
- Accessibility considerations
- Mobile-first responsive design
- Smooth scrolling and animations
- Cross-browser compatibility

## Deployment

The portfolio is deployed using GitHub Pages. You can view it live at [Elier Portfolio](https://elelier.github.io/elier-portfolio).

### GitHub Pages Configuration

The project is configured to deploy from the `main` branch. Ensure that:

- The content is served from the `/src` folder
- GitHub Pages is set to deploy from the root (`/`)

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/elelier/elier-portfolio.git
    cd elier-portfolio
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Running the App Locally

To run the application in development mode:

```bash
npm start
```

This will start the app and open it in your browser at [http://localhost:3000](http://localhost:3000). The page will automatically reload if you make changes to the code.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will output the production files to the `build` directory, ready for deployment.

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add feature: your feature name"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a Pull Request

Please ensure that your code follows the project's coding standards and is well-documented.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---