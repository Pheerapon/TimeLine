import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import Logo from '../components/logo'
import Link from 'next/link'
import Loginbars from '../components/loginBar'
import tlAuth from '../components/tlAuth'
export default function Home({ token }) {
 
  return (
    <Layout>
    <Head>
        <title>First Page</title>
    </Head>

    <div className={styles.menuBar}>
      <div className={styles.logo}><Logo /></div>
      <div className={styles.loginBar}><Loginbars /></div>
    </div>

    <div className={styles.container}>
        <h1>HELLO</h1>
        <div><h2>Welcome to Time Line</h2></div> 
        <div><Link href="/login"><a><h3>LOGIN</h3></a></Link></div>
        or
        <div><Link href="/register"><a><h3>REGISTER</h3></a></Link></div>
        
        
    </div>
</Layout>
  )
}

// export default tlAuth

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
