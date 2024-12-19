import { Grid2X2, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm p-1 rounded-lg">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-md transition-all ${
          view === 'grid'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-white/60'
        }`}
        title="Grid View"
      >
        <Grid2X2 className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-md transition-all ${
          view === 'list'
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-white/60'
        }`}
        title="List View"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}
