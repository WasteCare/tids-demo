import { HomeIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/20/solid'

// This file contains the filter options for the issues and disasters
// It is used in the sidebar of the application
// The filter options are used to filter the issues and disasters based on their status

export default {
  topFilters: [
    {
      id: 'all',
      name: 'All Issues & Disasters',
      href: '#',
      icon: HomeIcon,
      count: '5',
      current: true,
      func: -1,
    },
    {
      id: 'open',
      name: 'Open Issues & Disasters',
      href: '#',
      icon: ExclamationTriangleIcon,
      current: false,
      func: true,
    },
    {
      id: 'closed',
      name: 'Closed Issues & Disasters',
      href: '#',
      icon: CheckIcon,
      count: '12',
      current: false,
      func: false,
    },
  ],
  flaggedFilters: [
    {
      id: 'flagged',
      name: 'Flagged',
      href: '#',
      icon: ExclamationTriangleIcon,
      current: false,
      func: true,
    },
    {
      id: 'unflagged',
      name: 'Unflagged',
      href: '#',
      icon: CheckIcon,
      current: false,
      func: false,
    },
  ],
  typeFilters: [
    {
      id: 'issue',
      name: 'Issues',
      href: '#',
      current: false,
      func: true,
    },
    {
      id: 'disaster',
      name: 'Disasters',
      href: '#',
      current: false,
      func: false,
    },
  ],
}
