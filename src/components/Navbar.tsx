type NavbarProps = {
  isVolunteer: boolean;
  onToggleVolunteer: () => void;
  activeSection: string;
  onLinkClick?: (sectionId: string) => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

function Navbar({
  isVolunteer,
  onToggleVolunteer,
  activeSection,
  onLinkClick,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: NavbarProps) {
  const navItems = [
    { href: "#sobre", id: "sobre", label: "Sobre nós" },
    { href: "#conteudo", id: "conteudo", label: "Conteúdo" },
    { href: "#dados", id: "dados", label: "Dados" },
    { href: "#historia", id: "historia", label: "História" },
    { href: "#contato", id: "contato", label: "Contato" },
  ];

  return (
    <nav className={`navbar ${isMenuOpen ? "is-open" : ""}`}>
      <div id="main-navigation-links" className="navbar-links">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={activeSection === item.id ? "active" : ""}
            aria-current={activeSection === item.id ? "location" : undefined}
            onClick={() => {
              onLinkClick?.(item.id);
              onCloseMenu();
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="navbar-action">
        <button
          type="button"
          onClick={() => {
            onToggleVolunteer();
            onCloseMenu();
          }}
          aria-pressed={isVolunteer}
          className="btn-volunteer"
        >
          {isVolunteer ? "Para escolas" : "Sou Voluntário"}
        </button>
      </div>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation-links"
        onClick={onToggleMenu}
      >
        <span className="menu-toggle-icon" aria-hidden="true">
          ☰
        </span>
      </button>
    </nav>
  );
}

export default Navbar;
