'use client';

import { useEffect } from 'react';

export default function ClientLayoutSetup() {
  useEffect(() => {
    // Disable context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // Disable pinch-to-zoom
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    // Use passive: false to be able to call preventDefault
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
}
