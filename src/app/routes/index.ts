import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

interface Router {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: LazyExoticComponent<ComponentType<any>>; // ✅ bisa terima lazy
}

export const routes: Router[] = [
  {
    path: '/',
    element: lazy(() => import('../pages/homePage')),
  },
  {
    path: '/login',
    element: lazy(() => import('../pages/loginPage')),
  },
  {
    path: '/register',
    element: lazy(() => import('../pages/registerPage')),
  },
  {
    path: '/detail-book/:id',
    element: lazy(() => import('../pages/detailBook')),
  },
  {
    path: '/book-list-filter',
    element: lazy(() => import('../pages/bookListFilter')),
  },
  {
    path: '/book-by-author/:authorId',
    element: lazy(() => import('../pages/bookByAuthor')),
  },
  {
    path: '/cart',
    element: lazy(() => import('../pages/cartPage')),
  },
  {
    path: '/checkout',
    element: lazy(() => import('../pages/checkoutPage')),
  },
];
