import { useRef } from 'react';
import type { TextTransformId } from '@/lib/textTransforms';

type ToolbarButton = {
  id: TextTransformId | 'copy' | 'clear' | 'upload';
  label: string;
  variant?: 'primary' | 'accent';
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
  {
    label: 'Ações',
    buttons: [
      { id: 'copy', label: 'Copiar', variant: 'accent' },
      { id: 'clear', label: 'Limpar' },
      { id: 'upload', label: 'Upload .txt' },
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

function buttonClass(variant?: 'primary' | 'accent') {
  if (variant === 'accent') {
    return 'inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700';
  }
  return 'inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50';
}

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
    <div className="border-b border-zinc-200/80 bg-white px-4 py-3">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.text"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        {TOOLBAR_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-wrap items-center gap-2">
            <span className="w-20 shrink-0 text-xs font-medium uppercase tracking-wide text-zinc-400">
              {group.label}
            </span>
            {group.buttons.map((button) => (
              <button
                key={button.id}
                type="button"
                onClick={() => handleClick(button.id)}
                className={buttonClass(button.variant)}
              >
                {button.id === 'copy' && copied ? 'Copiado!' : button.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
