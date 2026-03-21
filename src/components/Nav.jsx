function Nav({ onNavigate, user, onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: "0 48px",
      height: 80,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: scrolled ? "rgba(10, 12, 16, 0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.4s",
    }}>
      <div onClick={() => onNavigate("home")} style={{ cursor: "pointer" }}>
        <Logo />
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        {user ? (
          <>
            {/* Botão Dashboard – aparece apenas quando logado */}
            <button 
              onClick={() => onNavigate("dashboard")}
              className="btn-secondary" 
              style={{ padding: "10px 24px" }}
            >
              Dashboard
            </button>
            <span style={{ color: C.gold, padding: "10px 0", fontSize: 13 }}>
              {user.email}
            </span>
            <button 
              onClick={handleSignOut}
              className="btn-secondary" 
              style={{ padding: "10px 24px" }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={onLoginClick}
              className="btn-secondary" 
              style={{ padding: "10px 24px" }}
            >
              Sign In
            </button>
            <button 
              className="btn-primary" 
              style={{ padding: "10px 24px" }} 
              onClick={onLoginClick}
            >
              Request Demo →
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
