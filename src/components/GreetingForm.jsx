import React, { useEffect, useState } from 'react'

function useLocalHistory(key, initial = []) {
    const [state, setState] = useState(() => {
        try {
            const raw = localStorage.getItem(key)
            return raw ? JSON.parse(raw) : initial
        } catch {
            return initial
        }
    })
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state))
        } catch { }
    }, [key, state])
    return [state, setState]
}

export default function GreetingForm() {
    const [name, setName] = useState('')
    const [occasion, setOccasion] = useState('birthday')
    const [tone, setTone] = useState('warm')
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useLocalHistory('greeting-history', [])

    async function handleGenerate(e) {
        e.preventDefault()
        setLoading(true)
        setResult('')
        try {
            const resp = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, occasion, tone }),
            })
            const data = await resp.json()
            if (!resp.ok) throw new Error(data.error || 'API error')
            setResult(data.text)
            setHistory([{ name, occasion, tone, text: data.text, ts: Date.now() }, ...history].slice(0, 10))
        } catch (err) {
            setResult('Error generating greeting — check server logs and your API key.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    function handleCopy() {
        if (!result) return
        navigator.clipboard?.writeText(result)
    }

    return (
        <div>
            <form onSubmit={handleGenerate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input className="border rounded p-2" placeholder="Recipient name" value={name} onChange={e => setName(e.target.value)} required />
                    <select className="border rounded p-2" value={occasion} onChange={e => setOccasion(e.target.value)}>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="congrats">Congratulations</option>
                        <option value="farewell">Farewell</option>
                        <option value="custom">Other</option>
                    </select>
                    <select className="border rounded p-2" value={tone} onChange={e => setTone(e.target.value)}>
                        <option value="warm">Warm</option>
                        <option value="funny">Funny</option>
                        <option value="formal">Formal</option>
                        <option value="short">Short</option>
                    </select>
                </div>

                <div className="flex gap-3">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
                        {loading ? 'Generating…' : 'Generate'}
                    </button>
                    <button type="button" onClick={() => { setName(''); setOccasion('birthday'); setTone('warm'); setResult('') }} className="px-4 py-2 border rounded">Reset</button>
                    <button type="button" onClick={handleCopy} disabled={!result} className="px-3 py-2 border rounded">Copy</button>
                </div>
            </form>

            <div className="mt-6">
                <h3 className="font-semibold">Result</h3>
                <div className="mt-2 p-4 bg-gray-50 rounded border min-h-[64px]">
                    {result ? <pre className="whitespace-pre-wrap">{result}</pre> : <span className="text-sm text-gray-400">No greeting yet — generate one.</span>}
                </div>
            </div>

            <div className="mt-6">
                <h3 className="font-semibold">History</h3>
                <ul className="mt-2 space-y-2">
                    {history.length === 0 && <li className="text-sm text-gray-400">No history yet.</li>}
                    {history.map((h, i) => (
                        <li key={h.ts} className="p-3 border rounded bg-white">
                            <div className="text-sm text-gray-600">{new Date(h.ts).toLocaleString()}</div>
                            <div className="mt-1">{h.text}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
