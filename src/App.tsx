import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppIcon } from './components/AppIcon';
import { TextEditor } from './components/TextEditor';
import { Toolbar } from './components/Toolbar';
import { useTextHistory } from './hooks/useTextHistory';
import { TEXT_TRANSFORMS, copyToClipboard, type TextTransformId } from './lib/textTransforms';

function App() {
  const { text, setText, applyChange, undo, canUndo } = useTextHistory('');
  const [copied, setCopied] = useState(false);

  const charCount = text.length;
  const wordCount = useMemo(() => {
    const trimmed = text.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [text]);

  const handleTransform = useCallback(
    (id: TextTransformId) => {
      applyChange((current) => TEXT_TRANSFORMS[id](current));
    },
    [applyChange],
  );

  const handleCopy = useCallback(async () => {
    if (!text) return;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const handleClear = useCallback(() => {
    applyChange('');
  }, [applyChange]);

  const handleUpload = useCallback(
    (content: string) => {
      applyChange(content);
    },
    [applyChange],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey && canUndo) {
        e.preventDefault();
        undo();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [canUndo, undo]);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-zinc-200/80 bg-white px-4 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3.5">
            <AppIcon className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
                Convert Case
              </h1>
              <p className="text-sm text-zinc-500">
                Converta caixa de texto no navegador
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            100% local — nada sai do seu browser
          </span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col p-4 md:p-6">
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <TextEditor
            value={text}
            onChange={setText}
            charCount={charCount}
            wordCount={wordCount}
          />
          <Toolbar
            onTransform={handleTransform}
            onCopy={handleCopy}
            onClear={handleClear}
            onUpload={handleUpload}
            onUndo={undo}
            canUndo={canUndo}
            copied={copied}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
