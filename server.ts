import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";

dotenv.config();

const app = express();
const PORT = 3000;

// Remove fingerprinting header
app.disable("x-powered-by");

// Enable Gzip/Deflate compression for fast payload delivery
app.use(compression());

// Apply Hardened Helmet Security Headers
app.use(
  helmet({
    // Keep CSP & Frameguard relaxed for AI Studio iframe embedding compatibility
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    frameguard: false,
    hidePoweredBy: true,
    xContentTypeOptions: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    dnsPrefetchControl: { allow: false },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    originAgentCluster: true,
    permittedCrossDomainPolicies: { permittedPolicies: "none" },
    xssFilter: true,
  })
);

// Explicit Security & Permissions Headers Middleware
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );
  next();
});

// Strict body parsing limits to prevent JSON flooding / memory exhaustion attacks
app.use(express.json({ limit: "512kb" }));
app.use(express.urlencoded({ extended: false, limit: "512kb" }));

// API Health Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Ha Hu Ai",
    environment: process.env.NODE_ENV || "development",
    time: new Date().toISOString(),
  });
});

// Centralized Safe Error Handling Middleware (prevents leaking stack traces)
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (res.headersSent) {
      return next(err);
    }
    console.error("Internal Server Error caught safely:", err?.message || err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

// Vite & Static file handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    // Static asset serving with aggressive immutable caching for hashed files
    app.use(
      express.static(distPath, {
        maxAge: "1y",
        immutable: true,
        setHeaders: (res, filePath) => {
          // Never cache index.html so updates are immediately picked up
          if (filePath.endsWith("index.html")) {
            res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
          }
        },
      })
    );

    // SPA wildcard fallback
    app.get("*", (req, res) => {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ha Hu Ai server running securely on http://0.0.0.0:${PORT}`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log("Shutting down Ha Hu Ai server gracefully...");
    server.close(() => {
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer();
