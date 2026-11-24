/**
 * Simulated API layer.
 *
 * The landing page has no backend, so these functions resolve local data
 * after a short delay. Swap the bodies for real `fetch` calls and the rest
 * of the app keeps working, because components only see promises.
 *
 * Add a `demo` query parameter to preview each UI state:
 *   ?demo=slow   3 second responses (loading skeletons)
 *   ?demo=empty  empty lists (empty states)
 *   ?demo=error  first request fails, "Try again" succeeds (error states)
 */
import { faqs } from './faq';
import { plans } from './pricing';
import { testimonials } from './testimonials';

const demoMode = new URLSearchParams(window.location.search).get('demo');

function simulateRequest(payload, { attempt = 0, delay = 350 } = {}) {
  const wait = demoMode === 'slow' ? 3000 : delay;

  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (demoMode === 'error' && attempt === 0) {
        reject(new Error('Simulated network error'));
        return;
      }
      const isEmptyDemo = demoMode === 'empty' && Array.isArray(payload);
      resolve(isEmptyDemo ? [] : payload);
    }, wait);
  });
}

export const fetchPlans = (options) => simulateRequest(plans, options);

export const fetchTestimonials = (options) => simulateRequest(testimonials, options);

export const fetchFaqs = (options) => simulateRequest(faqs, options);

/** Pretends to send the demo request. Resolves with a receipt object. */
export function submitDemoRequest(values, options) {
  const receipt = { ok: true, email: values.email, receivedAt: new Date().toISOString() };
  return simulateRequest(receipt, { delay: 900, ...options });
}
