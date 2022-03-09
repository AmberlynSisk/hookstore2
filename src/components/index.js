import React from 'react';
import { useRoutes } from 'hookrouter';
import ReactDOM from 'react-dom';
import '../style/main.scss'; 

import NavBar from '../src/components/pages/navigation/navBar';
import routes from '../src/components/pages/navigation/routes';

export default function App() {
  const routeResult = useRoutes(routes);

    return (
      <div className='app'>
        <NavBar />
        {routeResult}
      </div>
    );
}

ReactDOM.render(
  <App />
  , document.querySelector('.app-wrapper'));