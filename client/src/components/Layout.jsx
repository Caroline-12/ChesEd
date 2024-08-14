import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="App  font-raleway">
      <Outlet />
    </main>
  );
};

export default Layout;
