import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  ExternalLink, 
  Presentation, 
  Target
} from 'lucide-react';
import { PITCH_SLIDES } from '../data/startupPitchData';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToLiveDemo: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
  isOpen,
  onClose,
  onJumpToLiveDemo,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 minutes pitch timer
  const [timerRunning, setTimerRunning] = useState(false);

  const slide = PITCH_SLIDES[currentSlideIndex];

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // Keyboard navigation: Left/Right arrow keys & Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlideIndex(prev => Math.min(PITCH_SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const nextSlide = () => {
    if (currentSlideIndex < PITCH_SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fade-in text-white">
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-teal-500/30 rounded-3xl overflow-hidden shadow-2xl my-4 max-h-[95vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Presenter Control Top Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Shark Tank Pitch Deck
                </span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                  Slide {slide.id} of {PITCH_SLIDES.length}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white hidden sm:block">
                {slide.category}: {slide.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 3-Minute Pitch Timer */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono text-xs font-bold text-white">{formattedTime}</span>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="text-slate-400 hover:text-white p-0.5"
                title={timerRunning ? 'Pause timer' : 'Start pitch timer'}
              >
                {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => { setTimerSeconds(180); setTimerRunning(false); }}
                className="text-slate-400 hover:text-white p-0.5"
                title="Reset timer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Jump to Live Demo Button */}
            <button
              onClick={() => {
                onClose();
                onJumpToLiveDemo();
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg cursor-pointer transition-colors shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Jump to Live Product</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Canvas Content */}
        <div className="p-6 sm:p-12 overflow-y-auto flex-1 flex flex-col justify-center">
          <div className="max-w-3xl mx-auto w-full">
            {/* Category Subtitle */}
            <div className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
              {slide.subtitle}
            </div>

            {/* Slide Title */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {slide.headline}
            </h2>

            {/* Key Bullet Points */}
            <div className="space-y-4 mb-8">
              {slide.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0 mt-2" />
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Optional Metrics Banner */}
            {slide.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {slide.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-teal-900/50 text-center">
                    <div className="text-xl sm:text-2xl font-extrabold text-teal-300 font-mono">
                      {m.value}
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">{m.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{m.note}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Shark Tank Anchor Takeaway */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-950 border border-amber-500/30">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>The Shark Tank Bottom Line</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-100 font-medium italic">
                "{slide.sharkTankTakeaway}"
              </p>
            </div>
          </div>
        </div>

        {/* Presenter Footer Bar */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {PITCH_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-6 sm:w-8 h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx ? 'bg-teal-400 w-10 sm:w-12' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title={`Go to slide ${s.id}: ${s.title}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs font-medium text-slate-300 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentSlideIndex === PITCH_SLIDES.length - 1 ? (
              <button
                onClick={() => {
                  onClose();
                  onJumpToLiveDemo();
                }}
                className="px-4 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md"
              >
                <span>Launch Live Product Demo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={nextSlide}
                className="px-4 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-md"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
