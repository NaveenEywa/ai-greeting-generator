import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.post('/api/generate', async (req, res) => {
    const { name, occasion, tone } = req.body || {}
    if (!name || !occasion) return res.status(400).json({ error: 'name and occasion are required' })

    const prompt = `Write a ${tone || 'warm'} greeting for ${name} for their ${occasion}. Keep it short (1-3 sentences).`;
    const apiKey = process.env.CLAUDE_API_KEY

    if (!apiKey) {
        // fallback mock response for demos
        const mock = `Happy ${occasion}, ${name}! Wishing you a wonderful day filled with joy and laughter.`
        return res.json({ text: mock, model: 'mock' })
    }

    try {
        // Proxy request to Anthropic Claude (example). Confirm current Anthropic API before production use.
        const response = await fetch('https://api.anthropic.com/v1/complete', {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-2.1',
                prompt: `Human: ${prompt}\nAssistant:`,
                max_tokens_to_sample: 300,
            }),
        })

        if (!response.ok) {
            const text = await response.text()
            return res.status(response.status).json({ error: text })
        }

        const data = await response.json()
        // Anthropic responses commonly return `completion` or `completion?.output` — adapt as needed.
        const text = data.completion || data.output || JSON.stringify(data)
        return res.json({ text, model: 'claude' })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'server error' })
    }
})

app.get('/health', (req, res) => res.send('ok'))

// Serve client in production
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'dist')))
    app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')))
}

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
