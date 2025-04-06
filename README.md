
# InfoStream Africa News Platform

## Project Overview

InfoStream Africa is a comprehensive news platform focused on delivering the latest news, videos, and updates from across Africa. The platform aggregates content across various categories including Health, Science, Technology, Sports, and more, providing users with a one-stop destination for African news and media content.

## Live Demo

**URL**: https://lovable.dev/projects/c66e162b-a4e4-411e-aeff-928305f658c0

## Core Features

### Content Management
- **Categorized News Articles**: Organized content across multiple categories (Health, Science, Technology, Sports, etc.)
- **Trending Articles**: Highlighting popular and trending news stories
- **Search Functionality**: Robust search capability to find specific articles or topics
- **Article Recommendations**: Suggestion engine based on user reading habits
- **Blog Editor**: Rich text editor for creating and editing articles with scheduling capabilities
- **Article Publishing Workflow**: Support for draft, scheduled, and published states

### Media Integration
- **YouTube Channel Integration**: Seamless integration with InfoStream Africa YouTube channel
- **Video Playback**: Direct video viewing within the platform interface
- **Latest Videos Feed**: Automatically updated feed of recent videos
- **Trending Videos**: Showcasing videos gaining popularity

### User Management
- **Google Sign-In Authentication**: Secure login using Google credentials
- **User Profiles**: Personalized user accounts with preferences
- **Reading History**: Tracking of articles viewed by users
- **Bookmarking**: Ability to save articles for later reading
- **Role-Based Access Control**: Different permissions for admins, writers, and regular users

### Analytics & Insights
- **Article Analytics**: Tracking views, shares, and engagement
- **Category Breakdown**: Analysis of content popularity by category
- **User Interaction Metrics**: Understanding how users engage with content
- **Admin Dashboard**: Comprehensive analytics for administrators

## Technology Stack

### Frontend
- **React 18**: Latest version of React for building the user interface
- **TypeScript**: Strongly typed programming language for enhanced code quality
- **Vite**: Modern frontend build tool for faster development
- **React Router**: Library for routing and navigation
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Shadcn UI**: Component library built on Radix UI primitives
- **Recharts**: Composable charting library for data visualization
- **Lucide React**: Icon library for clean, consistent iconography
- **Tanstack Query (React Query)**: Data fetching and state management library

### Authentication & User Management
- **Google Identity API**: OAuth 2.0 authentication with Google
- **JWT Tokens**: Secure authentication using JSON Web Tokens
- **@react-oauth/google**: React library for Google authentication

### UI Components
- **Radix UI**: Unstyled, accessible components for building high-quality design systems
- **Class Variance Authority**: Utility for creating variant components
- **Sonner**: Toast notification system for user feedback
- **React Hook Form**: Form validation and management
- **Zod**: Schema validation library
- **Embla Carousel**: Lightweight carousel component
- **React Day Picker**: Flexible date picker component for scheduling posts

### API Integrations
- **YouTube Data API v3**: Integration for video content
  - Channel information
  - Video metadata
  - Playback capabilities
  - View counts and statistics

### Development Tools
- **ESLint**: Code linting for consistent style
- **PostCSS**: Tool for transforming CSS with JavaScript
- **Tailwind Merge**: Utility for merging Tailwind CSS classes
- **Tailwind Animate**: Animation utilities for Tailwind

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Setting Up the Development Environment

#### Option 1: Using Visual Studio Code

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd infostream-africa
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Open in VS Code**
   ```sh
   code .
   ```

4. **Start the development server**
   - Open the VS Code terminal (Ctrl+` or Terminal -> New Terminal)
   - Run the development server:
     ```sh
     npm run dev
     # or
     yarn dev
     ```
   - The application will be available at [http://localhost:8080](http://localhost:8080)

5. **VS Code Extensions Recommended**
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin (Volar)
   - ES7+ React/Redux/React-Native snippets

#### Option 2: Using npm/yarn directly

1. **Clone the repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd infostream-africa
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. **Access the application**
   Open your browser and navigate to [http://localhost:8080](http://localhost:8080)

### Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── ui/          # Base UI components from shadcn
│   ├── blog/        # Blog-related components
│   └── ...          # Feature-specific components
├── contexts/        # React contexts for state management
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and shared code
├── pages/           # Page components for each route
│   ├── admin/       # Admin dashboard pages
│   └── writer/      # Writer dashboard pages
├── services/        # API service modules
└── types/           # TypeScript type definitions
```

## Key Features Implementation

### Blog Editor System

The platform includes a robust blog editor that supports:

- **Rich Text Editing**: Full WYSIWYG editing capabilities
- **Article Scheduling**: Set publication dates for future release
- **Draft Saving**: Save work in progress
- **Image Upload**: Add images to articles
- **Category & Tag Management**: Organize content effectively
- **Preview Mode**: See how articles will look before publishing

### User Role Management

The system supports multiple user roles:

- **Admin**: Full access to all features, can publish content directly
- **Writer**: Can create content and submit for review
- **Reader**: Can read, comment, and save articles

### Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

All UI components adjust dynamically based on screen size.

## Building for Production

To create a production build:

```sh
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

To preview the production build locally:

```sh
npm run preview
# or
yarn preview
```

## Deployment Options

### Using Lovable

Simply open [Lovable](https://lovable.dev/projects/c66e162b-a4e4-411e-aeff-928305f658c0) and click on Share -> Publish.

### Manual Deployment

The project can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Amazon S3
- Firebase Hosting

## Custom Domain Setup

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Write tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on the repository or contact the project maintainers.
