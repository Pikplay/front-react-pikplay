import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Box, Card, Tab, Tabs, Typography } from '@material-ui/core'
import CompetitionsList from './components/Competitions'

const ConcursosPage = () => {
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function TabPanel(props) {
        const { children, value, index, ...other } = props

        return (
            <div
                role='tabpanel'
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        )
    }

    return (
        <Layout title="Concursos">
            <section className={`page`}>
                <Card>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='basic tabs example'
                        indicatorColor='primary'
                    >
                        <Tab label='Mis Concursos' />
                        <Tab label='Crear Concurso' />
                    </Tabs>

                    <TabPanel value={value} index={0}>
                        <CompetitionsList />
                    </TabPanel>
                </Card>
            </section>
        </Layout>
    )
}

export default ConcursosPage
