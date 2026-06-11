import { useCallback, useMemo, useState } from 'react';
import { AppIcon } from './components/AppIcon';
import { TextEditor } from './components/TextEditor';
import { Toolbar } from './components/Toolbar';
import { EXAMPLE_TEXT } from './content/exampleText';
import { TEXT_TRANSFORMS, copyToClipboard, type TextTransformId } from './lib/textTransforms';

function App() {
  const [text, setText] = useState(EXAMPLE_TEXT);
  const [copied, setCopied] = useState(false);

  const charCount = text.length;
  const wordCount = useMemo(() => {
    const trimmed = text.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }, [text]);

  const handleTransform = useCallback((id: TextTransformId) => {
    setText((current) => TEXT_TRANSFORMS[id](current));
  }, []);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const handleClear = useCallback(() => {
    setText('');
  }, []);

  const handleUpload = useCallback((content: string) => {
    setText(content);
  }, []);

  return (
    <div className="flex h-dvh flex-col">
      <header className="border-b border-zinc-200/80 bg-white/90 px-4 py-3.5 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <AppIcon className="h-9 w-9 shrink-0 rounded-lg shadow-sm" />
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
                Convert Case
              </h1>
              <p className="text-xs text-zinc-500">
                Converta caixa de texto no navegador
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            100% local — nada sai do seu browser
          </span>
        </div>
      </header>

      <Toolbar
        onTransform={handleTransform}
        onCopy={handleCopy}
        onClear={handleClear}
        onUpload={handleUpload}
        copied={copied}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col p-4 min-h-0">
        <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm min-h-0">
          <TextEditor
            value={text}
            onChange={setText}
            charCount={charCount}
            wordCount={wordCount}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
