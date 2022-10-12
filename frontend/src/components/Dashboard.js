import React from "react";
import Upload from "./Upload";
import Box from '@mui/material/Box';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const Dashboard = () => {
    return (
        <div className="App">
                <Box
                    sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    bgcolor: '#989D9E',
                    width: 1,
                    justifyContent: 'center',
                    pt: 4
                    }}
                    minHeight="100vh"
                    >
                    <Box
                        sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        maxWidth: 600,
                        }}
                        >
                        <Tabs>
                            <TabList>
                                <Tab>Upload</Tab>
                                <Tab>View Files</Tab>
                            </TabList>

                            <TabPanel>
                                <Upload/>
                            </TabPanel>
                            <TabPanel>
                                files
                            </TabPanel>
                        </Tabs>
                    </Box>
                </Box>
            </div>
    );
};
export default Dashboard;