# TripTrek

## Project Overview
TripTrek is a web application that provides a platform for users to discover, interact with, and manage travel listings. Users can log in using email/password credentials, Google, or GitHub authentication through NextAuth. The application offers various features such as browsing listings, filtering by category, viewing 3D models and videos of listings, managing liked and posted listings, making reservations, and communicating with landlords through a chatroom.

## Features
- User authentication with NextAuth supporting email/password, Google, and GitHub providers
- Listing pages with filter options by category
- Viewing 3D models and videos of listings using Three.js
- Separate pages for managing liked listings, posted listings, reservations, and chatroom communication with landlords
- Ability to create listings and make reservations for specific dates
- Reservation system where landlords can accept or decline reservations

## Technologies Used
- Next.js: ^14.2.3
- TypeScript: ^5
- React: ^18.2.0
- Recoil: ^0.7.7
- NextUI: ^2.3.5
- Prisma: ^5.14.0
- NextAuth: ^4.24.7
- Stripe: ^15.7.0
- Three.js: ^0.164.1
- Google OAuth API: (latest version)
- GitHub OAuth API: (latest version)
- React Toastify: ^10.0.5
- TailwindCSS: ^3.3.0

## Installation

### Prerequisites
- Node.js
- npm or yarn

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/triptrek.git
    ```
2. Navigate to the project directory:
    ```sh
    cd triptrek
    ```
3. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```
4. Set up environment variables:
    ```sh
    cp .env.develop.local .env
    # Edit .env with your configuration
    ```
5. Run the development server:
    ```sh
    npm run dev
    # or
    yarn dev
    ```

## Usage
After setting up the project, open your browser and navigate to `http://localhost:3000` to see the application in action.

## Deployment

### Vercel
The project is deployed on Vercel. You can access the deployed version [here](https://triptrek.vercel.app/).

1. Sign in to [Vercel](https://vercel.com/) or create an account if you don't have one.
2. Install the Vercel CLI:
    ```sh
    npm install -g vercel
    ```
3. Run the deployment command in the project directory:
    ```sh
    vercel
    ```
4. Follow the prompts to link your project and configure deployment settings.
5. Set the necessary environment variables in the Vercel dashboard.

## Directory Structure

```
triptrek/
├── public/ # Static assets
├── src/
│ ├── components/ # React components
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Next.js pages
│ ├── utils/ # Utility functions
│ ├── actions/ # API calls and server-side actions
│ └── providers/ # Context and state providers
├── .env # Environment variables
├── .env.development.local # Environment variables for vercel deployment
├── next.config.js # Next.js configuration
├── package.json # Project metadata and scripts
├── package-lock.json # Project metadata and scripts
└── README.md # Project documentation
```

## Environment Variables
Below are the environment variables used in the project. You will need to set these up in a `.env` file in the root directory of your project. 

DATABASE_URL="postgresql://postgres:password@localhost:5432/triptrekdb?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_51PIU8PFNs7JRlnzg3ChEAmMK9cs1erMO6n0G2hNbwWior9NDT53dmhS8mGRP7hmvCYHWYiMkPs8Z4drtKK6qduTn00GOmLFk9X"

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, please contact https://github.com/GITZMBE.
