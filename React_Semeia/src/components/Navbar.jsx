function Navbar({ isVolunteer, onToggleVolunteer, activeSection, onLinkClick }) {
  const navItems = [
    { href: '#sobre', id: 'sobre', label: 'Sobre nós' },
    { href: '#conteudo', id: 'conteudo', label: 'Conteúdo' },
    { href: '#dados', id: 'dados', label: 'Dados' },
    { href: '#historia', id: 'historia', label: 'História' },
    { href: '#contato', id: 'contato', label: 'Contato' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={activeSection === item.id ? 'active' : ''}
            onClick={() => onLinkClick && onLinkClick(item.id)}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="navbar-action">
        <button
          type="button"
          onClick={onToggleVolunteer}
          className="btn-volunteer"
        >
          {isVolunteer ? 'Para escolas' : 'Sou Voluntário'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;