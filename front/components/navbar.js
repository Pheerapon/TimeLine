import Link from 'next/link'

const Navbar = () => (
    <div>
        <Link href="/myTimeline"><a> My Timeline </a></Link> |
        <Link href="/addTimeline"><a> Add Timeline </a></Link> |
        <Link href="/logout"><a> Logout </a></Link> 
        
    </div>
)

export default Navbar