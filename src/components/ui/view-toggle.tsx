import { Grid2X2, List, LayoutGrid } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg transition-all duration-300 ${
          view === 'grid'
            ? 'bg-accent-blue/20 text-accent-blue'
            : 'text-gray-400 hover:text-accent-blue hover:bg-accent-blue/10'
        }`}
        title="Grid view"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-lg transition-all duration-300 ${
          view === 'list'
            ? 'bg-accent-blue/20 text-accent-blue'
            : 'text-gray-400 hover:text-accent-blue hover:bg-accent-blue/10'
        }`}
        title="List view"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}
