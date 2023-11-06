# Highlights

A web app that allows users to effortlessly distill insights from calls & audio in 180+ languages. Share & save key points with ease.

![App Screenshot](https://github.com/ashutosh-s15/GIFs/blob/main/highlight-ss.jpeg)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

bash
npm run dev

# or

yarn dev

# or

pnpm dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Development

### Setup

1. Clone the repo into a public GitHub repository.

   sh
   git clone https://github.com/ashutosh-s15/highlights.git

2. Go to the project folder

   sh
   cd highlights

3. Install packages with yarn

   sh
   yarn

4. Set up your `.env` file

   - Duplicate `.env.example` to `.env`
   - Use `openssl rand -base64 32` to generate a key and add it under `NEXTAUTH_SECRET` in the `.env` file.
   - Create a Open API key by heading over to [here](https://openai.com/) and add it under `NEXT_PUBLIC_OPENAI_API_KEY` in the `.env` file.
   - Get your `OAuth Id` and `client secret` from [here](https://developers.google.com/identity/protocols/oauth2) and add it under `GOOGLE_ID` and `GOOGLE_CLIENT_SECRET`.
   - Get a MongoDB connection URI. You can either run a local cluster or provision one from [here](https://www.mongodb.com/atlas/database) and add it under `MONGODB_URI`.

5. Setup Node
   If your Node version does not meet the project's requirements as instructed by the docs, "nvm" (Node Version Manager) allows using Node at the version required by the project:

   sh
   nvm use

   You first might need to install the specific version and then use it:

   sh
   nvm install && nvm use

   You can install nvm from [here](https://github.com/nvm-sh/nvm).

   sh
   yarn dev

   ```

   ```

```

```
