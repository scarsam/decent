const Layout: React.FC = ({ children }) => {
  return (
    <main className="antialiased  bg-hero-pattern bg-no-repeat bg-right-top">
      {children}
    </main>
  );
};

export default Layout;
