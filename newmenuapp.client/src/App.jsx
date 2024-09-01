import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowItems from './components/ShowItems';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';

function App() {

    return (
        <>

            <Router>
                <Routes>
                    <Route path="/" element={<ShowItems />} />
                    <Route path="/show-items" element={<ShowItems />} />
                    <Route path="/add-item" element={<AddItem />} /> 
                    <Route path="/edit-item/:id" element={<EditItem />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;