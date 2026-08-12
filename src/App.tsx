import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader2, Sparkles, History, Users, Moon, Heart, User, LogOut, Menu, X } from 'lucide-react';

const queryClient = new QueryClient();

// --- COMPONENTS ---

const Button = ({ children, onClick, disabled, className = "", variant = "primary" }) => {
  const baseStyles = "px-6 py-3 rounded-full font-bold transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/20",
    outline: "border border-gray-700 text-gray-300 hover:border-purple-500 hover:text-white"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Card = ({ title, description, icon: Icon, onClick }) => (
  <div onClick={onClick} className="p-6 bg-[#1a191d] rounded-2xl border border-gray-800 hover:border-purple-500 transition-all cursor-pointer group">
    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="text-purple-400" size={24} />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </div>
);

// --- PAGES ---

function Home() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe', { method: 'POST' });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      alert("System warming up. Try again in 60 seconds!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0d10] text-white">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg rotate-45" />
          <span className="font-bold text-xl tracking-tighter">ENERGY ORACLE</span>
        </div>
        <Button variant="outline" className="text-sm px-4 py-2">Sign In</Button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 pt-12 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-8">
          <Sparkles size={16} />
          <span>Ancient wisdom, cosmic alignment</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
          The universe holds a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            message for you.
          </span>
        </h1>
        
        <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Unlock personalized AI life coaching, deep natal chart analysis, and a sacred community of seekers.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button onClick={handleJoin} disabled={loading} className="w-full max-w-xs text-lg py-4">
            {loading ? <Loader2 className="animate-spin" /> : "JOIN NOW — $6.99/mo"}
          </Button>
          <p className="text-gray-600 text-sm">Cancel anytime · Secure checkout</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-24 text-left">
          <Card 
            icon={Sparkles} 
            title="Natal Chart" 
            description="Your cosmic blueprint and daily horoscopes based on your exact birth time."
          />
          <Card 
            icon={User} 
            title="Life Coaching" 
            description="Talk through anything with the Oracle. Personalized guidance for your path."
          />
          <Card 
            icon={Heart} 
            title="Compatibility" 
            description="Discover the cosmic connection between you and your loved ones."
          />
          <Card 
            icon={Moon} 
            title="Dream Journal" 
            description="Decode the symbols in your subconscious with AI-powered analysis."
          />
          <Card 
            icon={History} 
            title="Reading History" 
            description="Revisit and continue your past conversations with the Oracle."
          />
          <Card 
            icon={Users} 
            title="Community" 
            description="Share your awakening and connect with other souls on the journey."
          />
        </div>
      </main>

      <footer className="p-12 border-t border-gray-900 text-center text-gray-600 text-sm">
        © 2026 Energy Oracle. Built for the Awakening.
      </footer>
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
