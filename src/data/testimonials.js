/** Portraits are free Unsplash photos, requested at avatar size. */
const portrait = (photoId, size) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&crop=faces&w=${size}&h=${size}&q=70`;

const photo = (photoId) => ({
  src: portrait(photoId, 64),
  srcSet: `${portrait(photoId, 64)} 1x, ${portrait(photoId, 128)} 2x`,
});

export const testimonials = [
  {
    id: 'halden',
    quote:
      'We cancelled our Monday status meeting in the second week. The Friday digest tells me more than that meeting ever did.',
    name: 'Hannah Brooks',
    role: 'Head of Delivery',
    company: 'Halden Studio',
    photo: photo('photo-1494790108377-be9c29b29330'),
    featured: true,
  },
  {
    id: 'brightmile',
    quote:
      'The workload view showed one designer carrying half the sprint. We had missed that for months.',
    name: 'Daniel Mercer',
    role: 'Engineering Manager',
    company: 'Brightmile',
    photo: photo('photo-1507003211169-0a1dd7228f2d'),
    featured: false,
  },
  {
    id: 'northwind',
    quote:
      'Clients open a read-only link instead of waiting for my weekly email. That is three hours back every week.',
    name: 'Sofia Lindqvist',
    role: 'Operations Lead',
    company: 'Northwind Freight',
    photo: photo('photo-1438761681033-6461ffad8d80'),
    featured: false,
  },
];
