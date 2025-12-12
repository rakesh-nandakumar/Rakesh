import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Default AI system prompt data (can be migrated to Supabase later)
const aiPromptData = {
  systemPrompt: {
    role: "You are a professional AI assistant representing Rakesh Nandakumar, a Full Stack Developer. You help visitors learn about his skills, experience, and services.",
    guidelines: [
      "Be professional, friendly, and helpful",
      "Provide accurate information about Rakesh's skills and experience",
      "Encourage visitors to use the contact form for business inquiries",
      "Keep responses concise and informative",
      "If asked about topics outside Rakesh's professional scope, politely redirect"
    ],
    personality: "professional yet approachable",
    responseFormat: "Keep responses clear, concise, and helpful",
    contactInfo: {
      businessInquiries: "For business inquiries, please use the contact form on the website"
    }
  },
  professionalProfile: {
    name: "Rakesh Nandakumar",
    title: "Full Stack Developer & Software Engineer",
    experience: "3+ years of hands-on experience",
    location: "Available for remote work globally",
    summary: "Passionate full-stack developer with expertise in modern web technologies, cloud architecture, and scalable solutions."
  },
  technicalSkills: {
    frontendTechnologies: ["React", "Next.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    backendTechnologies: ["Node.js", "Laravel", "Python", "Express.js", "REST APIs"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
    cloudAndDevOps: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Vercel"],
    mobileAndOther: ["React Native", "Flutter", "Git", "Agile methodologies"]
  },
  keyProjects: [
    {
      name: "Portfolio Website",
      description: "Modern, SEO-optimized portfolio built with Next.js and Supabase",
      technologies: ["Next.js", "Supabase", "Tailwind CSS"],
      highlights: ["Server-side rendering", "Dynamic content management", "AI-powered chat"]
    }
  ],
  professionalExperience: {
    currentRole: "Software Engineer at Procons Infotech",
    experienceHighlights: ["Full-stack development", "Cloud architecture", "Team collaboration"],
    industryExperience: ["Technology", "E-commerce", "SaaS"]
  },
  achievements: [
    "Successfully delivered multiple enterprise-grade applications",
    "Expertise in building scalable and maintainable codebases",
    "Strong problem-solving and communication skills"
  ],
  availabilityAndServices: {
    services: [
      "Full Stack Web Development",
      "API Design and Development",
      "Cloud Architecture Consulting",
      "Technical Consulting",
      "Code Review and Optimization"
    ]
  }
};

// Initialize the Google Generative AI client
let genAI;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
} else {
  console.error("GEMINI_API_KEY is not configured in environment variables");
}

// Rate limiting map (in production, use Redis or a proper rate limiting service)
const rateLimitMap = new Map();

// Generate system prompt from JSON data
function generateSystemPrompt() {
  const {
    systemPrompt,
    professionalProfile,
    technicalSkills,
    keyProjects,
    professionalExperience,
    achievements,
    availabilityAndServices,
  } = aiPromptData;

  return `${systemPrompt.role}

PERSONALITY & GUIDELINES:
${systemPrompt.guidelines.map((guideline) => `- ${guideline}`).join("\n")}

PROFESSIONAL PROFILE:
- Name: ${professionalProfile.name}
- Title: ${professionalProfile.title}
- Experience: ${professionalProfile.experience}
- Location: ${professionalProfile.location}
- Summary: ${professionalProfile.summary}

TECHNICAL SKILLS:
Frontend: ${technicalSkills.frontendTechnologies.join(", ")}
Backend: ${technicalSkills.backendTechnologies.join(", ")}
Databases: ${technicalSkills.databases.join(", ")}
Cloud & DevOps: ${technicalSkills.cloudAndDevOps.join(", ")}
Mobile & Other: ${technicalSkills.mobileAndOther.join(", ")}

KEY PROJECTS:
${keyProjects
  .map(
    (project) =>
      `- ${project.name}: ${
        project.description
      }\n  Technologies: ${project.technologies.join(
        ", "
      )}\n  Highlights: ${project.highlights.join(", ")}`
  )
  .join("\n")}

PROFESSIONAL EXPERIENCE:
- Current Role: ${professionalExperience.currentRole}
- Experience Highlights: ${professionalExperience.experienceHighlights.join(
    ", "
  )}
- Industry Experience: ${professionalExperience.industryExperience.join(", ")}

KEY ACHIEVEMENTS:
${achievements.map((achievement) => `- ${achievement}`).join("\n")}

SERVICES AVAILABLE:
${availabilityAndServices.services.map((service) => `- ${service}`).join("\n")}

RESPONSE GUIDELINES:
- ${systemPrompt.responseFormat}
- Use a ${systemPrompt.personality} tone
- ${systemPrompt.contactInfo.businessInquiries}

Remember to be professional, helpful, and encourage visitors to contact Rakesh for business opportunities through the contact form.`;
}

// Rate limiting function
function checkRateLimit(identifier) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 10; // Max 10 requests per minute

  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const limit = rateLimitMap.get(identifier);

  if (now > limit.resetTime) {
    // Reset the window
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (limit.count >= maxRequests) {
    return false;
  }

  limit.count++;
  return true;
}

// Input sanitization
function sanitizeInput(input) {
  if (typeof input !== "string") return "";

  // Remove potential harmful patterns
  const sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();

  return sanitized.slice(0, 1000); // Limit input length
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    // Check if API key is available
    if (!GEMINI_API_KEY || !genAI) {
      console.error(
        "GEMINI_API_KEY is not configured or GoogleGenerativeAI client not initialized"
      );
      console.error("GEMINI_API_KEY exists:", !!GEMINI_API_KEY);
      console.error("genAI exists:", !!genAI);
      return NextResponse.json(
        { error: "AI service is not configured. Please restart the server." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { message, conversationHistory = [] } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Sanitize user input
    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedMessage) {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    // Build conversation history
    const history = [];

    // Add conversation history (last 10 messages to maintain context)
    const recentHistory = conversationHistory.slice(-10);
    recentHistory.forEach((msg) => {
      history.push({
        role: msg.isBot ? "model" : "user",
        parts: [{ text: sanitizeInput(msg.text) }],
      });
    });

    // Start a chat session with history
    const chat = model.startChat({
      history: history,
      systemInstruction: generateSystemPrompt(),
    });

    // Send the message and get response
    const result = await chat.sendMessage(sanitizedMessage);
    const response = await result.response;

    // Handle blocked content
    if (
      response.candidates &&
      response.candidates[0]?.finishReason === "SAFETY"
    ) {
      return NextResponse.json({
        response:
          "I apologize, but I can't respond to that type of message. Please feel free to ask me about Rakesh's professional background, skills, or projects instead!",
      });
    }

    const botResponse = response.text();

    // Additional response validation
    if (!botResponse || botResponse.trim().length === 0) {
      throw new Error("Empty response from AI");
    }

    return NextResponse.json({
      response: botResponse.trim(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack?.split("\n")[0],
    });

    // Provide user-friendly error messages
    let errorMessage =
      "I'm having trouble responding right now. Please try again in a moment.";

    if (error.message.includes("fetch")) {
      errorMessage =
        "I'm having connectivity issues. Please check your internet connection and try again.";
    } else if (error.message.includes("timeout")) {
      errorMessage =
        "The request timed out. Please try asking a shorter question.";
    } else if (
      error.message.includes("API_KEY") ||
      error.message.includes("API key")
    ) {
      errorMessage =
        "AI service configuration error. Please contact the administrator.";
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
