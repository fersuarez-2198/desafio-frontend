import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './searchBar.scss'

import LogoMeli from '../../assets/images/logoMeli.png';
import SearchIcon from '../../assets/images/iconSearch.png';

function SearchBar() {
    //Variable para capturar la información de la búsqueda
    const [searchTerm, setSearchTerm] = useState('');
    // Variable para validar si es su "primera vez" en la página
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
    //Variables para manejar la visibilidad del navbar según su scroll
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    //Variables para manejar la redirección
    const navigate = useNavigate();

    // Función para validar si es su "primera vez" en la página
    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            setShowWelcomeMessage(true);
            localStorage.setItem('hasVisited', 'true');
        }
    }, []);

    // Función para manejar la acción la búsqueda
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/items?search=${encodeURIComponent(searchTerm)}`);
        }
    };
    // Función para manejar laacción de ENTER en el teclado y ejecute la búsqueda
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Función para manejar la visibilidad del mensaje de bienvenida
    const closeWelcomeMessage = () => {
        setShowWelcomeMessage(false);
    };

    // Función para manejar la visibilidad del navbar según su scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="content">
                <img
                    src={LogoMeli}
                    alt="Logo Mercado Libre 25 años"
                    className="logoMeli"
                />
                <div className="input-wrapper">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar productos, marcas y más..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <img src={SearchIcon} alt="Buscar" className='searchIcon' />
                    </button>
                    {showWelcomeMessage && (
                        <div className="welcome-message">
                            <div className="welcome-header">
                                <span>Hola</span>
                                <button className="close-button" onClick={closeWelcomeMessage}>X</button>
                            </div>
                            <p>
                                Para realizar búsquedas, solo debes ingresar el nombre de lo que necesitas. Pueden ser productos, marcas y más...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
