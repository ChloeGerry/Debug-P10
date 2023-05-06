/* eslint-disable no-return-assign */
import Button from '../../components/Button';
import Logo from '../../components/Logo';

import './style.scss';

const Menu = () => (
  <nav>
    <Logo />
    <ul>
      <li>
        <a href="#nos-services">Nos services</a>
      </li>
      <li>
        <a href="#nos-realisations">Nos réalisations</a>
      </li>
      <li>
        <a href="#notre-equipe">Notre équipe</a>
      </li>
      <li>
        <a href="#contact" className="navigation__contact">
          Contact
        </a>
      </li>
    </ul>
  </nav>
);

export default Menu;
