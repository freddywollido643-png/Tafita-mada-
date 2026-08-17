import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { RevisionPlan, RevisionTask } from '../types';
import { storageService } from '../services/storageService';
import {
  Calendar,
  Clock,
  CheckCircle,
  Plus,
  Sparkles,
  Award,
  Flame
} from 'lucide-react';

export const RevisionPlanner: React.FC = () => {
  const { userProfile, lessons } = useApp();
  const isMg = userProfile.language === 'mg';

  const [examDate, setExamDate] = useState<string>('2026-07-15');
  const [dailyHours, setDailyHours] = useState<number>(2);
  const [plan, setPlan] = useState<RevisionPlan | null>(() => storageService.getRevisionPlan());

  const generatePlan = () => {
    const days = [
      { day: 'Alatsinainy (Lundi)', topic: 'Mathématiques - Fonctions & Dérivées', subjectId: 'maths' },
      { day: 'Talata (Mardi)', topic: 'Physique-Chimie - Mécanique de Newton', subjectId: 'physique' },
      { day: 'Alarobia (Mercredi)', topic: 'SVT - Génétique & ADN', subjectId: 'svt' },
      { day: 'Alakamisy (Jeudi)', topic: 'Malagasy - Kabary traditional', subjectId: 'malagasy' },
      { day: 'Zoma (Vendredi)', topic: 'Français - Dissertation & Commentaire', subjectId: 'francais' },
      { day: 'Sabotsy (Samedi)', topic: 'Histoire-Géo & Philosophie', subjectId: 'histogeo' },
      { day: 'Alahady (Dimanche)', topic: 'Famerenana ankapobeny & Quiz BAC', subjectId: 'maths' }
    ];

    const tasks: RevisionTask[] = days.map((d, i) => ({
      id: `task-${i}`,
      date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
      dayName: d.day,
      subjectId: d.subjectId as any,
      topic: d.topic,
      durationMinutes: Math.round((dailyHours * 60) / 2),
      isCompleted: false
    }));

    const newPlan: RevisionPlan = {
      examDate,
      level: userProfile.level,
      series: userProfile.series,
      dailyHours,
      tasks
    };

    storageService.saveRevisionPlan(newPlan);
    setPlan(newPlan);
  };

  const toggleTaskCompleted = (taskId: string) => {
    if (!plan) return;
    const updatedTasks = plan.tasks.map(t =>
      t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
    );
    const updatedPlan = { ...plan, tasks: updatedTasks };
    storageService.saveRevisionPlan(updatedPlan);
    setPlan(updatedPlan);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-lg space-y-4">
        <div>
          <h1 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-fuchsia-400" />
            {isMg ? '📅 Plan de révision - Tetiandro Fandaminana' : '📅 Planning de Révision BAC'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isMg
              ? 'Ataovy ny fandaharam-potoana hamerenana ny lesona rehetra alohan\'ny fanadinana'
              : 'Générez un programme d\'étude personnalisé selon votre série et votre date de BAC'}
          </p>
        </div>

        {/* Generator Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {isMg ? 'Dati-n\'ny BAC :' : 'Date de l\'examen :'}
            </label>
            <input
              type="date"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              {isMg ? 'Ora fianarana isan\'andro :' : 'Heures d\'étude par jour :'}
            </label>
            <select
              value={dailyHours}
              onChange={e => setDailyHours(Number(e.target.value))}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value={1}>1 heure / jour</option>
              <option value={2}>2 heures / jour</option>
              <option value={3}>3 heures / jour</option>
              <option value={4}>4 heures / jour</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={generatePlan}
              className="w-full py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center space-x-1"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isMg ? 'Hamorona Tetiandro' : 'Générer le planning'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Plan Agenda Display */}
      {plan ? (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base text-white">
                {isMg ? 'Fandaharam-potoana isan-kerinandro' : 'Programme hebdomadaire'}
              </h3>
            </div>
            <span className="text-xs text-amber-400 font-bold">
              Target: {plan.examDate}
            </span>
          </div>

          <div className="space-y-3">
            {plan.tasks.map(task => (
              <div
                key={task.id}
                onClick={() => toggleTaskCompleted(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  task.isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">
                    {task.dayName}
                  </span>
                  <h4 className="font-bold text-sm text-white">{task.topic}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {task.durationMinutes} minutes
                  </p>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                    task.isCompleted
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'border-slate-600'
                  }`}
                >
                  {task.isCompleted && <CheckCircle className="w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-3">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">
            {isMg ? 'Mbola tsy misy tetiandro voaorina' : 'Aucun planning généré'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {isMg
              ? 'Kitiho ny "Hamorona Tetiandro" eo ambony mba hahazoana ny fandaharam-potoananao'
              : 'Cliquez sur "Générer le planning" pour créer votre programme personnalisé.'}
          </p>
        </div>
      )}

    </div>
  );
};
