import { HassConnect } from '@hakit/core';
import { useState, useEffect, type ReactNode } from 'react';

interface HassConnectWithReconnectProps {
  hassUrl: string;
  children: ReactNode;
}

/**
 * Wraps HassConnect with automatic reconnection logic.
 *
 * On iOS PWAs, WebSocket connections can timeout when the app goes to background.
 * This component forces a clean reconnection when the app returns to foreground.
 */
export function HassConnectWithReconnect({ hassUrl, children }: HassConnectWithReconnectProps) {
  const [reconnectKey, setReconnectKey] = useState(0);

  useEffect(() => {
    let wasHidden = false;
    let timeoutId: NodeJS.Timeout | null = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasHidden = true;
        // Clear any pending reconnection
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      } else if (wasHidden) {
        // App came back to foreground - force reconnection after short delay
        // This ensures the connection is fresh when resuming
        timeoutId = setTimeout(() => {
          console.log('App resumed - forcing HA reconnection');
          setReconnectKey(prev => prev + 1);
          wasHidden = false;
          timeoutId = null;
        }, 500);
      }
    };

    // Handle iOS-specific page lifecycle events
    const handlePageHide = () => {
      wasHidden = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      // persisted=true means page was loaded from cache (iOS does this)
      if (event.persisted && wasHidden) {
        console.log('App resumed from cache - forcing HA reconnection');
        setReconnectKey(prev => prev + 1);
        wasHidden = false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <HassConnect key={reconnectKey} hassUrl={hassUrl}>
      {children}
    </HassConnect>
  );
}
