# InsightInk

InsightInk is a blog platform where users can sign up, write blogs to share their interests with the world, and edit or delete their blogs at their convenience. Built with a modern tech stack, InsightInk provides a seamless and secure blogging experience.

## Features

- **User Authentication:** Secure JWT-based authentication to protect user data and ensure secure access to authenticated routes.
- **Blog Management:** Users can create, edit, and delete their blogs with ease.
- **Responsive Design:** A mobile-first design powered by TailwindCSS ensures a seamless experience across all devices.
- **Rich Text Editor:** A user-friendly interface for writing and formatting blog posts.
- **Serverless Backend:** Leverage Cloudflare Workers and Heno.js for a highly scalable and efficient backend.

## Tech Stack

- **Frontend:**
  - React.js: A JavaScript library for building user interfaces.
  - TailwindCSS: A utility-first CSS framework for rapid UI development.
  - TypeScript: A strongly typed programming language that builds on JavaScript.

- **Backend:**
  - Serverless Architecture: Using Cloudflare Workers for scalable backend functions.
  - Heno.js: A framework for building serverless applications.
  - TypeScript: Ensuring a type-safe backend.
  - PostgreSQL: A powerful, open-source object-relational database system.
  - Prisma ORM: A modern database toolkit for TypeScript and Node.js.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abhi200206/InsightInk.git
   cd InsightInk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the necessary environment variables for your database and JWT secret.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Usage

1. **Sign up / Log in:** Create a new account or log in with your existing credentials.
2. **Dashboard:** View and manage your blog posts.
3. **Create Blog:** Write new blog posts using the rich text editor.
4. **Edit Blog:** Update your existing blogs to keep your content fresh and accurate.
5. **Delete Blog:** Remove blogs that you no longer want to display.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [React.js](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Heno.js](https://hono.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)

---
