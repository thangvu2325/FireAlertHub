import { Fragment, createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layout';
import { useDispatch, useSelector } from 'react-redux';
// import MessengerCustomerChat from 'react-messenger-customer-chat';
import { currentUserSelector, sidebarWidthSelector, themeModeSelector } from './redux/selectors';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { fetchNodesData, setNodesValue } from './redux/nodesSlice';
import { fetchInboxsData } from './redux/inboxsSlice';
import { useMediaQuery } from 'react-responsive';
export const StateContext = createContext();
const WS_URL = 'ws://localhost:5000/';
function App() {
    const currentUser = useSelector(currentUserSelector);
    const dispatch = useDispatch();
    const userId = currentUser?._doc._id;
    const accessToken = currentUser?.accessToken;
    const checked = useSelector(sidebarWidthSelector);
    const [requestCallAPI, setRequestCallAPI] = useState(false);
    const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        },
        onMessage: (message) => {
            console.log(JSON.parse(message.data));
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
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    useEffect(() => {
        if (currentUser?.accessToken) {
            dispatch(fetchNodesData(userId, accessToken));
            dispatch(fetchInboxsData(userId, accessToken));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
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
        // document.documentElement.style.setProperty('--white', '#0C0C1E');
    } else {
        document.documentElement.style.setProperty('--background-color', '#3c2299');
        document.documentElement.style.setProperty('--text-color-menu', 'black');
        // document.documentElement.style.setProperty('--white', '#f9f9f9');
    }
    if (checked && !isTabletOrMobile) {
        document.documentElement.style.setProperty('--width-sidebar', '260px');
    } else if (isTabletOrMobile) {
        document.documentElement.style.setProperty('--width-sidebar', '0');
    } else {
        document.documentElement.style.setProperty('--width-sidebar', '70px');
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
