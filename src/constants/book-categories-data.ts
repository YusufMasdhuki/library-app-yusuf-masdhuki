interface BookCategory {
  label: string;
  icon: string;
  link: string;
}

export const bookCategories: BookCategory[] = [
  {
    label: 'Fiction',
    icon: '/icons/fiction-icon.svg',
    link: '#',
  },
  {
    label: 'Non-Fiction',
    icon: '/icons/non-fiction-icon.svg',
    link: '#',
  },
  {
    label: 'Self-Improvement',
    icon: '/icons/self-improvement-icon.svg',
    link: '#',
  },
  {
    label: 'Finance',
    icon: '/icons/finance-icon.svg',
    link: '#',
  },
  {
    label: 'Science',
    icon: '/icons/science-icon.svg',
    link: '#',
  },
  {
    label: 'Education',
    icon: '/icons/education-icon.svg',
    link: '#',
  },
];
