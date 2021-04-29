import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/std.module.css'
import axios from 'axios'
import tlAuth from '../components/tlAuth'
import config from '../config/config'
import Logo from '../components/logo'
import Link from 'next/link'

const URL = `${config.URL}/timelines`
const editTimelines = ({ token }) => {

    const [timelines, setTimelines] = useState({
        list:
            [
                { id:"1", Day: "13", Month: "ม.ค.", Year: "2564", Time: "08.00", Place: "อยู่บ้าน" },
            ]
    })
    const [Day, setDay] = useState('')
    const [Month, setMonth] = useState('')
    const [Year, setYear] = useState('')
    const [Time, setTime] = useState('')
    const [Place, setPlace] = useState('')

    useEffect(() => {
        getTimelines()
    }, [])

    const getTimelines = async () => {
        let timeline = await axios.get(URL)
        setTimelines(timeline.data)
    }
    const printTimelines = () => {
        console.log('Timelines:', timelines)
        if (timelines.list && timelines.list.length)
            return (timelines.list.map((timeline, index) =>
            (<li key={index} className={styles.listItem}>
                Day : {(timeline) ? timeline.Day : '-'} <br></br>
                Month : {(timeline) ? timeline.Month : '-'}  <br></br>
                Year : {(timeline) ? timeline.Year : '-'}  <br></br>
                Time : {(timeline) ? timeline.Time : '-'} <br></br>
                Place : {(timeline) ? timeline.Place : '-'} 
                <button onClick={() => updateTimeline(timeline.id)} className={`${styles.button} ${styles.btnEdit}`}>Update</button>
                <button onClick={() => deleteTimeline(timeline.id)} className={`${styles.button} ${styles.btnDelete}`}> Delete </button>
            </li>)
            ))
        else {
            return (<h2>No timelines</h2>)
        }
    }

    const addTimeline = async (Day, Month, Year, Time, Place) => {
        
        if (Day !== ""){
            let result = await axios.post(URL, { Day, Month, Year, Time, Place})
            console.log(result.data)
            setTimelines(result.data)
        }
    }

    const deleteTimeline = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        setTimelines(result.data)
    }
    const updateTimeline = async (id) => {
        const result = await axios.put(`${URL}/${id}`, {
            Day,
            Month,
            Year,
            Time,
            Place
        })
        console.log('timeline id update: ', result.data)
        setTimelines(result.data)
    }

    return (
        <Layout>
            <Head>
                <title>Add Timelines</title>
            </Head>

            <div className={styles.menuBar}>
                <div className={styles.logo}><Logo /></div>
                <div className={styles.loginBar}><Navbar /></div>
             </div>

            <div className={styles.container}>
                {/* <h1>My Timeline</h1> */}
                
                {JSON.stringify(timelines.timelines)}
                {/* <ul className={styles.list}>
                    {printTimelines()}
                </ul> */}
                <h1>Add timeline</h1>
                <div className={styles.addTL}>
                    Day : <input type="text" onChange={(e) => setDay(e.target.value)} className={styles.input} />
                    Month : <input type="text" onChange={(e) => setMonth(e.target.value)} className={styles.input}/> 
                    Year : <input type="text" onChange={(e) => setYear(e.target.value)}className={styles.input} /> 
                    Time : <input type="text" onChange={(e) => setTime(e.target.value)} className={styles.input}/> 
                    Place : <input type="text" onChange={(e) => setPlace(e.target.value)} className={styles.input}/> 

                    <div className={styles.addBtn}>
                    <Link href="/myTimeline"><a><button onClick={() => addTimeline(Day, Month, Year, Time, Place)} className={`${styles.button} ${styles.btnAdd}`}>Add new timeline</button></a></Link>
                    </div>


                    
                </div>
            </div>
        </Layout>
    )
}

export default tlAuth(editTimelines)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}