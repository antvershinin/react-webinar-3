import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { BrowserRouter } from 'react-router-dom';
import LocaleProvider from './hooks/localization/locale-provider';

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <BrowserRouter>
  <LocaleProvider>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
    </LocaleProvider>
  </BrowserRouter>,
);
