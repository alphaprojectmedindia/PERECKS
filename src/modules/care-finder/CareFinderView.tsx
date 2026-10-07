import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { MapPin, Search, Phone, ExternalLink, Building2, Hospital } from 'lucide-react';
import renalUnitsData from '../../../data/processed/renal_units_uk.json';

export const CareFinderView: React.FC = () => {
  const { profile } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [postcode, setPostcode] = useState('CV1 5FB'); // Coventry default
  const [filterType, setFilterType] = useState<'renal' | 'gp' | 'pharmacy'>('renal');
  const [searchResults, setSearchResults] = useState(renalUnitsData);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode) return;
    // Filter renal units by matching query or postcode substring
    const query = postcode.toUpperCase().trim();
    const filtered = renalUnitsData.filter(
      (u) =>
        u.name.toUpperCase().includes(query) ||
        u.postcode.toUpperCase().includes(query) ||
        u.region.toUpperCase().includes(query) ||
        u.address.toUpperCase().includes(query)
    );
    setSearchResults(filtered.length > 0 ? filtered : renalUnitsData);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.nav.careFinder}</h2>
        <p className="text-xs text-nhs-secondaryText">
          Find your nearest NHS GP practice, pharmacy, or specialist renal unit across the UK.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <MapPin className="w-5 h-5 absolute left-3 top-3.5 text-nhs-secondaryText" />
            <input
              type="text"
              placeholder="Enter UK postcode or city (e.g. CV2 2DX, London, Leeds)..."
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="w-full pl-10 p-3 border border-nhs-borderGrey/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-nhs-blue min-h-[44px]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Search className="w-4 h-4" />
            <span>Search NHS Directory</span>
          </button>
        </form>

        {/* Filters */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={() => setFilterType('renal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              filterType === 'renal' ? 'bg-nhs-blue text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            NHS Renal Units ({renalUnitsData.length})
          </button>
          <a
            href="https://www.nhs.uk/service-search/find-a-gp"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-nhs-blue hover:underline flex items-center gap-1"
          >
            <span>Find a GP (NHS.UK)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://www.nhs.uk/service-search/pharmacy/find-a-pharmacy"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-nhs-blue hover:underline flex items-center gap-1"
          >
            <span>Find a Pharmacy (NHS.UK)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-nhs-darkBlue">
          Specialist NHS Kidney Centres ({searchResults.length} listed)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchResults.map((unit) => (
            <div
              key={unit.id}
              className="bg-white rounded-2xl p-5 border border-nhs-borderGrey/30 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-nhs-text leading-snug">{unit.name}</h4>
                  <span className="text-[10px] bg-blue-50 text-nhs-blue px-2 py-0.5 rounded font-semibold whitespace-nowrap">
                    {unit.region}
                  </span>
                </div>
                <p className="text-xs text-nhs-secondaryText">{unit.address}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {unit.services.map((s, idx) => (
                    <span key={idx} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <a
                  href={`tel:${unit.phone.replace(/\s+/g, '')}`}
                  className="font-bold text-nhs-blue flex items-center gap-1 hover:underline min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{unit.phone}</span>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    unit.name + ' ' + unit.postcode
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nhs-secondaryText hover:text-nhs-text flex items-center gap-1"
                >
                  <span>Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
