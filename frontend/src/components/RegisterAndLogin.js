import React, { useEffect, useContext, useState } from "react";
import { AccountContext } from "./Account";
import { Account } from "./Account";
import Signup from "./Signup";
import Login from "./Login"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default () => {
    const {getSession} = useContext(AccountContext);

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        getSession().then(() => {
            setLoggedIn(true);
            
        });
    }, []);



    return (
        <div>
            {!loggedIn && (
                <>
                <Tabs>
                <TabList>
                    <Tab>Register</Tab>
                    <Tab>Login</Tab>
                </TabList>

                <TabPanel>
                    <Account>
                    <Signup/>
                    </Account>
                </TabPanel>
                <TabPanel>
                    <Account>
                    <Login/>
                    </Account>
                </TabPanel>
              </Tabs>
            </>
            )}
        </div>
    );
};