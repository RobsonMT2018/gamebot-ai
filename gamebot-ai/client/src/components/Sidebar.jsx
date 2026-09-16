const menuItems = ['Dashboard', 'Projetos', 'Personagens', 'Missões', 'Configurações'];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">GB</div>
      <nav>
        {menuItems.map((item) => (
          <button key={item} type="button" className="nav-item">
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
