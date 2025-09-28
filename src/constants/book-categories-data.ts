interface BookCategory {
  id: number; // ✅ tambah id biar konsisten
  label: string;
  icon: string;
  link: string;
}

export const bookCategories: BookCategory[] = [
  {
    id: 1,
    label: 'Fiction',
    icon: '/icons/fiction-icon.svg',
    link: '/book-list-filter?categoryId=1',
  },
  {
    id: 15,
    label: 'Non-Fiction',
    icon: '/icons/non-fiction-icon.svg',
    link: '/book-list-filter?categoryId=15',
  },
  {
    id: 9,
    label: 'Self-Improvement',
    icon: '/icons/self-improvement-icon.svg',
    link: '/book-list-filter?categoryId=9',
  },
  {
    id: 10,
    label: 'Finance',
    icon: '/icons/finance-icon.svg',
    link: '/book-list-filter?categoryId=10',
  },
  {
    id: 14,
    label: 'Science',
    icon: '/icons/science-icon.svg',
    link: '/book-list-filter?categoryId=14',
  },
  {
    id: 13,
    label: 'Education',
    icon: '/icons/education-icon.svg',
    link: '/book-list-filter?categoryId=13',
  },
];
