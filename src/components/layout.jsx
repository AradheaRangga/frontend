import Component from "./Component";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Component />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
