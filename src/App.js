import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layout';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MessengerCustomerChat from 'react-messenger-customer-chat';

export const StateContext = createContext();

function App() {
    const currentUser = useSelector((state) => state.auth.login.currentUser)
    const [style, setStyle] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(false);
    const [admin, setAdmin] = useState('');

    useEffect(() => {
        if (currentUser) {
            if (currentUser?._doc.roles[0].name === 'adminA') {
                setAdmin('adminA');
            } else if (currentUser?._doc.roles[0].name === 'adminB') {
                setAdmin('adminB');
            } else {
                setAdmin('');
            }
        }
        // eslint-disable-next-line
    }, [currentUser]);
    console.log(currentUser)
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
        <StateContext.Provider
            value={{
                style,
                setStyle,
                sidebarWidth,
                setSidebarWidth,
                admin,
            }}
        >
            <Router>
                <div className="App">
                <MessengerCustomerChat
                    pageId="118879814536428"
                    appId="930949868024444"
                    // htmlRef="<REF_STRING>"
                />,
                    <Routes>
                        <>  
                            {currentUser?.accessToken
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
                        </>
                    </Routes>
                </div>
            </Router>
        </StateContext.Provider>
    );
}

export default App;
