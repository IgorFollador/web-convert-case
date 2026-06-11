import { useRef } from 'react';
import type { TextTransformId } from '@/lib/textTransforms';

type ToolbarButton = {
  id: TextTransformId | 'copy' | 'clear' | 'upload';
  label: string;
  accent?: boolean;
};

type ToolbarGroup = {
  label: string;
  buttons: ToolbarButton[];
};

const TOOLBAR_GROUPS: ToolbarGroup[] = [
  {
    label: 'Caixa',
    buttons: [
      { id: 'upper', label: 'CAIXA ALTA' },
      { id: 'lower', label: 'caixa baixa' },
      { id: 'sentence', label: 'Sentença' },
      { id: 'title', label: 'Título' },
      { id: 'alternating', label: 'cAiXa aLtErNaDa' },
      { id: 'invert', label: 'Inverter caixa' },
    ],
  },
  {
    label: 'Dev',
    buttons: [
      { id: 'camel', label: 'camelCase' },
      { id: 'pascal', label: 'PascalCase' },
      { id: 'snake', label: 'snake_case' },
      { id: 'kebab', label: 'kebab-case' },
    ],
  },
  {
    label: 'Utilitários',
    buttons: [
      { id: 'collapse', label: 'Limpar espaços' },
      { id: 'trim', label: 'Trim' },
      { id: 'reverse', label: 'Inverter texto' },
      { id: 'star', label: 'Mascarar *' },
      { id: 'random', label: '@#!&*%$' },
    ],
  },
];

type ToolbarProps = {
  onTransform: (id: TextTransformId) => void;
  onCopy: () => void;
  onClear: () => void;
  onUpload: (content: string) => void;
  copied: boolean;
};

export function Toolbar({ onTransform, onCopy, onClear, onUpload, copied }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (id: ToolbarButton['id']) => {
    if (id === 'copy') {
      onCopy();
      return;
    }
    if (id === 'clear') {
      onClear();
      return;
    }
    if (id === 'upload') {
      fileInputRef.current?.click();
      return;
    }
    onTransform(id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onUpload(String(reader.result ?? ''));
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="border-t border-zinc-200/80 bg-zinc-50/60 px-4 py-4 md:px-5">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.text"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => handleClick('copy')}
          className="toolbar-btn-accent"
        >
          {copied ? 'Copiado!' : 'Copiar texto'}
        </button>
        <button type="button" onClick={() => handleClick('clear')} className="toolbar-btn">
          Limpar
        </button>
        <button type="button" onClick={() => handleClick('upload')} className="toolbar-btn">
          Upload .txt
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLBAR_GROUPS.map((group) => (
          <section key={group.label} className="toolbar-section">
            <h2 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {group.label}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {group.buttons.map((button) => (
                <button
                  key={button.id}
                  type="button"
                  onClick={() => handleClick(button.id)}
                  className="toolbar-btn"
                >
                  {button.label}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
