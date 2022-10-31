import logo from '../../img/logo.svg';
import './Header.scss';

export const Header = () => (
  <header className="header">

    <div className="header__background-nav"/> 

    <div className="header__nav container">
      <a href="/#" className="logo">
        <img 
          className="logo__img" 
          src={logo} 
          alt="logo" 
        />
      </a>

      <div className="header__buttons">
        <a href="#users" className="button">
          Users
        </a>

        <a href="#sing-up" className="button">
          Sign up
        </a>
      </div>
    </div>

    <div className="header__content">
      <h1 className="header__title">
        Test assignment for front-end developer
      </h1>

      <p className="header__description">
        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
      </p>

      <a href="#sing-up" className="button">
        Sign up
      </a>
    </div>
  </header>
)