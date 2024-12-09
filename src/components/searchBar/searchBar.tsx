import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './searchBar.scss'

import LogoMeli from '../../assets/images/logoMeli.png';
import SearchIcon from '../../assets/images/iconSearch.png';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        if (!hasVisited) {
            setShowWelcomeMessage(true);
            localStorage.setItem('hasVisited', 'true');
        }
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/items?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const closeWelcomeMessage = () => {
        setShowWelcomeMessage(false);
    };

    return (
        <div className="navbar">

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
    )
}

export default SearchBar
