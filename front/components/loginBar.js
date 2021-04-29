import Link from 'next/link'

const LoginBars = () => (
    <div>
        <Link href="login"><a> LOGIN </a></Link>   |
        <Link href="register"><a> REGISTER </a></Link>
        
    </div>
)

export default LoginBars