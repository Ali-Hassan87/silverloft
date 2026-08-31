'use client';

import {
  Children,
  cloneElement,
  useEffect,
  useRef,
} from 'react';

const STACK_TOP_OFFSET = 90;

/*
|--------------------------------------------------------------------------
| SCROLL STACK ITEM
|--------------------------------------------------------------------------
| Instead of aggressively stacking cards on top of each other,
| each project gets its own sticky "stage".
|
| Desktop:
| - sticky positioning
| - smooth depth scaling
| - opacity transition
| - subtle vertical movement
|
| Mobile:
| - sticky behavior is disabled
| - cards return to normal document flow
| - this prevents scroll-jank on small screens
|--------------------------------------------------------------------------
*/

export function ScrollStackItem({
  children,
  index = 0,
  total = 1,
  itemClassName = '',
  onActiveChange,
}) {
  const itemRef = useRef(null);

  useEffect(() => {
    const element = itemRef.current;

    if (!element) {
      return undefined;
    }

    /*
    ------------------------------------------------------------------------
    Intersection observer
    ------------------------------------------------------------------------
    Only responsible for deciding which project is currently dominant.
    It does NOT manipulate the card itself.
    */

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onActiveChange?.(index);
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -45% 0px',
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [index, onActiveChange]);

  const isLast = index === total - 1;

  return (
    <article
      ref={itemRef}
      className={`
        scroll-stack-item
        relative
        ${itemClassName}
      `.trim()}
      data-project-index={index}
      style={{
        zIndex: index + 1,
      }}
    >
      {/* ================================================================
          DESKTOP STICKY STAGE
          ================================================================ */}

      <div
        className="
          scroll-stack-stage
          sticky
          top-[90px]
        "
      >
        {children}
      </div>

      {/* ================================================================
          SPACE BETWEEN PROJECTS
          ================================================================ */}

      {!isLast && (
        <div
          aria-hidden="true"
          className="
            scroll-stack-gap
            h-[18vh]
            min-h-[120px]
            sm:h-[24vh]
            sm:min-h-[170px]
          "
        />
      )}
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| SCROLL STACK
|--------------------------------------------------------------------------
| Wrapper that clones each child with its index/total, plus the
| onActiveChange callback. Each ScrollStackItem determines on its own,
| via IntersectionObserver, whether it's the "dominant" (centered) card
| and reports that up through onActiveChange.
|
| Deliberately does NOT run its own scroll/resize listener here: reading
| element positions on every scroll frame (getBoundingClientRect) forces
| a synchronous layout recalculation on every frame, which is unnecessary
| when the IntersectionObserver in each item already reports the same
| thing for free, off the main thread's critical path.
|--------------------------------------------------------------------------
*/

export default function ScrollStack({
  children,
  className = '',
  onActiveChange,
}) {
  const items = Children.toArray(children);
  const containerRef = useRef(null);

  return (
    <>
      <div
        ref={containerRef}
        className={`
          relative
          ${className}
        `.trim()}
      >
        {items.map((child, index) =>
          cloneElement(child, {
            index,
            total: items.length,
            onActiveChange,
          })
        )}
      </div>

      {/* ================================================================
          RESPONSIVE STYLES
          ================================================================ */}

      <style jsx global>{`
        /*
        --------------------------------------------------------------------
        Desktop
        --------------------------------------------------------------------
        */

        @media (min-width: 768px) {
          .scroll-stack-stage {
            will-change: transform;
            transform-origin: center top;
            transition:
              transform 700ms cubic-bezier(
                0.22,
                1,
                0.36,
                1
              );
          }

          .scroll-stack-item {
            scroll-margin-top: 100px;
          }
        }

        /*
        --------------------------------------------------------------------
        Tablet / mobile
        --------------------------------------------------------------------
        Sticky stacking is removed.
        This is important for touch scrolling performance.
        --------------------------------------------------------------------
        */

        @media (max-width: 767px) {
          .scroll-stack-stage {
            position: relative !important;
            top: auto !important;
          }

          .scroll-stack-gap {
            height: 10vh !important;
            min-height: 70px !important;
          }

          .scroll-stack-item {
            scroll-margin-top: 30px;
          }
        }

        /*
        --------------------------------------------------------------------
        Reduced motion
        --------------------------------------------------------------------
        */

        @media (prefers-reduced-motion: reduce) {
          .scroll-stack-stage {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}