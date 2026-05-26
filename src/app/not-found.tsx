"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cutting-mat flex flex-col items-center justify-center p-8 relative">
      {/* Vinheta escura nas bordas */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] z-0" />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 max-w-lg w-full"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Folha rasgada caída */}
        <motion.div
          className="relative w-full bg-[#f0e8d0] p-8 rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 27px, #c8d8e8 27px, #c8d8e8 28px)',
            clipPath:
              'polygon(0% 0%, 100% 2%, 98% 40%, 100% 65%, 97% 100%, 3% 98%, 0% 70%, 2% 35%)',
          }}
          animate={{ rotate: [-1.5, 1.5, -1, 1.2, -1.5] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        >
          {/* Fita adesiva no topo */}
          <div
            className="absolute top-[-14px] left-1/2 -translate-x-1/2 w-20 h-5 rotate-[-8deg]"
            style={{
              backgroundColor: 'rgba(255, 182, 193, 0.7)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              clipPath: 'polygon(3% 0, 97% 2%, 99% 100%, 1% 96%)',
            }}
            aria-hidden="true"
          />

          {/* Número 404 */}
          <p
            className="font-marker text-[7rem] leading-none text-center text-neutral-900/10 select-none absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            404
          </p>

          <div className="relative z-10 text-center flex flex-col items-center gap-4">
            <p className="font-marker text-5xl text-red-800 -rotate-2">
              Ops!
            </p>
            <p className="font-handwritten text-2xl text-neutral-800 rotate-1 leading-tight">
              Essa página voou da mesa...
            </p>
            <p className="font-handwritten text-lg text-blue-900 -rotate-1 opacity-80">
              Talvez esteja perdida em algum grupo da Copa 🔍
            </p>

            {/* Seta desenhada à mão */}
            <svg
              viewBox="0 0 60 40"
              className="w-14 h-10 mt-2 rotate-12 opacity-60"
              style={{ stroke: '#8b1a1a', fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round' }}
              aria-hidden="true"
            >
              <path d="M5,20 Q20,8 50,20" />
              <path d="M42,14 L50,20 L44,28" />
            </svg>

            <Link
              href="/"
              className="mt-2 inline-block"
            >
              <motion.div
                className="bg-neutral-800 text-amber-50 font-marker text-base px-6 py-3 uppercase tracking-wider shadow-md rotate-[-1deg]"
                whileHover={{ rotate: 0, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                ◀ Voltar para a Mesa
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Nota de rodapé manuscrita */}
        <p className="font-handwritten text-sm text-amber-50/40 text-center rotate-1">
          * erro 404 — página não encontrada no almanaque
        </p>
      </motion.div>
    </main>
  );
}
