
# Briefly - AI-Powered PDF Summarization

Save hours of reading time. Transform lengthy PDFs into clear, accurate summaries in seconds with our advanced AI technologies.

## Features

- 🤖 **AI-Powered Summarization**: Advanced AI technology to generate accurate and concise summaries
- 📄 **PDF Processing**: Upload and process PDF documents seamlessly
- 🔐 **User Authentication**: Secure sign-in/sign-up with Clerk authentication
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 💾 **Summary Management**: View, download, and manage your summaries
- 🎨 **Modern UI**: Clean and intuitive interface built with Radix UI components

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: Clerk
- **Database**: Neon (PostgreSQL)
- **AI/ML**: LangChain with Google Generative AI
- **File Upload**: UploadThing
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sommaire
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the required environment variables for:

- Clerk authentication keys
- Neon database connection
- Google Generative AI API key
- UploadThing configuration

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
sommaire/
├── app/                    # Next.js app router pages
│   ├── (logged-in)/       # Protected routes
│   │   ├── summaries/     # Summary management pages
│   │   └── upload/        # File upload page
│   ├── sign-in/           # Authentication pages
│   ├── sign-up/
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── common/           # Shared components
│   ├── summaries/        # Summary-related components
│   └── ui/               # UI components
├── lib/                  # Utility functions and configurations
├── utils/                # Helper utilities
└── public/               # Static assets
```

## Key Components

- **SummaryCard**: Displays summary information with file details and actions
- **SourceInfo**: Shows original file information and download options
- **DeleteButton**: Handles summary deletion functionality
- **Header/Footer**: Navigation and layout components

## Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## Environment Variables

Make sure to set up the following environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=

# Google AI
GOOGLE_API_KEY=

# UploadThing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Features in Detail

### PDF Upload and Processing

- Drag and drop PDF files or click to browse
- Automatic file validation and processing
- Real-time upload progress

### AI Summarization

- Powered by Google's Generative AI
- Context-aware summarization
- Maintains key information while reducing length

### User Management

- Secure authentication with Clerk
- User-specific summary storage
- Profile management

### Summary Management

- View all your summaries in a clean grid layout
- Download summaries as text files
- Delete unwanted summaries
- Search and filter capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Support

For support, please contact the development team or create an issue in the repository.
