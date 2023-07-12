import React from 'react';

const Footer = () => {
  return (
    <footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="footer-content" style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{ marginRight: '10px' }}>Synergy Connect</h3>
        <p style={{ marginRight: '10px' }}>Let Synergy Match Your Energy</p>
        <ul className="team-members" style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ marginRight: '10px' }}>
            <a href="https://github.com/Obamg3017">Femi</a>
          </li>
          <li style={{ marginRight: '10px' }}>
            <a href="https://github.com/agreen8911">Adam</a>
          </li>
          <li style={{ marginRight: '10px' }}>
            <a href="#">Gina</a>
          </li>
          <li style={{ marginRight: '10px' }}>
            <a href="https://github.com/Jovans55">Jovan</a>
          </li>
          <li style={{ marginRight: '10px' }}>
            <a href="https://github.com/kgr718">Keith</a>
          </li>
          <li style={{ marginRight: '10px' }}>
            <a href="https://github.com/D-A-Rod">Dan</a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom" style={{ marginLeft: '10px' }}>
        <p>
          &copy; 2023 ODSC. Brought to you by <span>OneDirection</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;