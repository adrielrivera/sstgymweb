# SST Gym Booking

A web application for booking gym sessions at SST. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- View available gym time slots for the current week (automatically determined)
- Book gym sessions with your exercise plan
- Calendar view showing the entire 10-week term schedule
- Mobile-responsive design
- Real-time updates of booking capacity

## Getting Started

### Prerequisites

- Node.js (version 18.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/sstgymweb.git
   cd sstgymweb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to GitHub Pages

This application is configured for GitHub Pages deployment using GitHub Actions. 

### Automated Deployment

1. Push your changes to the `main` branch
2. The GitHub Actions workflow will automatically build and deploy your application
3. Your site will be available at `https://yourusername.github.io/sstgymweb`

### Manual Deployment

You can also deploy manually:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Install the gh-pages package if not already installed:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Build and deploy:
   ```bash
   npm run build
   npm run deploy
   ```

## School Calendar

The application follows the school calendar:
- Week 1 (March 24-28, 2024) is an ODD week
- Week 2 (March 31-April 4, 2024) is an EVEN week
- ...and so on for the 10-week term ending May 30, 2024

## Project Structure

```
sstgymweb/
├── src/
│   ├── app/                    # Next.js app router
│   ├── components/             # React components
│   ├── models/                 # Data models and types
│   ├── services/               # Business logic and API services
├── public/                     # Static files
├── .github/                    # GitHub Actions workflows
├── next.config.ts              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## License

This project is available as open source under the terms of the MIT License.

## Acknowledgments

- School of Science and Technology, Singapore
- Next.js team for the awesome framework
