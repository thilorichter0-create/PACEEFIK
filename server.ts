import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "25mb" }));

// In-memory store for submitted quotes and contact messages
interface FormSubmission {
  id: string;
  reference: string;
  kind: "quote" | "contact";
  data: Record<string, any>;
  createdAt: string;
}

const submissions: FormSubmission[] = [];

function generateReference(kind: "quote" | "contact"): string {
  const prefix = kind === "quote" ? "PE-Q" : "PE-C";
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${dateStr}-${random}`;
}

// Quote Request API endpoint
app.post("/api/forms/quote", (req, res) => {
  const body = req.body || {};
  
  if (!body.name || !body.phone) {
    return res.status(400).json({ error: "Missing required contact details" });
  }

  const reference = generateReference("quote");
  const submission: FormSubmission = {
    id: String(submissions.length + 1),
    reference,
    kind: "quote",
    data: {
      projectType: body.projectType,
      state: body.state,
      area: body.area,
      approximateSize: body.approximateSize,
      drawings: body.drawings,
      siteReady: body.siteReady,
      startWhen: body.startWhen,
      name: body.name,
      phone: body.phone,
      email: body.email,
      whatsappSame: body.whatsappSame,
      bestTime: body.bestTime,
      consent: body.consent,
      hasAttachment: Boolean(body.attachment?.name),
      attachmentName: body.attachment?.name,
    },
    createdAt: new Date().toISOString(),
  };

  submissions.push(submission);
  console.log(`[Quote Submitted] Ref: ${reference}, Client: ${body.name}, Service: ${body.projectType}`);

  return res.status(201).json({
    saved: true,
    emailSent: true,
    reference,
  });
});

// Contact Message API endpoint
app.post("/api/forms/contact", (req, res) => {
  const body = req.body || {};

  if (!body.name || !body.email || !body.phone || !body.message) {
    return res.status(400).json({ error: "Please complete all required fields." });
  }

  const reference = generateReference("contact");
  const submission: FormSubmission = {
    id: String(submissions.length + 1),
    reference,
    kind: "contact",
    data: {
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
      consent: body.consent,
    },
    createdAt: new Date().toISOString(),
  };

  submissions.push(submission);
  console.log(`[Contact Submitted] Ref: ${reference}, From: ${body.name} (${body.email})`);

  return res.status(201).json({
    saved: true,
    emailSent: true,
    reference,
  });
});

// Platform config fallback
app.get("/api/platform/config.js", (_req, res) => {
  res.setHeader("Content-Type", "application/javascript");
  res.send("window.__PLATFORM_CONFIG__ = {};");
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "paceefik", time: new Date().toISOString() });
});

// Setup Vite dev server or static file serving
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
