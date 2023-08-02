import Sprite from './components/sprite/sprite';

import './App.css';

import bootstrap from './bootstrap/sc5.json';

const App = () => {
    const {
        header,
        nav,
        main: { content },
        footer
    } = bootstrap;

    return (
        <div className="App">
            <header>
                <h1>{header.name}</h1>
            </header>
            <nav>
                <ul>
                    {
                        nav.forEach( navItem => (
                            <li>{navItem}</li>
                        ))
                    }
                </ul>
            </nav>
            <main>
                <div>
                    <Sprite />
                    <div className='content'>{content}</div>
                </div>
            </main>

            <footer>
                <p>{footer}</p>
            </footer>
        </div>
    );
}

export default App;
