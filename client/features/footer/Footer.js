import React from 'react';



const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h3>Synergy Connect</h3>
        <p>Let Synergy Match Your Energy</p>
        <ul className="team-members">
          <li>
            <a href="https://github.com/Obamg3017">Femi</a>
          </li>
          <li>
            <a href="https://github.com/agreen8911">Adam</a>
          </li>
          <li>
            <a href="#">Gina</a>
          </li>
          <li>
            <a href="https://github.com/Jovans55">Jovan</a>
          </li>
          <li>
            <a href="https://github.com/kgr718">Keith</a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2023 ODSC. Brought to you by <span>OneDirection</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
