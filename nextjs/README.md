This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Open the `FullStackDevelopment.code-workspace` workspace in VSCode.

First, change the `.env_example` file to `.env`

Modify the SERVER_ADDRESS with the real server address (Ask Long if you don't know)

Then you can run the development server:

```bash
npm install
npm run dev
```

The project will be run on [http://localhost:3000](http://localhost:3000) and it will be connected to the server backend

## Structure of the Next JS app

| **Folder**             | **Description**                      |
| ---------------------- | ------------------------------------ |
| nextjs                 | All folders created for this project |
| &nbsp;&#65090; context | React context for the application    |
| &nbsp;&#65090; prisma  | Database schema                      |
| &nbsp;&#65090; public  | Public files on the website          |
| &nbsp;&#65090; src     | Project Source folder                |
| &nbsp;&#65090; styles  | CSS stylings                         |
| &nbsp;&#65090; types   | Project Typings                      |

## Structure of the src folder

| **Folder**          | **Description**               |
| ------------------- | ----------------------------- |
| src                 | All folders created for src   |
| &nbsp;&#65090; app  | App Router folder for next JS |
| &nbsp;&#65090; lib  | Library folder                |
| &nbsp;&#65090; util | Utilities functions           |
