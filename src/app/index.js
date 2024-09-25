import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import ProductPage from './product-page';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/product/:id' element={<ProductPage/>} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
