import { useEffect, useRef, useState } from 'react';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const initRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      if (!initRef.current) {
        initRef.current = true;
        const container = document.getElementById('pagefind-container');
        if (container) {
          const script = document.createElement('script');
          script.src = `${(window as any).__BASE_URL__ || ''}pagefind/pagefind-ui.js`;
          script.onload = () => {
            // @ts-ignore
            new window.PagefindUI({
              element: '#pagefind-container',
              showSubResults: true,
              showImages: false,
            });
          };
          script.onerror = () => {
            container.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">검색 인덱스를 로드할 수 없습니다. 빌드 후 다시 시도해주세요.</p>';
          };
          document.head.appendChild(script);
        }
      }
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
        aria-label="Open search (Ctrl+K)"
      >
        <span className="hidden sm:inline">검색</span>
        <kbd className="hidden sm:inline text-xs px-1 rounded" style={{ background: 'var(--border)' }}>Ctrl+K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        className="w-full max-w-2xl rounded-xl p-0 backdrop:bg-black/50"
        style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}
        onClick={(e) => { if (e.target === dialogRef.current) setIsOpen(false); }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold" style={{ color: 'var(--text-primary)' }}>검색</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm px-2 py-1 rounded"
              style={{ color: 'var(--text-secondary)' }}
            >
              ESC
            </button>
          </div>
          <div id="pagefind-container" />
        </div>
      </dialog>
    </>
  );
}
