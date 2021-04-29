import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import Logo from '../components/logo'
import LoginBars from '../components/loginBar'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }
 
    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>

            <div className={styles.menuBar}>
                <div className={styles.logo}><Logo /></div>
                <div className={styles.loginBar}><LoginBars /></div>
             </div>

            <div className={styles.container}>
                
                {/* <h1>Logout</h1> */}
                <div>
                    <h2> {status}  </h2>
                </div>
            </div>
        </Layout>
    )
}
