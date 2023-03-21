import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layout';
import AuthContext from '~/AuthContext';
import { useContext, createContext } from 'react';
import { useEffect } from 'react';
import { database } from './firebase_setup/firebase';
import { get, ref, onValue } from 'firebase/database';
export const StateContext = createContext();
function App() {
    const { currentUser } = useContext(AuthContext);
    const [style, setStyle] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(false);
    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState('');
    const [mq2Value, setMq2Value] = useState('');
    const [fireValue, setFireValue] = useState('');
    useEffect(() => {
        if (currentUser) {
            const userId = currentUser.uid;
            get(ref(database, `role/${userId}`)).then((snapshot) => {
                const role = snapshot.val().role;
                if (role === 'adminA') {
                    setAdmin('adminA');
                } else if (role === 'adminB') {
                    setAdmin('adminB');
                } else {
                    setAdmin('');
                }
            });
            onValue(ref(database), (snapshot) => {
                var data = snapshot.val();
                setData(data);
                if (!!data.From_HCMUT) {
                    Object.keys(data['From_HCMUT']).forEach((key) => {
                        if (data['From_HCMUT'][key].uid === currentUser.uid) {
                            setMq2Value(data['From_HCMUT'][key].MQ2_value);
                            setFireValue(data['From_HCMUT'][key].Fire_value);
                        }
                    });
                }
                if (!!data.From_UTE) {
                    Object.keys(data['From_UTE']).forEach((key) => {
                        if (data['From_UTE'][key].uid === currentUser.uid) {
                            setMq2Value(data['From_UTE'][key].MQ2_value);
                            setFireValue(data['From_UTE'][key].Fire_value);
                        }
                    });
                }
            });
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
                data,
                setData,
                admin,
                mq2Value,
                fireValue,
            }}
        >
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
