# DesignSpark AI

An AI-powered application that transforms simple text descriptions into complete, professional, and visually stunning project presentation pages.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/enzomarc237/sparkAI)

## About The Project

DesignSpark AI is an innovative web application that empowers users to instantly generate stunning, professional project presentation pages from simple text descriptions. The user provides a brief idea for an application, and our AI, acting as an expert Product Manager, analyzes the concept and produces a structured, comprehensive set of content.

This content is then rendered into a visually captivating, single-page layout featuring custom illustrations, elegant typography, and a modern, playful aesthetic. The generated page includes a hero section with the app's name and tagline, a detailed features grid, problem and solution statements, a target audience profile, and a concluding call-to-action, providing a complete, ready-to-share project showcase.

### Key Features

*   **Instant Page Generation:** Go from a simple text idea to a full-fledged project presentation in seconds.
*   **AI-Powered Content:** The AI acts as a Product Manager to generate structured, professional content including features, problem/solution statements, and more.
*   **Visually Stunning Design:** Renders content into a beautiful, modern, and illustrative single-page layout.
*   **Custom Aesthetics:** Features unique, sketchy-style SVG illustrations and elegant typography for a whimsical feel.
*   **Interactive Experience:** Smooth animations, hover states, and a delightful user journey from input to final presentation.
*   **Ready to Share:** The generated page is a complete, ready-to-share showcase for your project idea.

## Technology Stack

This project is built with a modern, high-performance technology stack:

*   **Frontend:**
    *   [React](https://react.dev/)
    *   [Vite](https://vitejs.dev/)
    *   [TypeScript](https://www.typescriptlang.org/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [shadcn/ui](https://ui.shadcn.com/)
    *   [Framer Motion](https://www.framer.com/motion/)
    *   [Zustand](https://zustand-demo.pmnd.rs/)
*   **Backend & Infrastructure:**
    *   [Cloudflare Workers](https://workers.cloudflare.com/)
    *   [Cloudflare Agents SDK](https://developers.cloudflare.com/workers/agents/)
    *   [Hono](https://hono.dev/)
    *   [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or later)
*   [Bun](https://bun.sh/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/designspark-ai.git
    cd designspark-ai
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

3.  **Configure Cloudflare AI Gateway:**
    You need to set up your Cloudflare AI Gateway credentials. Create a `.dev.vars` file in the root of the project and add your credentials. **Do not commit this file to version control.**

    ```ini
    # .dev.vars
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

    Replace the placeholder values with your actual Cloudflare Account ID, Gateway ID, and API Key.

### Running the Development Server

Start the Vite development server, which includes the Cloudflare Worker backend:

```sh
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

1.  Navigate to the application's homepage.
2.  You will be presented with a large text area.
3.  Describe your application idea in a few sentences.
4.  Click the "Spark Design" button.
5.  A loading animation will appear while the AI generates the content.
6.  Once complete, the view will transform to display your fully-rendered project presentation page.

## Deployment

Deploying this application to Cloudflare is a straightforward process.

### One-Click Deploy

You can deploy this project to your own Cloudflare account with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/enzomarc237/sparkAI)

### Manual Deployment via CLI

1.  **Build the application:**
    ```sh
    bun build
    ```

2.  **Deploy to Cloudflare Workers:**
    This command will build and deploy your application. Wrangler will guide you through the authentication process if it's your first time.
    ```sh
    bun deploy
    ```

## License

Distributed under the MIT License. See `LICENSE` for more information.