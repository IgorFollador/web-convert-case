type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  charCount: number;
  wordCount: number;
};

export function TextEditor({ value, onChange, charCount, wordCount }: TextEditorProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        className="min-h-[280px] flex-1 w-full resize-y border-0 bg-white px-6 py-5 font-sans text-lg leading-[1.65] text-zinc-800 outline-none placeholder:text-zinc-400 focus:ring-0 md:min-h-[360px]"
        placeholder="Digite ou cole o texto a ser convertido..."
        aria-label="Editor de texto"
      />
      <div className="flex items-center justify-between border-t border-zinc-200/80 bg-zinc-50 px-6 py-2.5 text-sm text-zinc-500">
        <span>{charCount} caracteres</span>
        <span>{wordCount} palavras</span>
      </div>
    </div>
  );
}
