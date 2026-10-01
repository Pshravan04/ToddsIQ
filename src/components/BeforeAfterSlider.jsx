import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export default function BeforeAfterSlider({ beforeImage, afterImage }) {
  return (
    <div className="rounded-3xl overflow-hidden shadow-card relative border border-ink/10">
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-ink/60 uppercase tracking-widest shadow-sm">
        Tablets
      </div>
      <div className="absolute top-4 right-4 z-10 bg-coral text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
        ToddsIQ
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