import React from "react";

const Footer = () => {
  return (
    <footer className="py-3 px-6">
      <div className="footer-content flex  justify-around items-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className="my-0">Synergy Connect</h3>
          <p className="my-0">Let Synergy Match Your Energy</p>
        </div>
        <ul
          className="team-members flex justify-around m-0 p-0 [&>*]:mx-2"
          style={{ listStyle: "none" }}
        >
          <li>
            <a href="https://github.com/Obamg3017">Femi</a>
          </li>
          <li>
            <a href="https://github.com/agreen8911">Adam</a>
          </li>
          <li>
            <a href="https://github.com/GinaCastromonte">Gina</a>
          </li>
          <li>
            <a href="https://github.com/Jovans55">Jovan</a>
          </li>
          <li>
            <a href="https://github.com/kgr718">Keith</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
