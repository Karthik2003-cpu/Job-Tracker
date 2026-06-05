import Sidebar from "./sidebar";

const Layout = ({children}) => {
    return(
        <div className="layout">
            <Sidebar/>
            <main>
                {children}
            </main>
        </div>
    );
};

export default Layout;