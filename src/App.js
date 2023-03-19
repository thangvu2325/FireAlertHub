import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layout';
import AuthContext from '~/AuthContext';
import { useContext, createContext } from 'react';
export const StateContext = createContext();
function App() {
    const { currentUser } = useContext(AuthContext);
    const [style, setStyle] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(false);
    if (style === true) {
        document.documentElement.style.setProperty('--background-color', '#060714');
        document.documentElement.style.setProperty('--text-color', '#FBFBFB');
        document.documentElement.style.setProperty('--white', '#0C0C1E');
    } else {
        document.documentElement.style.setProperty('--background-color', '#ebebeb');
        document.documentElement.style.setProperty('--text-color', '#161823');
        document.documentElement.style.setProperty('--white', '#f9f9f9');
    }
    return (
        <StateContext.Provider value={{ style, setStyle, sidebarWidth, setSidebarWidth }}>
            <Router>
                <div className="App">
                    <Routes>
                        {currentUser
                            ? privateRoutes.map((route, index) => {
                                  const Page = route.component;
                                  let Layout = DefaultLayout;

                                  if (route.layout) {
                                      Layout = route.layout;
                                  } else if (route.layout === null) {
                                      Layout = Fragment;
                                  }

                                  return (
                                      <Route
                                          key={index}
                                          path={route.path}
                                          element={
                                              <Layout>
                                                  <Page />
                                              </Layout>
                                          }
                                      />
                                  );
                              })
                            : publicRoutes.map((route, index) => {
                                  const Page = route.component;
                                  let Layout = DefaultLayout;

                                  if (route.layout) {
                                      Layout = route.layout;
                                  } else if (route.layout === null) {
                                      Layout = Fragment;
                                  }

                                  return (
                                      <Route
                                          key={index}
                                          path={route.path}
                                          element={
                                              <Layout>
                                                  <Page />
                                              </Layout>
                                          }
                                      />
                                  );
                              })}
                    </Routes>
                </div>
            </Router>
        </StateContext.Provider>
    );
}

export default App;
