import StarParticle, { type StarParticleProps } from './StarParticle.tsx';

export default function StarField({ particles }: { particles: StarParticleProps[] }) {
  return (
    <div
      className="stars pointer-events-none fixed inset-0 z-0 [transform:scale(1.5)_rotate(35deg)] overflow-hidden"
      aria-hidden="true">
      {particles.map((particle) => (
        <StarParticle {...particle} key={particle.index} />
      ))}
    </div>
  );
}
