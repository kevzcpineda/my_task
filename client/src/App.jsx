
import Layout from './components/layout'
import Vendor from './pages/vendor';
import VendorClass from './pages/vendorClass';
import VendorTypes from './pages/vendorTypes';
import {
  Routes,Route
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

function App() {
const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
    <Layout>
      <Routes>
            <Route path='/' element={<Vendor/>}/>
            <Route path='/vendor-class' element={<VendorClass/>}/>
            <Route path='/vendor-types' element={<VendorTypes/>}/>
      </Routes>
    </Layout>
    </QueryClientProvider>
  );
}

export default App;
