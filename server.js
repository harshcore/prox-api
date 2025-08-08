require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();
const PORT = process.env.PORT || 8080;
const { v4: uuidv4 } = require("uuid");

const dummyData = require("./dummy_data.json");
const { transformContent, scrapSources } = require("./helper");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const STYLE = "Concise";
// PROD | STG | DEV
const FROM = "DEV";
const PROD_GENERATE_API = "https://photon-api.thesynapses.com/generate";
const STG_GENERATE_API = "https://photon-api.thesynapses.com/generate";
const DEV_GENERATE_API = "https://pa-dev-api.thesynapses.com/spark/generate";
const DEV_SUMMERISE_TITLE_API =
  "https://pa-dev-api.thesynapses.com/spark/generate_chat_title";
const ORG = "synapse";

// Middleware to add request ID to every request
app.use((req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader("X-Request-ID", req.requestId);
  next();
});

console.log(`[Server] Running in ${FROM} mode`);

async function useGenerateFrom(req) {
  const requestId = req.requestId;
  const { deep_research, ...restBody } = req.body;
  const styleToUse = deep_research === true ? "Standard" : STYLE;

  if (FROM === "PROD") {
    const targetUrl = PROD_GENERATE_API;
    console.log(`[Generate][${requestId}] Using PROD API`);

    return axios({
      method: "post",
      url: targetUrl,
      data: {
        ...restBody,
        type: "global",
        file_url: [],
        org_id: "synapse",
        uid: "oB3qkWuOcTVh21NGWHudqFrxxmt1",
        regenerate: false,
        style: styleToUse,
        recaching: false,
        cache_id: null,
        file_data: "",
        prompt_id: "41818501-5e4b-4dfe-8474-95e723437c22",
        new_prompt: "",
        by: "oB3qkWuOcTVh21NGWHudqFrxxmt1",
      },
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": requestId,
      },
      responseType: "stream",
    });
  } else if (FROM === "STG") {
    const targetUrl = STG_GENERATE_API;
    console.log(`[Generate][${requestId}] Using STG API`);

    return axios({
      method: "post",
      url: targetUrl,
      data: {
        ...restBody,
        type: "global",
        file_url: [],
        org_id: ORG,
        uid: "xePSzT4DmZQ8G9UkUyeGtF5GEyP2",
        regenerate: false,
        style: styleToUse,
        recaching: false,
        cache_id: null,
        file_data: "",
        prompt_id: "e5bd012b-b55a-4364-ae8b-50188234214a",
        new_prompt: "",
        by: "xePSzT4DmZQ8G9UkUyeGtF5GEyP2",
        session_id: "xePSzT4DmZQ8G9UkUyeGtF5GEyP2",
      },
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": requestId,
      },
      responseType: "stream",
    });
  } else {
    const targetUrl = DEV_GENERATE_API;
    console.log(`[Generate][${requestId}] Using DEV API`);

    return axios({
      method: "post",
      url: targetUrl,
      data: {
        ...restBody,

        type: "global",
        file_url: [],
        org_id: ORG,
        uid: "uiFZuraB8bSmIBMpUH8rg8bQguB3",
        regenerate: false,
        style: styleToUse,
        recaching: true,
        cache_id: null,
        file_data: "",
        prompt_id: "8225ec42-b917-4527-b287-6dbaef35bdd7",
        new_prompt: "",
        by: "uiFZuraB8bSmIBMpUH8rg8bQguB3",
        session_id: "cool",
      },
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": requestId,
      },
      responseType: "stream",
    });
  }
}

function useModelsFrom() {
  if (FROM === "PROD")
    return {
      models: [
        {
          id: "claude-opus-4@20250514",
          name: "Noney 1.0 Twinkle",
          google_search: false,
          active: "True",
          from: "NONEY",
          description: "High-end and smart.",
        },
        {
          id: "gemini-2.5-pro-preview-05-06",
          name: "Noney 1.0 Pro",
          google_search: true,
          active: "True",
          from: "NONEY",
          description: "Advanced and powerful.",
        },
        {
          id: "gemini-2.5-flash-preview-05-20",
          name: "Gemini 2.5 Flash",
          google_search: true,
          active: "True",
          from: "GEMINI",
          description: "Fast, smart, and web-ready.",
        },
        {
          id: "claude-sonnet-4@20250514",
          name: "Claude Sonnet 4",
          google_search: false,
          active: "True",
          from: "CLAUDE",
          description: "Smooth and balanced.",
        },
      ],
      default_model: {
        id: "claude-opus-4@20250514",
        name: "Noney 1.0 Twinkle",
        google_search: false,
        active: "True",
        from: "NONEY",
        description: "High-end and smart.",
      },
    };
  else
    return {
      models: [
        {
          id: "claude-opus-4@20250514",
          name: "Noney 1.0 Twinkle",
          google_search: false,
          active: "True",
          from: "NONEY",
          description: "High-end and smart.",
        },
        {
          id: "gemini-2.5-pro-preview-05-06",
          name: "Noney 1.0 Pro",
          google_search: true,
          active: "True",
          from: "NONEY",
          description: "Advanced and powerful.",
        },
        {
          id: "gemini-2.5-flash-preview-05-20",
          name: "Gemini 2.5 Flash",
          google_search: true,
          active: "True",
          from: "GEMINI",
          description: "Fast, smart, and web-ready.",
        },
        {
          id: "claude-sonnet-4@20250514",
          name: "Claude Sonnet 4",
          google_search: false,
          active: "True",
          from: "CLAUDE",
          description: "Smooth and balanced.",
        },
      ],
      default_model: {
        id: "claude-opus-4@20250514",
        name: "Noney 1.0 Twinkle",
        google_search: false,
        active: "True",
        from: "NONEY",
        description: "High-end and smart.",
      },
    };
}

app.get("/get_models", (req, res) => {
  console.log(`[API][${req.requestId}] GET /get_models`);
  res.json(useModelsFrom());
});

app.post("/summarise_title", async (req, res) => {
  const requestId = req.requestId;
  console.log(`[API][${requestId}] POST /summarise_title`);
  const { prompt } = req.body;
  if (!prompt) {
    console.log(`[Error][${requestId}] Missing prompt in request`);
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      DEV_SUMMERISE_TITLE_API,
      {
        prompt: prompt,
        prompt_id: "556b448c-17b5-4259-be54-b1955e180a53",
        org_id: ORG,
        chat_id: "330faa6c-f844-4e92-b29c-b72dfcc27cfa",
        user_id: "TSgg30aONkh9v5vAQwfIARODGkj1",
      },
      {
        headers: {
          "X-Request-ID": requestId,
        },
      }
    );
    console.log(`[Success][${requestId}] Title summarized`);
    res.json({
      summarized_title: response.data?.generated_title || "",
    });
  } catch (error) {
    console.log(
      `[Error][${requestId}] Failed to summarize title: ${error.message}`
    );
    res.status(500).json({ error: "Failed to summarize title" });
  }
});

app.post("/generate", async (req, res) => {
  const proxy_data = {
    source: [],
  };
  const requestId = req.requestId;

  console.log(`[API][${requestId}] POST /generate`);
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write(
      `event: step\ndata: ${JSON.stringify({
        id: uuidv4(),
        data: [
          {
            type: "connecting",
            title: "Please Wait",
            description:
              "Search for the latest news on the Iran-Israel conflict",
          },
        ],
      })}\n\n`
    );

    const id = uuidv4();

    const response = await useGenerateFrom(req);
    if (!response) {
      console.log(`[Error][${requestId}] No response from generate function`);
      res.status(500).json({ error: "Configuration error" });
      return;
    }

    console.log(`[Stream][${requestId}] Starting data stream`);
    response.data.on("data", (chunk) => {
      const content = transformContent(proxy_data, chunk.toString());
      if (content.cleanedText) {
        const data = {
          index: 0,
          id: id,
          data: content.cleanedText,
        };
        res.write(`event: text\ndata: ${JSON.stringify(data)}\n\n`);
      }
      if (content?.steps?.length) {
        res.write(
          `event: step\ndata: ${JSON.stringify({
            id: uuidv4(),
            data: content?.steps,
          })}\n\n`
        );
      }
    });

    response.data.on("end", async () => {
      if (proxy_data.source.length) {
        res.write(
          `event: step\ndata: ${JSON.stringify({
            id: uuidv4(),
            data: [
              {
                type: "fetch_source_information",
                title: "Gathering Details",
              },
            ],
          })}\n\n`
        );
        const source = await scrapSources(proxy_data.source);
        res.write(
          `event: source\ndata: ${JSON.stringify({
            id: uuidv4(),
            data: source,
          })}\n\n`
        );
      }

      console.log(`[Stream][${requestId}] Completed successfully`);
      res.write(
        `event: step\ndata: ${JSON.stringify({
          id: uuidv4(),
          data: [
            {
              type: "finished",
              title: "Finished",
            },
          ],
        })}\n\n`
      );
      res.write("event: end\ndata: [DONE]\n\n");
      res.end();
    });

    response.data.on("error", (err) => {
      console.log(`[Error][${requestId}] Stream error: ${err.message}`);
      res.write(
        `event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`
      );
      res.end();
    });
  } catch (error) {
    console.log(`[Error][${requestId}] Generate failed: ${error.message}`);
    res.status(500).json({ error: "Failed to proxy /generate" });
  }
});

app.post("/generate_v2", async (req, res) => {
  const requestId = req.requestId;
  console.log(`[API][${requestId}] POST /generate_v2`);
  try {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const randomIndex = Math.floor(Math.random() * dummyData.length);
    const data_to_stream = dummyData[randomIndex];
    console.log(`[Mock][${requestId}] Using dummy data index: ${randomIndex}`);

    let index = 0;
    for (let i = 0; i < data_to_stream.length; i++) {
      const item = data_to_stream[i];
      const id = uuidv4();

      if (item.type === "text") {
        const fullText = item.data;
        let pointer = 0;

        while (pointer < fullText.length) {
          const chunkSize = Math.floor(Math.random() * (50 - 20 + 1)) + 20; // random size between 5 and 20
          const textChunk = fullText.slice(pointer, pointer + chunkSize);
          pointer += chunkSize;
          const chunkData = {
            index: index,
            id: id,
            data: textChunk,
          };

          res.write(`event: text\ndata: ${JSON.stringify(chunkData)}\n\n`);

          const delay = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      } else if (item.type === "step" || item.type === "source") {
        const data = {
          id: id,
          data: item.data,
        };

        res.write(`event: ${item.type}\ndata: ${JSON.stringify(data)}\n\n`);

        const delay = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        const data = {
          index: index,
          id: id,
          data: item.data,
        };

        res.write(`event: ${item.type}\ndata: ${JSON.stringify(data)}\n\n`);

        const delay = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      if (item.type !== "step" && item.type !== "source") {
        index++;
      }
    }

    console.log(`[Mock][${requestId}] Stream completed`);
    res.end();
  } catch (error) {
    console.log(`[Error][${requestId}] Generate v2 failed: ${error.message}`);
    res.status(500).json({ error: "Failed" });
  }
});

app.get("/health", (req, res) => {
  console.log(`[API][${req.requestId}] GET /health`);
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});

