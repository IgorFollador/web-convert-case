import { useCallback, useState } from 'react';

const MAX_HISTORY = 50;

export function useTextHistory(initialText: string) {
  const [text, setText] = useState(initialText);
  const [history, setHistory] = useState<string[]>([]);

  const applyChange = useCallback((next: string | ((current: string) => string)) => {
    setText((current) => {
      const resolved = typeof next === 'function' ? next(current) : next;
      if (resolved !== current) {
        setHistory((prev) => [...prev, current].slice(-MAX_HISTORY));
      }
      return resolved;
    });
  }, []);

  const undo = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;
      const previous = prev[prev.length - 1]!;
      setText(previous);
      return prev.slice(0, -1);
    });
  }, []);

  return {
    text,
    setText,
    applyChange,
    undo,
    canUndo: history.length > 0,
  };
}
