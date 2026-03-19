import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Industries from './pages/Industries';
import IndustryDetail from './pages/IndustryDetail';
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop'; 

function App() {
    return (
        <Router>
            <ScrollToTop /> 
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/blogs/:slug" element={<BlogDetail />} />
                    <Route path="/industries" element={<Industries />} />
                    <Route path="/industries/:slug" element={<IndustryDetail />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Layout>
        </Router>
    );
} 

export default App;