import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layout';
import { createContext } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { useMediaQuery } from 'react-responsive';
import MessengerCustomerChat from 'react-messenger-customer-chat';

export const StateContext = createContext();

function App() {
    const currentUser = useSelector((state) => state.auth.login.currentUser)
    const [style, setStyle] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(false);
    const [admin, setAdmin] = useState('');
 
    // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
    // setInterval(()=>{console.log(`isTabletOrMobile:${isTabletOrMobile}`)},1000)
    // const location = useLocation();
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
                    />
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
