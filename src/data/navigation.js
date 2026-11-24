/** Anchor navigation. Each id matches a <section id> on the home page. */
export const navigation = [
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'testimonials', label: 'Customers' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', id: 'features' },
      { label: 'How it works', id: 'how-it-works' },
      { label: 'Pricing', id: 'pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Customers', id: 'testimonials' },
      { label: 'FAQ', id: 'faq' },
      { label: 'Book a demo', id: 'contact' },
    ],
  },
];

export const contactDetails = {
  email: 'hello@rowline.example',
  hours: 'Monday to Friday, 9:00 to 18:00 CET',
  response: 'We reply within one working day',
};
