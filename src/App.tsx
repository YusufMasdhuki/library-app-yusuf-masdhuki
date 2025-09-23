import { Routes, Route, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import React from 'react';
import MainLayout from './app/layout/main-layout';
import { routes } from './app/routes';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLayout currentPath={location.pathname}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={React.createElement(route.element)}
                />
              ))}
            </Routes>
          </Suspense>
        </MainLayout>
      </PersistGate>
    </Provider>
  );
}

export default App;
