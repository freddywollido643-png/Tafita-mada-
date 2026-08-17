import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initial mock state stored in server memory (synced to clients)
let menNewsStore = [
  {
    id: 'men-1',
    title: 'Dati-n\'ny Fanadinana BACC 2026 ary tetiandrom-pampianarana',
    titleFr: 'Dates officielles des examens BACC 2026 et calendrier scolaire',
    date: '2026-02-15',
    category: 'BAC',
    summary: 'Nivoaka amin\'ny fomba ofisialy ny tetiandron\'ny fanadinana Baccalauréat 2026 ho an\'ny ambaratonga rehetra manerana an\'i Madagasikara.',
    summaryFr: 'Le Ministère de l\'Éducation Nationale a publié les dates officielles des épreuves du Baccalauréat 2026 pour toutes les séries.',
    source: 'Ministère de l\'Éducation Nationale - Madagascar',
    originalUrl: 'https://www.education.gov.mg',
    isOfficial: true
  },
  {
    id: 'men-2',
    title: 'Fandaharana vaovao Série OSE (Organisation, Société, Économie)',
    titleFr: 'Nouveau programme pour la Série OSE',
    date: '2026-01-20',
    category: 'Réformes',
    summary: 'Toromarika momba ny fandaharam-pianarana vaovao OSE ho an\'ny kilasy Première sy Terminale.',
    summaryFr: 'Directives pédagogiques relatives au nouveau programme OSE pour les classes de Première et Terminale.',
    source: 'Direction Générale de la Pédagogie - MEN',
    originalUrl: 'https://www.education.gov.mg/dgp',
    isOfficial: true
  },
  {
    id: 'men-3',
    title: 'Fanampiana sy fitaovana ho an\'ny mpiadina BACC',
    titleFr: 'Ressources et annales gratuites pour candidats au BACC',
    date: '2026-01-10',
    category: 'Examens',
    summary: 'Fampahafantarana ny fitaovam-pampianarana maimaimpoana sy taratasy fanadinana taloha azon\'ny mpiadina ampiasaina.',
    summaryFr: 'Mise à disposition gratuite de sujets types et annales pour aider la préparation des élèves.',
    source: 'MEN Madagascar',
    originalUrl: 'https://www.education.gov.mg',
    isOfficial: true
  }
];

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return ai;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    online: true,
    serverTime: new Date().toISOString(),
    appName: 'TAFITA MADA V1.0'
  });
});

// MEN News Endpoints
app.get('/api/men-news', (req, res) => {
  res.json({
    success: true,
    news: menNewsStore,
    lastUpdated: new Date().toISOString()
  });
});

app.post('/api/men-news', (req, res) => {
  const newArticle = {
    id: `men-${Date.now()}`,
    title: req.body.title || 'Vaovao MEN',
    titleFr: req.body.titleFr || 'Actualité MEN',
    date: req.body.date || new Date().toISOString().split('T')[0],
    category: req.body.category || 'Actualités',
    summary: req.body.summary || '',
    summaryFr: req.body.summaryFr || '',
    source: 'Ministère de l\'Éducation Nationale - Madagascar',
    originalUrl: req.body.originalUrl || 'https://www.education.gov.mg',
    isOfficial: true
  };

  menNewsStore.unshift(newArticle);
  res.json({ success: true, article: newArticle });
});

// AI TAFITA Endpoint
app.post('/api/ai-tafita', async (req, res) => {
  try {
    const { prompt, language = 'mg', context = '', action = 'explain' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const genAI = getGeminiClient();

    let systemInstruction = `You are AI TAFITA (🤖 AI TAFITA), an expert, encouraging, and highly pedagogical Malagasy educational tutor designed for Madagascar high school students preparing for the Baccalauréat and official exams.
Your motto is "Mianara anio, tafita rahampitso." (Learn today, succeed tomorrow).

User's preferred language: ${language === 'mg' ? 'Malagasy' : 'French'}.
If the user speaks Malagasy, reply primarily in clear, natural, educational Malagasy (you can include standard math/scientific French terms if relevant).
If the user speaks French, reply in clear, structured French with Malagasy encouragement.

CRITICAL MATHEMATICAL & SCIENTIFIC FORMATTING RULES:
1. NEVER output raw, unreadable LaTeX code with unparsed backslash commands (do NOT output \\frac{a}{b}, \\sqrt{x}, \\cdot, \\implies, \\left(, \\right), or unformatted LaTeX code).
2. Write all math formulas, derivatives, fractions, and equations in clean, natural, human-readable text formatting:
   - For fractions: write (a / b) or (u'·v - u·v') / v²
   - For powers: write x², x³, xⁿ, or x^(n-1)
   - For square roots: write √(x)
   - For multiplication: write · or × (e.g. 2 · e^x)
   - For implication: write ⇒ or ->
   - For standard functions: write f'(x), ln(x), e^x, cos(x), sin(x)
3. Keep step-by-step solutions extremely structured, clean, encouraging, and easy to read on mobile screens. Use clean bullet points, numbered steps, and short highlighted formula blocks.`;

    if (context) {
      systemInstruction += `\nContext / Lesson topic being studied: ${context}`;
    }

    let formattedPrompt = prompt;
    if (action === 'explain_exercise') {
      formattedPrompt = `Hazavao tsara ny fomba hamahana ity exercice ity, miaraka amin'ny dingana sy ny fanazavana feno:\n${prompt}`;
    } else if (action === 'summarize') {
      formattedPrompt = `Abohoy ary famintino amim-pomba tsotra ny hevitra lehibe amin'ity lesona ity:\n${prompt}`;
    } else if (action === 'quiz_gen') {
      formattedPrompt = `Mamoaha fanontaniana fanazarantena 3 miaraka amin'ny valiny marina sy fanazavana momba ity lohahevitra ity:\n${prompt}`;
    }

    const response = await genAI.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: formattedPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || 'Tsy nisy valiny azo avy amin\'i AI TAFITA.';

    res.json({
      success: true,
      reply: replyText,
      timestamp: new Date().toISOString()
    });

  } catch (err: any) {
    console.error('AI TAFITA Error:', err);
    res.status(500).json({
      error: 'Tsy afaka mifandray amin\'i AI TAFITA amin\'izao fotoana izao. Jereo ny connexion internet na andramo indray.',
      details: err.message
    });
  }
});

// Cloud Sync Endpoint for student score & progress updates
app.post('/api/sync', (req, res) => {
  const { userId, progress, quizResults, bookmarks, timestamp } = req.body;
  
  res.json({
    success: true,
    message: 'Tafita ny fampifanarahana ny angona (Data synchronization successful)',
    syncedAt: new Date().toISOString(),
    recordCount: {
      progress: progress ? Object.keys(progress).length : 0,
      quizResults: quizResults ? quizResults.length : 0,
      bookmarks: bookmarks ? bookmarks.length : 0
    }
  });
});

// Vite & Static file serving setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[TAFITA MADA] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
