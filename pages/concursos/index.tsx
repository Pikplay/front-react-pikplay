import React, { useState } from 'react'
import { Box, Card, Tab, Tabs, Typography } from '@material-ui/core'
import Layout from '../../src/components/layout/Layout'
import CompetitionsList from './components/Competitions'
import styles from './styles.module.scss'

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
        <section className={styles.CompetitionsComponent}>
            <Layout title="Concursos">
                <div className={`page`}>
                    <Card>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label='basic tabs example'
                            indicatorColor='primary'
                        >
                            <Tab label='Listado de Concursos' />
                            <Tab label='Mis Concursos' />
                            <Tab label='Crear Concurso' />
                        </Tabs>

                        <TabPanel value={value} index={0}>
                            <CompetitionsList />
                        </TabPanel>
                    </Card>
                </div>
            </Layout>
        </section>
    )
}

export default ConcursosPage
