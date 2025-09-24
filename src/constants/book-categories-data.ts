interface BookCategory {
  label: string;
  icon: string;
  link: string;
}

export const bookCategories: BookCategory[] = [
  {
    label: 'Fiction',
    icon: '/icons/fiction-icon.svg',
    link: '/book-list-filter',
  },
  {
    label: 'Non-Fiction',
    icon: '/icons/non-fiction-icon.svg',
    link: '/book-list-filter',
  },
  {
    label: 'Self-Improvement',
    icon: '/icons/self-improvement-icon.svg',
    link: '/book-list-filter',
  },
  {
    label: 'Finance',
    icon: '/icons/finance-icon.svg',
    link: '/book-list-filter',
  },
  {
    label: 'Science',
    icon: '/icons/science-icon.svg',
    link: '/book-list-filter',
  },
  {
    label: 'Education',
    icon: '/icons/education-icon.svg',
    link: '/book-list-filter',
  },
];
