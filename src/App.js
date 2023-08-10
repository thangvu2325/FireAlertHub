import { Fragment, createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layout';
import { useDispatch, useSelector } from 'react-redux';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import { currentUserSelector, themeModeSelector } from './redux/selectors';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { setNodesValue } from './redux/nodesSlice';
export const StateContext = createContext();
const WS_URL = 'ws://localhost:5000/';
function App() {
    const currentUser = useSelector(currentUserSelector);
    const dispatch = useDispatch();
    const userId = currentUser?._doc._id;

    const [requestCallAPI, setRequestCallAPI] = useState(false);
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onMessage: (message) => {
            if (currentUser._doc.roles[0].name !== 'user') {
                setRequestCallAPI(true);
            } else {
                setRequestCallAPI(true);
                dispatch(setNodesValue(JSON.parse(message.data)));
            }
        },
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true,
    });

    useEffect(() => {
        if (currentUser && readyState === ReadyState.OPEN) {
            sendJsonMessage({
                userId,
                type: 'iduser',
            });
        }
    }, [sendJsonMessage, readyState, currentUser, userId]);
    const themeMode = useSelector(themeModeSelector);
    if (themeMode === true) {
        document.documentElement.style.setProperty('--background-color', '#060714');
        document.documentElement.style.setProperty('--text-color', '#FBFBFB');
        document.documentElement.style.setProperty('--white', '#0C0C1E');
    } else {
        document.documentElement.style.setProperty('--background-color', '#ebebeb');
        document.documentElement.style.setProperty('--text-color', '#161823');
        document.documentElement.style.setProperty('--white', '#f9f9f9');
    }
    return (
        <StateContext.Provider value={{ requestCallAPI, setRequestCallAPI }}>
            <Router>
                <div className="App">
                    {/* <MessengerCustomerChat pageId="118879814536428" appId="930949868024444" /> */}
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
