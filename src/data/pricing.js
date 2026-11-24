/** Prices are in US dollars per member, per month. */
export const billingOptions = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly', note: 'Save 20%' },
];

export const plans = [
  {
    id: 'starter',
    name: 'Starter',
    summary: 'For small teams getting organised.',
    price: { monthly: 0, yearly: 0 },
    cta: 'Start free',
    featured: false,
    features: [
      'Up to 5 members',
      '3 boards',
      'Board and list views',
      '7 days of activity history',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    summary: 'For teams that plan and ship every week.',
    price: { monthly: 10, yearly: 8 },
    cta: 'Start 14-day trial',
    featured: true,
    features: [
      'Unlimited boards',
      'Workload view',
      'Friday digest by email or Slack',
      'Free guest access for clients',
      '1 year of activity history',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    summary: 'For companies that need control and support.',
    price: { monthly: 15, yearly: 12 },
    cta: 'Talk to sales',
    featured: false,
    features: [
      'Everything in Team',
      'Single sign-on with SAML',
      'Admin roles and audit log',
      'Priority support, 4-hour response',
      'Unlimited activity history',
    ],
  },
];
