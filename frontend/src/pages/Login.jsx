import React, { useState, useEffect, useRef } from 'react'
import '../App.css'
import { SparklesCore } from '../components/Sparkles'
import LoginForm from '../components/LoginForm'

export default function Login() {
  const targetRef = useRef(null);

  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className='min-h-screen w-full bg-black'>
      <div className="h-[50rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
          Welcome
        </h1>
        <div className="w-[40rem] h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>

        <div className='flex items-center justify-center'>
          <button
            onClick={handleScroll}
            className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-900 transition text-2xl"
          >
            Let's Start
          </button>
        </div>
      </div>

      <div ref={targetRef} className='flex items-center justify-center py-6 min-h-screen'>
        <LoginForm />
      </div>
    </div>
  )
}