import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  Sparkles, 
  Check, 
  Send
} from 'lucide-react';
import { IndianZone, PlaceCategory, BudgetTier, PlaceContribution } from '../types/place';

interface CommunityContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitContribution: (contribution: PlaceContribution) => void;
}

export const CommunityContributeModal: React.FC<CommunityContributeModalProps> = ({
  isOpen,
  onClose,
  onSubmitContribution,
}) => {
  const [name, setName] = useState('');
  const [stateName, setStateName] = useState('');
  const [zone, setZone] = useState<IndianZone>('North');
  const [category, setCategory] = useState<PlaceCategory>('Offbeat Nature');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('Budget (₹1,500/day)');
  const [estimatedCost, setEstimatedCost] = useState('1800');
  const [lat, setLat] = useState('25.5');
  const [lng, setLng] = useState('91.5');
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !stateName.trim() || !tagline.trim()) return;

    const newContribution: PlaceContribution = {
      id: `contrib-${Date.now()}`,
      name: name.trim(),
      state: stateName.trim(),
      zone,
      category,
      tagline: tagline.trim(),
      description: description.trim() || `${name} is an authentic offbeat destination located in ${stateName}.`,
      coordinates: {
        lat: parseFloat(lat) || 20.0,
        lng: parseFloat(lng) || 78.0,
      },
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      contributorName: contributorName.trim() || 'Anonymous Explorer',
      contributorEmail: contributorEmail.trim() || 'explorer@placeverse.in',
      bestMonths: ['October', 'November', 'December', 'March'],
      budgetTier,
      estimatedDailyCostInr: parseInt(estimatedCost, 10) || 2000,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    };

    onSubmitContribution(newContribution);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in text-white">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Contribute an Offbeat Gem</h2>
              <p className="text-xs text-slate-400">
                Peer-reviewed submission pipeline for India’s unheralded wonders.
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

        {/* Form Body */}
        {submittedSuccess ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-white">Destination Submitted to Moderation Queue!</h3>
            <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
              In this prototype, submissions are stored in this browser and can be reviewed through the demonstration admin screen. Please independently verify destination details before travelling.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Destination Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unakoti Rock Bas-Reliefs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">State / UT *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tripura"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Geographical Zone</label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value as IndianZone)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="North">North India</option>
                  <option value="South">South India</option>
                  <option value="East">East India</option>
                  <option value="West">West India</option>
                  <option value="Central">Central India</option>
                  <option value="North-East">North-East India</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Category / Theme</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PlaceCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="Heritage & Architecture">Heritage &amp; Architecture</option>
                  <option value="Spiritual & Peaceful">Spiritual &amp; Peaceful</option>
                  <option value="Offbeat Nature">Offbeat Nature</option>
                  <option value="High Altitude & Treks">High Altitude &amp; Treks</option>
                  <option value="Coastal & Backwaters">Coastal &amp; Backwaters</option>
                  <option value="Culinary & Culture">Culinary &amp; Culture</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Short Tagline *</label>
              <input
                type="text"
                required
                placeholder="e.g. Millions of Ancient Shiva Carvings Carved Into Raghunandan Hills"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Detailed Description &amp; History</label>
              <textarea
                rows={3}
                placeholder="Describe what makes this spot unique, how travelers should arrive, and why it is worth conserving..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Est. Daily Budget (INR)</label>
                <input
                  type="number"
                  placeholder="e.g. 1800"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name / Explorer Handle</label>
                <input
                  type="text"
                  placeholder="e.g. Shreesha U."
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-800/50 text-[11px] text-teal-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Submissions appear instantly in the Admin Moderation Dashboard for approval.</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-teal-950"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to PlaceVerse Moderation Pipeline</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
