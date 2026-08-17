import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BacPaper, Series, SubjectId } from '../types';
import { SUBJECTS } from '../data/mockDatabase';
import { FormattedContent } from './FormattedContent';
import {
  GraduationCap,
  Calendar,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  Filter,
  Eye,
  Award
} from 'lucide-react';

export const BacTraining: React.FC<{ defaultExamType?: 'all' | 'BAC' | 'BEPC' }> = ({
  defaultExamType
}) => {
  const {
    bacPapers,
    userProfile,
    downloadItem,
    isDownloaded,
    selectedSubjectId,
    setSelectedSubjectId
  } = useApp();
  const isMg = userProfile.language === 'mg';

  const [selectedExamType, setSelectedExamType] = useState<'all' | 'BAC' | 'BEPC'>(
    defaultExamType || (userProfile.level === '3e' ? 'BEPC' : 'BAC')
  );
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedSeries, setSelectedSeries] = useState<Series | 'all'>('all');
  const [activePaper, setActivePaper] = useState<BacPaper | null>(null);
  const [showCorrection, setShowCorrection] = useState<boolean>(false);

  const years = [2025, 2024, 2023, 2022, 2021, 2020];

  const filteredPapers = bacPapers.filter(paper => {
    const examMatch =
      selectedExamType === 'all'
        ? true
        : paper.examType
        ? paper.examType === selectedExamType
        : selectedExamType === 'BEPC'
        ? paper.level === '3e'
        : paper.level === 'Terminale';
    const yearMatch = selectedYear === 'all' ? true : paper.year === selectedYear;
    const seriesMatch =
      selectedSeries === 'all'
        ? true
        : paper.series === selectedSeries || paper.series === 'Toutes';
    const subjectMatch = selectedSubjectId ? paper.subjectId === selectedSubjectId : true;
    return examMatch && yearMatch && seriesMatch && subjectMatch;
  });

  const handleDownloadPaper = (paper: BacPaper) => {
    downloadItem({
      id: paper.id,
      type: 'bac',
      title: paper.title,
      subjectId: paper.subjectId,
      sizeKb: 380,
      downloadedAt: new Date().toISOString(),
      data: paper
    });
  };

  if (activePaper) {
    const isDown = isDownloaded(activePaper.id);

    return (
      <div className="space-y-6 pb-20">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-md">
          <button
            onClick={() => {
              setActivePaper(null);
              setShowCorrection(false);
            }}
            className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3 py-1.5 rounded-xl"
          >
            ← {isMg ? 'Rerena amin\'ny lisitry ny BAC' : 'Retour aux sujets BAC'}
          </button>

          <button
            onClick={() => handleDownloadPaper(activePaper)}
            disabled={isDown}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
              isDown
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-blue-600 text-white border-blue-500'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{isDown ? (isMg ? 'Voatahiry' : 'Téléchargé') : (isMg ? 'Hatahiry' : 'Télécharger')}</span>
          </button>
        </div>

        {/* Paper Detail View */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs">
              <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 font-bold rounded-full">
                BAC {activePaper.year}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 font-medium rounded-full">
                Série {activePaper.series}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white">{activePaper.title}</h1>
          </div>

          {/* Paper Text */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              {isMg ? 'Votoatin-panadinana (Sujet Officiel)' : 'Énoncé officiel du sujet'}
            </h3>
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl text-slate-200 text-xs leading-relaxed shadow-inner">
              <FormattedContent content={activePaper.paperText} />
            </div>
          </div>

          {/* Toggle Correction */}
          <div className="pt-2">
            <button
              onClick={() => setShowCorrection(!showCorrection)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <Award className="w-4 h-4" />
              <span>
                {showCorrection
                  ? isMg
                    ? 'Afeno ny valiny ofisialy'
                    : 'Masquer la correction officielle'
                  : isMg
                  ? 'Jereo ny valiny ofisialy (Correction Officielle)'
                  : 'Voir la correction officielle'}
              </span>
            </button>
          </div>

          {/* Correction Section */}
          {showCorrection && (
            <div className="bg-slate-950 border border-emerald-900/60 rounded-2xl p-5 space-y-3 shadow-inner">
              <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">
                {isMg ? 'Fara-kasoavana sy Valiny ofisialy (Correction)' : 'Corrigé Officiel détaillé'}
              </h4>
              <div className="text-xs text-slate-300 leading-relaxed">
                <FormattedContent content={activePaper.correctionText} />
              </div>
            </div>
          )}
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-rose-400" />
              {isMg ? '🏆 Fanomanana Fanadinana (BEPC & BAC)' : '🏆 Annales & Sujets d\'Examens'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {isMg
                ? 'Taratasy fanadinana BEPC sy BACC Malagasy ary valiny ofisialy'
                : 'Sujets officiels types et corrigés détaillés BEPC & Baccalauréat Madagascar'}
            </p>
          </div>

          {/* Exam Type Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-2xl border border-slate-700/80">
            <button
              onClick={() => setSelectedExamType('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedExamType === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Rehetra
            </button>
            <button
              onClick={() => setSelectedExamType('BEPC')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedExamType === 'BEPC'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🎯 BEPC (3e)
            </button>
            <button
              onClick={() => setSelectedExamType('BAC')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedExamType === 'BAC'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🎓 BAC (Tle)
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {isMg ? 'Taona (Année) :' : 'Année :'}
            </label>
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 scrollbar-thin">
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                  selectedYear === 'all'
                    ? 'bg-rose-600 text-white border-rose-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                Rehetra
              </button>
              {years.map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors ${
                    selectedYear === yr
                      ? 'bg-rose-600 text-white border-rose-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {isMg ? 'Série :' : 'Série :'}
            </label>
            <div className="flex items-center space-x-1 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedSeries('all')}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${
                  selectedSeries === 'all'
                    ? 'bg-amber-500 text-slate-950 border-amber-400'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                Rehetra
              </button>
              {(['OSE', 'S', 'L', 'A', 'C', 'D'] as Series[]).map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSeries(s)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-colors ${
                    selectedSeries === s
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bac Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPapers.map(paper => {
          const isDown = isDownloaded(paper.id);

          return (
            <div
              key={paper.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                    BAC {paper.year} - Série {paper.series}
                  </span>
                  {isDown && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      ✓ Offline
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-white">{paper.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{paper.paperText}</p>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setActivePaper(paper)}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>{isMg ? 'Hamaky sy hamaha' : 'Consulter le sujet'}</span>
                </button>

                <button
                  onClick={() => handleDownloadPaper(paper)}
                  disabled={isDown}
                  className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700"
                  title="Télécharger"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
