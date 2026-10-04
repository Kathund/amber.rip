import { twMerge } from 'tailwind-merge';

export interface StarParticleProps {
  delay: number;
  offset: number;
  index: number;
}

export default function StarParticle({ delay, offset, index }: StarParticleProps) {
  return (
    <div
      key={index}
      className={twMerge(
        'starParticle l-12 absolute top-0 h-2 w-12 scale-50 rounded-full bg-gradient-to-l from-[#f5c2e7]/90 to-transparent shadow-[12px_0_16px_rgba(245,194,231,0.8)]'
      )}
      style={{ ['--d' as any]: `${delay}s`, ['--o' as any]: `${offset}` }}
    />
  );
}
