interface JourneyPathProps {
  activeStep: number;
}

export default function JourneyPath({ activeStep }: JourneyPathProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '2px',
        margin: '30px 0 40px 0',
        overflow: 'hidden',
      }}
      className="journey-path-bar"
    >
      {/* Active Fill Beam */}
      <div
        style={{
          width: activeStep === 0 ? '33%' : activeStep === 1 ? '66%' : '100%',
          height: '100%',
          background: 'linear-gradient(90deg, #10b981 0%, #06b6d4 50%, #8b5cf6 100%)',
          borderRadius: '2px',
          transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 0 15px rgba(52, 211, 153, 0.8)',
        }}
      />

      {/* Traveling Energy Pulse Particle */}
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          left: activeStep === 0 ? '30%' : activeStep === 1 ? '63%' : '97%',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: '#ffffff',
          boxShadow: '0 0 20px #34d399, 0 0 35px #06b6d4',
          transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  );
}
