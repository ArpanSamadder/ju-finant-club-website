import type {ButtonHTMLAttributes} from 'react';

type CarouselArrowDirection = 'left' | 'right';

type CarouselArrowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: CarouselArrowDirection;
};

const chevronPath: Record<CarouselArrowDirection, string> = {
  left: 'M40 14 22 32l18 18',
  right: 'm24 14 18 18-18 18',
};

export function CarouselArrow({direction, className = '', children, ...props}: CarouselArrowProps) {
  return (
    <button
      {...props}
      className={`finant-carousel-arrow finant-carousel-arrow-${direction} ${className}`.trim()}
    >
      <svg
        aria-hidden="true"
        className="finant-carousel-arrow-icon"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d={chevronPath[direction]}
          stroke="currentColor"
          strokeWidth="7.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children ? <span className="sr-only">{children}</span> : null}
    </button>
  );
}
