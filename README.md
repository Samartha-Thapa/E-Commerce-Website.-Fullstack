# Authentication Web Application

A full-stack web application currently in development, built with Laravel and Next.js. The project focuses on authentication, Google OAuth integration, and frontend-backend integration.

## Project Status

**In progress.** Authentication functionality is being developed before expanding the application's core features.

## Tech Stack

### Backend
- Laravel
- PHP
- Laravel Socialite for Google OAuth
- Laravel Telescope for debugging and application monitoring
- MySQL

### Frontend
- Next.js
- React
- shadcn/ui
- TypeScript

## Implemented Features

- User registration with request validation and password hashing.
- Google OAuth authentication using Laravel Socialite.
- Session-based authentication using Laravel's authentication system.
- Session regeneration after successful Google authentication.
- Authentication error handling and frontend redirection.
- Development debugging and request inspection using Laravel Telescope.


## Project Structure

The application is divided into two parts:

- **Backend:** Laravel application responsible for authentication, OAuth callbacks, sessions, and server-side logic.
- **Frontend:** Next.js application responsible for the user interface and authentication-related interactions.

## Local Development Setup

### Prerequisites

- PHP and Composer
- Node.js and npm
- A database supported by the Laravel application
- Google OAuth credentials configured in Google Cloud Console

### Backend Setup

1. Clone the backend repository.
2. Install PHP dependencies:

   composer install
   
3. Create the environment file:

   cp .env.example .env
   
4. Generate the Laravel application key:

   php artisan key:generate
   
5. Configure the database, session settings, frontend URL, and Google OAuth credentials in `.env`.

6. Run database migrations:

   php artisan migrate

7. Start the Laravel development server:

   php artisan serve

### Frontend Setup

1. Clone the frontend repository.
2. Install dependencies:

   npm install 

3. Configure the frontend environment variables according to the application's configuration.
4. Start the development server using the script defined in `package.json`, for example:

   npm run dev
   
## Google OAuth Configuration

Configure the Google OAuth client in Google Cloud Console and set the corresponding client ID, client secret, and callback URL in the backend environment.

The callback URL must match the route configured in Laravel Socialite.

Ensure the frontend URL, session cookie settings, and CORS configuration are compatible with your local development setup.

**Never commit `.env` files, OAuth client secrets, or other credentials to GitHub.**

## Development Workflow

Git and GitHub are used for version control and branch-based development. Laravel Telescope is used during development to inspect application activity and help troubleshoot issues.

## Planned Work

- Complete and test the remaining authentication flows.
- Improve validation and authentication error handling.
- Develop the application's main features.
- Add automated tests for authentication and authorization.
- Improve setup documentation and deployment readiness.

## Disclaimer

This project is for learning and development purposes. It is not yet a completed production application.