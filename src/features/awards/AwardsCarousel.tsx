'use client';

import { useId } from 'react';

import { awards } from './awards.data';
import styles from './AwardsCarousel.module.css';

interface AwardsCarouselProps {
  speed?: number;
}

export function AwardsCarousel({ speed = 90 }: AwardsCarouselProps) {
  const id = useId();

  const animationStyle = {
    '--marquee-duration': `${speed}s`,
  } as React.CSSProperties;

  return (
    <section aria-labelledby={`${id}-title`} className="w-full py-16">
      <h2 id={`${id}-title`} className="sr-only">
        Awards and recognition
      </h2>

      <div className={styles.viewport}>
        <div className={styles.track} style={animationStyle} data-testid="awards-carousel-track">
          <AwardGroup ariaHidden={false} />
          <AwardGroup ariaHidden />
        </div>
      </div>
    </section>
  );
}

interface AwardGroupProps {
  ariaHidden: boolean;
}

function AwardGroup({ ariaHidden }: AwardGroupProps) {
  return (
    <div aria-hidden={ariaHidden} className={styles.group} data-testid="awards-carousel-group">
      {awards.map((award) => (
        <article key={award.id} className="w-[var(--card-width)] shrink-0">
          <div className="bg-surface relative flex min-h-60 items-center justify-center overflow-hidden rounded-md max-[1024px]:min-h-[150px] max-[640px]:min-h-[190px]">
            <span className="text-grey-300 absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[0.525rem] tracking-[0.04em] whitespace-nowrap">
              ({award.number})
            </span>

            <i
              className={` ${award.icon} grid size-20 place-items-center font-sans text-2xl tracking-[-0.08em] text-black max-[640px]:size-14 max-[640px]:text-[1.5rem]`}
              aria-hidden="true"
            />
          </div>
        </article>
      ))}
    </div>
  );
}
