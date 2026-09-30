import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export default function BeforeAfterSlider({ beforeImage, afterImage }) {
  return (
    <div style={{ borderRadius: 'var(--r-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
        background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.75rem', 
        borderRadius: 'var(--r-pill)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)'
      }}>
        Before
      </div>
      <div style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.75rem', 
        borderRadius: 'var(--r-pill)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--sprout-teal)'
      }}>
        After
      </div>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src={beforeImage} alt="Before ToddsIQ" style={{ objectFit: 'cover' }} />}
        itemTwo={<ReactCompareSliderImage src={afterImage} alt="After ToddsIQ" style={{ objectFit: 'cover' }} />}
        position={50}
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
      />
    </div>
  );
}
