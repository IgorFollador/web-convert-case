type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  charCount: number;
  wordCount: number;
};

export function TextEditor({ value, onChange, charCount, wordCount }: TextEditorProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="min-h-0 flex-1 w-full resize-none border-0 bg-zinc-50/50 p-5 font-mono text-[13px] leading-relaxed text-zinc-800 outline-none focus:bg-white focus:ring-0"
        placeholder="Digite ou cole o texto a ser convertido..."
        aria-label="Editor de texto"
      />
      <div className="flex items-center justify-between border-t border-zinc-200/80 bg-zinc-50/80 px-5 py-2 text-xs text-zinc-500">
        <span>{charCount} caracteres</span>
        <span>{wordCount} palavras</span>
      </div>
    </div>
  );
}
