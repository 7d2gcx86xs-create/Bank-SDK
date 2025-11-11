import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";
import fs from "node:fs";
import path from "node:path";
import { URL, fileURLToPath } from "node:url";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  type CallToolRequest,
  type ListResourceTemplatesRequest,
  type ListResourcesRequest,
  type ListToolsRequest,
  type ReadResourceRequest,
  type Resource,
  type ResourceTemplate,
  type Tool,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

type BankingWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  responseText: string;
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT_DIR, "dist");

// Mock portfolio data
const mockPortfolio = {
  totalValue: 125430.50,
  cash: 15230.25,
  dayChange: 2847.32,
  dayChangePercent: 2.32,
  holdings: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 50,
      avgPrice: 145.30,
      currentPrice: 178.25,
      value: 8912.50,
      change: 1647.50,
      changePercent: 22.66,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      shares: 30,
      avgPrice: 310.50,
      currentPrice: 378.85,
      value: 11365.50,
      change: 2050.50,
      changePercent: 22.03,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 75,
      avgPrice: 125.80,
      currentPrice: 142.15,
      value: 10661.25,
      change: 1226.25,
      changePercent: 12.99,
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      shares: 40,
      avgPrice: 220.00,
      currentPrice: 248.50,
      value: 9940.00,
      change: 1140.00,
      changePercent: 12.95,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      shares: 25,
      avgPrice: 450.00,
      currentPrice: 495.30,
      value: 12382.50,
      change: 1132.50,
      changePercent: 10.07,
    },
  ],
};

// Widget definitions
const widgets: BankingWidget[] = [
  {
    id: "portfolio-overview",
    title: "Show Portfolio Overview",
    templateUri: "ui://widget/portfolio-overview.html",
    invoking: "Loading portfolio data",
    invoked: "Portfolio loaded",
    html: "", // Will be loaded from file
    responseText: "Here's your current portfolio overview",
  },
  {
    id: "holdings-detail",
    title: "Show Holdings Detail",
    templateUri: "ui://widget/holdings-detail.html",
    invoking: "Fetching holdings",
    invoked: "Holdings retrieved",
    html: "",
    responseText: "Detailed view of your holdings",
  },
  {
    id: "news-feed",
    title: "Show Portfolio News",
    templateUri: "ui://widget/news-feed.html",
    invoking: "Searching for relevant news",
    invoked: "News articles found",
    html: "",
    responseText: "Latest news for your portfolio",
  },
];

function loadWidgetHtml(componentName: string): string {
  if (!fs.existsSync(ASSETS_DIR)) {
    throw new Error(
      `Expected directory ${ASSETS_DIR}. Run "pnpm run build" before starting the server.`
    );
  }

  const directPath = path.join(ASSETS_DIR, `${componentName}.html`);
  let htmlContents: string | null = null;

  if (fs.existsSync(directPath)) {
    htmlContents = fs.readFileSync(directPath, "utf8");
  } else {
    const candidates = fs
      .readdirSync(ASSETS_DIR)
      .filter(
        (file) => file.startsWith(`${componentName}-`) && file.endsWith(".html")
      )
      .sort();
    const fallback = candidates[candidates.length - 1];
    if (fallback) {
      htmlContents = fs.readFileSync(path.join(ASSETS_DIR, fallback), "utf8");
    }
  }

  if (!htmlContents) {
    throw new Error(
      `Widget HTML for "${componentName}" not found in ${ASSETS_DIR}. Run "pnpm run build" to generate the assets.`
    );
  }

  return htmlContents;
}

function widgetDescriptorMeta(widget: BankingWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
  };
}

async function fetchNewsForSymbol(symbol: string): Promise<any[]> {
  // In a real implementation, you would call a news API here
  // For now, return mock data structure that would come from web search
  return [
    {
      title: `${symbol} Stock Analysis: What Investors Need to Know`,
      source: "Financial Times",
      url: `https://example.com/news/${symbol.toLowerCase()}-analysis`,
      publishedAt: new Date().toISOString(),
      snippet: `Latest developments and market analysis for ${symbol}...`,
    },
    {
      title: `${symbol} Earnings Beat Expectations`,
      source: "Bloomberg",
      url: `https://example.com/news/${symbol.toLowerCase()}-earnings`,
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      snippet: `Company reports strong quarterly results...`,
    },
  ];
}

const mcpServer = new Server(
  {
    name: "banking-portfolio-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Register tools
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: widgets.map(
      (w): Tool => ({
        name: w.id,
        description: w.title,
        inputSchema: {
          type: "object",
          properties: w.id === "news-feed" 
            ? {
                symbols: {
                  type: "array",
                  items: { type: "string" },
                  description: "Stock symbols to fetch news for",
                },
              }
            : {},
          required: w.id === "news-feed" ? ["symbols"] : [],
        },
      })
    ),
  };
});

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const widget = widgets.find((w) => w.id === request.params.name);
  if (!widget) {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }

  let structuredContent: any = {};

  switch (widget.id) {
    case "portfolio-overview":
      structuredContent = {
        portfolio: mockPortfolio,
      };
      break;

    case "holdings-detail":
      structuredContent = {
        holdings: mockPortfolio.holdings,
      };
      break;

    case "news-feed":
      const symbols = (request.params.arguments as any)?.symbols || 
                     mockPortfolio.holdings.map(h => h.symbol);
      
      // Fetch news for each symbol
      const newsPromises = symbols.map((symbol: string) =>
        fetchNewsForSymbol(symbol)
      );
      const newsResults = await Promise.all(newsPromises);
      
      structuredContent = {
        news: newsResults.flat(),
        symbols,
      };
      break;
  }

  return {
    content: [
      {
        type: "resource",
        resource: {
          uri: widget.templateUri,
          mimeType: "text/html",
          text: widget.html || loadWidgetHtml(widget.id),
        },
      },
      {
        type: "text",
        text: JSON.stringify(structuredContent),
      },
    ],
    _meta: widgetDescriptorMeta(widget),
  };
});

// Register resources
mcpServer.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: widgets.map(
      (w): Resource => ({
        uri: w.templateUri,
        name: w.title,
        mimeType: "text/html",
        description: `Widget HTML for ${w.title}`,
      })
    ),
  };
});

mcpServer.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const widget = widgets.find((w) => w.templateUri === request.params.uri);
  if (!widget) {
    throw new Error(`Unknown resource: ${request.params.uri}`);
  }

  return {
    contents: [
      {
        uri: widget.templateUri,
        mimeType: "text/html",
        text: widget.html || loadWidgetHtml(widget.id),
      },
    ],
  };
});

// HTTP server setup
const port = Number(process.env.PORT ?? 8000);
const ssePath = "/mcp";
const postPath = "/mcp/messages";

const transports = new Map<string, SSEServerTransport>();

async function handleSseRequest(res: ServerResponse) {
  const sessionId = Math.random().toString(36).substring(7);
  const transport = new SSEServerTransport(ssePath, res);
  transports.set(sessionId, transport);

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  res.write(`data: ${JSON.stringify({ sessionId })}\n\n`);

  await mcpServer.connect(transport);

  res.on("close", () => {
    transports.delete(sessionId);
  });
}

async function handlePostMessage(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
) {
  const sessionId = url.searchParams.get("sessionId");
  if (!sessionId) {
    res.writeHead(400).end("Missing sessionId");
    return;
  }

  const transport = transports.get(sessionId);
  if (!transport) {
    res.writeHead(404).end("Session not found");
    return;
  }

  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify({ ok: true }));

  await transport.handlePostMessage(JSON.parse(body));
}

const httpServer = createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (
      req.method === "OPTIONS" &&
      (url.pathname === ssePath || url.pathname === postPath)
    ) {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "content-type",
      });
      res.end();
      return;
    }

    if (req.method === "GET" && url.pathname === ssePath) {
      await handleSseRequest(res);
      return;
    }

    if (req.method === "POST" && url.pathname === postPath) {
      await handlePostMessage(req, res, url);
      return;
    }

    res.writeHead(404).end("Not Found");
  }
);

httpServer.on("clientError", (err: Error, socket) => {
  console.error("HTTP client error", err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

httpServer.listen(port, () => {
  console.log(`Banking MCP server listening on http://localhost:${port}`);
  console.log(`  SSE stream: GET http://localhost:${port}${ssePath}`);
  console.log(`  Message post endpoint: POST http://localhost:${port}${postPath}`);
});


/*
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { URL } from "node:url";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListResourceTemplatesRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
  type CallToolRequest,
  type ListResourceTemplatesRequest,
  type ListResourcesRequest,
  type ListToolsRequest,
  type ReadResourceRequest,
  type Resource,
  type ResourceTemplate,
  type Tool
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

type PizzazWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  html: string;
  responseText: string;
};

function widgetMeta(widget: PizzazWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": true,
    "openai/resultCanProduceWidget": true
  } as const;
}

const widgets: PizzazWidget[] = [
  {
    id: "pizza-map",
    title: "Show Pizza Map",
    templateUri: "ui://widget/pizza-map.html",
    invoking: "Hand-tossing a map",
    invoked: "Served a fresh map",
    html: `
<div id="pizzaz-root"></div>
<link rel="stylesheet" href="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-0038.css">
<script type="module" src="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-0038.js"></script>
    `.trim(),
    responseText: "Rendered a pizza map!"
  },
  {
    id: "pizza-carousel",
    title: "Show Pizza Carousel",
    templateUri: "ui://widget/pizza-carousel.html",
    invoking: "Carousel some spots",
    invoked: "Served a fresh carousel",
    html: `
<div id="pizzaz-carousel-root"></div>
<link rel="stylesheet" href="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-carousel-0038.css">
<script type="module" src="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-carousel-0038.js"></script>
    `.trim(),
    responseText: "Rendered a pizza carousel!"
  },
  {
    id: "pizza-albums",
    title: "Show Pizza Album",
    templateUri: "ui://widget/pizza-albums.html",
    invoking: "Hand-tossing an album",
    invoked: "Served a fresh album",
    html: `
<div id="pizzaz-albums-root"></div>
<link rel="stylesheet" href="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-albums-0038.css">
<script type="module" src="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-albums-0038.js"></script>
    `.trim(),
    responseText: "Rendered a pizza album!"
  },
  {
    id: "pizza-list",
    title: "Show Pizza List",
    templateUri: "ui://widget/pizza-list.html",
    invoking: "Hand-tossing a list",
    invoked: "Served a fresh list",
    html: `
<div id="pizzaz-list-root"></div>
<link rel="stylesheet" href="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-list-0038.css">
<script type="module" src="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-list-0038.js"></script>
    `.trim(),
    responseText: "Rendered a pizza list!"
  },
  {
    id: "pizza-video",
    title: "Show Pizza Video",
    templateUri: "ui://widget/pizza-video.html",
    invoking: "Hand-tossing a video",
    invoked: "Served a fresh video",
    html: `
<div id="pizzaz-video-root"></div>
<link rel="stylesheet" href="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-video-0038.css">
<script type="module" src="https://persistent.oaistatic.com/ecosystem-built-assets/pizzaz-video-0038.js"></script>
    `.trim(),
    responseText: "Rendered a pizza video!"
  },

  {
    id: "pizza-inline-test",
    title: "Inline UI test",
    templateUri: "ui://widget/pizza-inline.html",
    invoking: "Loading inline UI…",
    invoked: "Inline UI ready!",
    html: `
  <!doctype html>
  <html><body style="font:16px system-ui;padding:16px">
    <h1>🍕 Hello from inline UI</h1>
    <p>If you can see this, rendering works. Assets are the problem.</p>
  </body></html>
    `.trim(),
    responseText: "inline ok"
  },
];

const widgetsById = new Map<string, PizzazWidget>();
const widgetsByUri = new Map<string, PizzazWidget>();

widgets.forEach((widget) => {
  widgetsById.set(widget.id, widget);
  widgetsByUri.set(widget.templateUri, widget);
});

const toolInputSchema = {
  type: "object",
  properties: {
    pizzaTopping: {
      type: "string",
      description: "Topping to mention when rendering the widget."
    }
  },
  required: ["pizzaTopping"],
  additionalProperties: false
} as const;

const toolInputParser = z.object({
  pizzaTopping: z.string()
});

const tools: Tool[] = widgets.map((widget) => ({
  name: widget.id,
  description: widget.title,
  inputSchema: toolInputSchema,
  title: widget.title,
  _meta: widgetMeta(widget)
}));

const resources: Resource[] = widgets.map((widget) => ({
  uri: widget.templateUri,
  name: widget.title,
  description: `${widget.title} widget markup`,
  mimeType: "text/html+skybridge",
  _meta: widgetMeta(widget)
}));

const resourceTemplates: ResourceTemplate[] = widgets.map((widget) => ({
  uriTemplate: widget.templateUri,
  name: widget.title,
  description: `${widget.title} widget markup`,
  mimeType: "text/html+skybridge",
  _meta: widgetMeta(widget)
}));

function createPizzazServer(): Server {
  const server = new Server(
    {
      name: "pizzaz-node",
      version: "0.1.0"
    },
    {
      capabilities: {
        resources: {},
        tools: {}
      }
    }
  );

  server.setRequestHandler(ListResourcesRequestSchema, async (_request: ListResourcesRequest) => ({
    resources
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (request: ReadResourceRequest) => {
    const widget = widgetsByUri.get(request.params.uri);

    if (!widget) {
      throw new Error(`Unknown resource: ${request.params.uri}`);
    }

    return {
      contents: [
        {
          uri: widget.templateUri,
          mimeType: "text/html+skybridge",
          text: widget.html,
          _meta: widgetMeta(widget)
        }
      ]
    };
  });

  server.setRequestHandler(ListResourceTemplatesRequestSchema, async (_request: ListResourceTemplatesRequest) => ({
    resourceTemplates
  }));

  server.setRequestHandler(ListToolsRequestSchema, async (_request: ListToolsRequest) => ({
    tools
  }));

  server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
    const widget = widgetsById.get(request.params.name);

    if (!widget) {
      throw new Error(`Unknown tool: ${request.params.name}`);
    }

    const args = toolInputParser.parse(request.params.arguments ?? {});

    return {
      content: [
        {
          type: "text",
          text: widget.responseText
        }
      ],
      structuredContent: {
        pizzaTopping: args.pizzaTopping
      },
      _meta: widgetMeta(widget)
    };
  });

  return server;
}

type SessionRecord = {
  server: Server;
  transport: SSEServerTransport;
};

const sessions = new Map<string, SessionRecord>();

const ssePath = "/mcp";
const postPath = "/mcp/messages";

async function handleSseRequest(res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const server = createPizzazServer();
  const transport = new SSEServerTransport(postPath, res);
  const sessionId = transport.sessionId;

  sessions.set(sessionId, { server, transport });

  transport.onclose = async () => {
    sessions.delete(sessionId);
    await server.close();
  };

  transport.onerror = (error) => {
    console.error("SSE transport error", error);
  };

  try {
    await server.connect(transport);
  } catch (error) {
    sessions.delete(sessionId);
    console.error("Failed to start SSE session", error);
    if (!res.headersSent) {
      res.writeHead(500).end("Failed to establish SSE connection");
    }
  }
}

async function handlePostMessage(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  const sessionId = url.searchParams.get("sessionId");

  if (!sessionId) {
    res.writeHead(400).end("Missing sessionId query parameter");
    return;
  }

  const session = sessions.get(sessionId);

  if (!session) {
    res.writeHead(404).end("Unknown session");
    return;
  }

  try {
    await session.transport.handlePostMessage(req, res);
  } catch (error) {
    console.error("Failed to process message", error);
    if (!res.headersSent) {
      res.writeHead(500).end("Failed to process message");
    }
  }
}

const portEnv = Number(process.env.PORT ?? 8000);
const port = Number.isFinite(portEnv) ? portEnv : 8000;

const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS" && (url.pathname === ssePath || url.pathname === postPath)) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type"
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === ssePath) {
    await handleSseRequest(res);
    return;
  }

  if (req.method === "POST" && url.pathname === postPath) {
    await handlePostMessage(req, res, url);
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.on("clientError", (err: Error, socket) => {
  console.error("HTTP client error", err);
  socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
});

httpServer.listen(port, () => {
  console.log(`Pizzaz MCP server listening on http://localhost:${port}`);
  console.log(`  SSE stream: GET http://localhost:${port}${ssePath}`);
  console.log(`  Message post endpoint: POST http://localhost:${port}${postPath}?sessionId=...`);
});*/