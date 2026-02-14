import React from 'react'
import GreetingForm from './components/GreetingForm'

export default function App() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-2xl card">
                <h1 className="text-2xl font-bold mb-2">AI Greeting Generator</h1>
                <p className="text-sm text-gray-500 mb-6">Generate short, friendly greetings using Claude (Anthropic). Enter a name and occasion and click Generate.</p>
                <GreetingForm />
            </div>
        </div>
    )
}
