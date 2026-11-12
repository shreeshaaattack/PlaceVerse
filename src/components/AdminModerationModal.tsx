import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Trash2, 
  AlertCircle,
  MapPin
} from 'lucide-react';
import { Place, PlaceContribution } from '../types/place';

interface AdminModerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingContributions: PlaceContribution[];
  onApproveContribution: (contribution: PlaceContribution) => void;
  onRejectContribution: (id: string, notes: string) => void;
  totalCataloguePlaces: Place[];
  onDeletePlace: (placeId: string) => void;
}

export const AdminModerationModal: React.FC<AdminModerationModalProps> = ({
  isOpen,
  onClose,
  pendingContributions,
  onApproveContribution,
  onRejectContribution,
  totalCataloguePlaces,
  onDeletePlace,
}) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'catalogue' | 'metrics'>('queue');
  const [rejectNote, setRejectNote] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRejectSubmit = (id: string) => {
    onRejectContribution(id, rejectNote || 'Did not meet offbeat cultural criteria or duplicate submission.');
    setRejectingId(null);
    setRejectNote('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in text-white">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-rose-900/50 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-800 flex items-center justify-center text-rose-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">Admin Moderation &amp; Catalogue Portal</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                  Prototype Console
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Audit explorer submissions, moderate catalogue listings, and inspect dispersal metrics. (Client-side simulation).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/40 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('queue')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'queue'
                ? 'border-rose-500 text-rose-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Review Queue</span>
            {pendingContributions.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-slate-950 font-bold text-[10px]">
                {pendingContributions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('catalogue')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'catalogue'
                ? 'border-rose-500 text-rose-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Published Registry ({totalCataloguePlaces.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'metrics'
                ? 'border-rose-500 text-rose-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Platform Dispersal Analytics</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {/* TAB 1: REVIEW QUEUE */}
          {activeTab === 'queue' && (
            <div>
              {pendingContributions.length === 0 ? (
                <div className="py-16 text-center max-w-sm mx-auto">
                  <ShieldCheck className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white">All Submissions Cleared!</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    No pending destinations in the moderation pipeline. When explorers contribute places via the "+ Add" flow, they queue here for authorization.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingContributions.map((contrib) => (
                    <div 
                      key={contrib.id} 
                      className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white">{contrib.name}</h4>
                            <span className="text-[11px] font-semibold text-teal-400">
                              {contrib.state} ({contrib.zone} India)
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 font-medium">{contrib.tagline}</p>
                          <p className="text-xs text-slate-400 mt-1">{contrib.description}</p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-bold text-amber-300">
                            ₹{contrib.estimatedDailyCostInr.toLocaleString('en-IN')}/day
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            By {contrib.contributorName}
                          </span>
                        </div>
                      </div>

                      {/* Reject note box if toggled */}
                      {rejectingId === contrib.id && (
                        <div className="p-3 bg-slate-900 rounded-xl border border-rose-900/60 space-y-2">
                          <label className="text-[11px] text-rose-300 font-semibold block">
                            Reason for rejection:
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Inaccurate coordinates, commercial tourist trap, or lacking etiquette info"
                            value={rejectNote}
                            onChange={(e) => setRejectNote(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setRejectingId(null)}
                              className="px-2.5 py-1 text-[11px] text-slate-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleRejectSubmit(contrib.id)}
                              className="px-3 py-1 bg-rose-800 hover:bg-rose-700 text-white text-[11px] font-bold rounded"
                            >
                              Confirm Rejection
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => setRejectingId(contrib.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-950/40 border border-rose-900/60 cursor-pointer"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => onApproveContribution(contrib)}
                          className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve in This Browser</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LIVE CATALOGUE */}
          {activeTab === 'catalogue' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 mb-2">
                Manage the {totalCataloguePlaces.length} curated destination records stored in this browser:
              </div>
              <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
                {totalCataloguePlaces.map((place) => (
                  <div key={place.id} className="p-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={place.thumbnailUrl} alt={place.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{place.name}</span>
                          <span className="text-[10px] text-teal-400 font-normal">({place.state})</span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {place.category} · ₹{place.estimatedDailyCostInr.toLocaleString('en-IN')}/day · {place.crowdLevel} crowd
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                        Published
                      </span>
                      <button
                        onClick={() => onDeletePlace(place.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded cursor-pointer"
                        title="Delete from catalogue"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PLATFORM ANALYTICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Live Destinations</div>
                  <div className="text-2xl font-bold font-mono text-teal-400 mt-1">
                    {totalCataloguePlaces.length}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Indian Zones Covered</div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    6 / 6
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Avg. Daily Budget</div>
                  <div className="text-2xl font-bold font-mono text-amber-300 mt-1">
                    ₹{Math.round(totalCataloguePlaces.reduce((s, p) => s + p.estimatedDailyCostInr, 0) / (totalCataloguePlaces.length || 1)).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-[11px] text-slate-400">Pending Review</div>
                  <div className="text-2xl font-bold font-mono text-rose-400 mt-1">
                    {pendingContributions.length}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Zone Dispersal Health
                </h4>
                <div className="space-y-2">
                  {(['North', 'South', 'East', 'West', 'Central', 'North-East'] as const).map(zone => {
                    const count = totalCataloguePlaces.filter(p => p.zone === zone).length;
                    const pct = Math.round((count / (totalCataloguePlaces.length || 1)) * 100);
                    return (
                      <div key={zone} className="flex items-center gap-3 text-xs">
                        <span className="w-24 text-slate-400 shrink-0">{zone}</span>
                        <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                          <div 
                            className="h-full bg-teal-500 rounded-full" 
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-12 text-right font-mono text-slate-300 shrink-0">{count} ({pct}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-400">
          <span>Prototype simulation (Local Storage) · Production requires server RBAC &amp; database</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 cursor-pointer"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
