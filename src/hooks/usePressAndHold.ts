import { useCallback, useEffect, useRef } from 'react';

// Press-and-hold: fire once immediately, then repeat while held.
// Used for volume up/down and Roku D-pad arrows so a long press keeps
// stepping instead of needing one tap per step. Keyboard / assistive-tech
// activation still works through onClick (a click with no preceding
// pointerdown).
export default function usePressAndHold(action: () => void, initialDelay = 450, repeatMs = 120) {
  const actionRef = useRef(action);
  actionRef.current = action;
  const timersRef = useRef<{ delay: number | null; repeat: number | null }>({ delay: null, repeat: null });
  const pointerHandledRef = useRef(false);

  const stop = useCallback(() => {
    if (timersRef.current.delay !== null) window.clearTimeout(timersRef.current.delay);
    if (timersRef.current.repeat !== null) window.clearInterval(timersRef.current.repeat);
    timersRef.current = { delay: null, repeat: null };
  }, []);

  // Clear any pending timers if the component unmounts mid-hold.
  useEffect(() => stop, [stop]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      // Ignore right/middle mouse buttons.
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointerHandledRef.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // The pointer can already be gone; the repeat still ends on pointerup.
      }
      actionRef.current();
      stop();
      timersRef.current.delay = window.setTimeout(() => {
        timersRef.current.repeat = window.setInterval(() => actionRef.current(), repeatMs);
      }, initialDelay);
    },
    [stop, initialDelay, repeatMs]
  );

  const onClick = useCallback(() => {
    if (pointerHandledRef.current) {
      // The pointerdown already fired this step; ignore the trailing click.
      pointerHandledRef.current = false;
      return;
    }
    actionRef.current();
  }, []);

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return {
    onPointerDown,
    onPointerUp: stop,
    onPointerCancel: stop,
    onPointerLeave: stop,
    onLostPointerCapture: stop,
    onClick,
    onContextMenu,
  };
}
