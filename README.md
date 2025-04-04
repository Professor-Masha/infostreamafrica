
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

### API Integrations
- **YouTube Data API v3**: Integration for video content
  - Channel information
  - Video metadata
  - Playback capabilities
  - View counts and statistics

### Development Tools
- **ESLint**: Code linting for consistent style
- **PostCSS**: Tool for transforming CSS with JavaScript
- **Class Variance Authority**: Creating variant components efficiently
- **Tailwind Merge**: Utility for merging Tailwind CSS classes

## Design Philosophy

### Responsive Design
The application implements a fully responsive design strategy ensuring optimal user experience across all devices:

- **Mobile-First Approach**: Designed with mobile users as the primary consideration
- **Adaptive Layout**: Content reorganizes based on screen size
- **Touch-Friendly Elements**: Larger touch targets on mobile devices
- **Consistent Typography**: Readable text across all devices
- **Performance Optimization**: Fast loading even on slower connections

### Accessibility
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **ARIA Attributes**: Enhanced accessibility for screen readers
- **Keyboard Navigation**: Complete functionality without mouse interaction
- **Color Contrast**: WCAG 2.1 compliant color schemes
- **Focus Management**: Clear visual indicators for keyboard focus

### User Experience
- **Intuitive Navigation**: Clear information architecture
- **Content Hierarchy**: Visual priority for important content
- **Feedback Mechanisms**: Toast notifications for user actions
- **Loading States**: Skeleton loading for content-heavy pages
- **Error Handling**: User-friendly error messages

## Performance Optimization

- **Code Splitting**: Dynamic imports for improved initial load time
- **Image Optimization**: Appropriate sizing and lazy loading
- **Memoization**: Strategic use of React.memo and useMemo
- **State Management**: Efficient state updates with React Query
- **Fetch Optimization**: Caching and deduplication of API requests

## Future Development Roadmap

- **Personalized Content Feed**: Algorithm-based content recommendations
- **Multi-language Support**: Translation capabilities for pan-African reach
- **Offline Reading**: Service worker implementation for offline article access
- **Push Notifications**: Real-time alerts for breaking news
- **User-generated Content**: Allowing verified users to contribute content
- **Comment System**: Discussion capabilities on articles
- **Advanced Analytics**: More detailed content performance metrics
- **Mobile Applications**: Native mobile apps for iOS and Android

## How to Edit This Code

There are several ways to edit your application:

### Use Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/c66e162b-a4e4-411e-aeff-928305f658c0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

### Use Your Preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Edit a File Directly in GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

### Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── ui/          # Base UI components from shadcn
│   └── ...          # Feature-specific components
├── contexts/        # React contexts for state management
├── hooks/           # Custom React hooks
├── lib/             # Utility functions and shared code
├── pages/           # Page components for each route
├── services/        # API service modules
└── types/           # TypeScript type definitions
```

## Environment Variables

The project uses the following environment variables:

- `YOUTUBE_API_KEY` - YouTube Data API v3 key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID

## Deployment

Simply open [Lovable](https://lovable.dev/projects/c66e162b-a4e4-411e-aeff-928305f658c0) and click on Share -> Publish.

## Custom Domain Setup

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
