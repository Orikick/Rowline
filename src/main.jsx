import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/instrument-sans';
import './styles/global.scss';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* LazyMotion + `m` components keep the animation bundle small.
          reducedMotion="user" follows the visitor's OS setting. */}
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LazyMotion>
    </BrowserRouter>
  </StrictMode>,
);
