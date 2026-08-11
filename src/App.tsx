import React from 'react';
import { Switch, Route } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen bg-[#0e0d10] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        ENERGY ORACLE
      </h1>
      <p className="text-xl mb-8 text-gray-400">Ancient wisdom, cosmic alignment.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        <button className="p-6 bg-[#1a191d] rounded-xl border border-gray-800 hover:border-purple-500 transition-all text-left">
          <h3 className="text-xl font-bold">Natal Chart</h3>
          <p className="text-gray-500">Cosmic blueprint & daily horoscope</p>
        </button>
        <button className="p-6 bg-[#1a191d] rounded-xl border border-gray-800 hover:border-purple-500 transition-all text-left">
          <h3 className="text-xl font-bold">Ask the Oracle</h3>
          <p className="text-gray-500">Personalized AI life coaching</p>
        </button>
      </div>
      <div className="mt-12 text-center">
        <p className="text-2xl font-bold">$6.99/mo</p>
        <button className="mt-4 px-8 py-3 bg-purple-600 rounded-full font-bold hover:bg-purple-700 transition-all">
          JOIN THE MOVEMENT
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </QueryClientProvider>
  );
}
