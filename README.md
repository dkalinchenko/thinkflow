# ThinkFlow

A decision matrix application to help users make better decisions.

## Overview

ThinkFlow helps users make complex decisions by:
- Breaking down decisions into criteria
- Weighting criteria by importance
- Rating alternatives against each criterion
- Calculating optimal choices

## Project Structure

- `/server` - Node.js backend API
- `/client` - React frontend (to be implemented)

## Deployment

This application is configured for deployment on Render:
- Backend API: Node.js web service
- Database: PostgreSQL

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   cd server && npm install
   ```
3. Start the server:
   ```
   cd server && npm start
   ```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api` - Welcome message
- `GET /api/decisions` - List sample decisions 