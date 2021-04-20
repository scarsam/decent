const Layout: React.FC = ({ children }) => {
  return (
    <main className="antialiased bg-hero-pattern bg-no-repeat bg-right-top bg-50% flex flex-col h-full">
      {children}
    </main>
  );
};

export default Layout;
