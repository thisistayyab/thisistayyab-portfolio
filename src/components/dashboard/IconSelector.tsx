import React, { useState } from 'react';
import { Search, X, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { iconMap, getIcon } from '../../lib/iconMapping';

interface IconSelectorProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

// Categorize icons for better organization
const iconCategories = {
  'Services': [
    'RiCodeSSlashLine',
    'RiSmartphoneLine',
    'RiDatabaseLine',
    'RiCloudLine',
    'RiSearchLine',
    'RiShieldCheckLine',
    'RiSpeedUpLine',
    'RiCustomerServiceLine',
    'SiWordpress',
  ],
  'Profiles': [
    'RiGithubFill',
    'RiLinkedinFill',
    'SiUpwork',
    'SiFiverr',
    'SiFreelancer',
    'SiLeetcode',
    'SiCredly',
  ],
  'Experience': [
    'RiBriefcaseLine',
    'RiGraduationCapLine',
  ],
};

export const IconSelector: React.FC<IconSelectorProps> = ({
  value,
  onChange,
  label = 'Icon',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allIcons = Object.values(iconCategories).flat();
  const filteredIcons = searchQuery
    ? allIcons.filter(iconName =>
        iconName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allIcons;

  const selectedIcon = value ? getIcon(value) : null;

  const handleSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-2">{label}</label>
      
      {/* Current Selection Display */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 cursor-pointer w-full justify-start"
        >
          {selectedIcon ? (
            <>
              {React.createElement(selectedIcon, { size: 20 })}
              <span className="text-sm">{value}</span>
            </>
          ) : (
            <span className="text-gray-400">Select an icon...</span>
          )}
        </Button>
        {value && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChange('')}
            className="cursor-pointer"
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {/* Icon Picker Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card 
            className="w-full max-w-4xl max-h-[80vh] bg-gray-800 border-gray-700 flex flex-col"
            hoverScale={false}
            hoverLift={false}
            glowColor="transparent"
            gradientColors={[]}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Icon</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className="cursor-pointer"
              >
                <X size={16} />
              </Button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Icon Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {Object.entries(iconCategories).map(([category, icons]) => {
                const categoryIcons = searchQuery
                  ? icons.filter(iconName =>
                      iconName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                  : icons;

                if (categoryIcons.length === 0) return null;

                return (
                  <div key={category} className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase">
                      {category}
                    </h4>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                      {categoryIcons.map((iconName) => {
                        const Icon = getIcon(iconName);
                        const isSelected = value === iconName;

                        return (
                          <button
                            key={iconName}
                            type="button"
                            onClick={() => handleSelect(iconName)}
                            className={`
                              relative p-4 rounded-lg border-2 transition-all cursor-pointer
                              ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : 'border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700'
                              }
                            `}
                            title={iconName}
                          >
                            {isSelected && (
                              <div className="absolute top-1 right-1 bg-blue-500 rounded-full p-0.5">
                                <Check size={12} className="text-white" />
                              </div>
                            )}
                            <div className="flex flex-col items-center gap-2">
                              <Icon size={24} className={isSelected ? 'text-blue-400' : 'text-gray-300'} />
                              <span className="text-xs text-gray-400 text-center line-clamp-2">
                                {iconName.replace(/^Ri|^Si/, '').replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Show all icons if searching */}
              {searchQuery && filteredIcons.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p>No icons found matching "{searchQuery}"</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  setSearchQuery('');
                }}
                className="cursor-pointer"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
