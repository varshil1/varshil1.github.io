import { ThemeToggle } from "../../Theme";
import "./topbar.scss"
import {Person,Mail,LinkedIn,GitHub,TrendingUp} from "@material-ui/icons"

export default function Topbar({menuOpen,setMenuOpen}) {
    return (
        <div className={"topbar " + (menuOpen && "active")}>
            <div className="wrapper">
                <div className="left">
                    <a href="#/intro" aria-label="Back to introduction" onClick={(event) => { event.preventDefault(); document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" }); }}><div className="logo">
                    <svg className="brand-mark" viewBox="-1 -7 47 48" fill="none" aria-hidden="true">


<path d="M22.436 34.5812L8.5506 28.3569V14.9043V1.15059L1 4.56392H4.1994V30.4149L22.436 38.6471L40.9286 30.4651V4.51373H44L36.3214 1V28.4071L22.436 34.5812Z" stroke="currentColor"/>
<path d="M29.261 17.1883L11 9.48276V-0.218833L22.5 -5L34 -0.125995V13.382L26.1016 10.0398H29.261V1.68435L22.5 -1.14721L15.6758 1.73077V7.57958L34 15.4244V25.126L22.3736 30L11 25.0796V11.4324L18.7088 14.6817H15.6758V23.1764L22.3736 26.0544L29.261 23.0371V17.1883Z" stroke="currentColor"/>
</svg>
  
</div></a>
                    <div className="itemContainer">
                        <Person className="icon"/>
                        <span>+1 (602)-517-2465</span>
                    </div>
                    <div className="itemContainer">
                        <LinkedIn className="icon"/>
                        <span><a href="https://www.linkedin.com/in/varshil-shah-505610187/" target="_blank" rel="noreferrer">/varshil-shah-505610187/</a></span>
                    </div>
                    <div className="itemContainer">
                        <Mail className="icon" />
                        <span><a href="mailto:varshilshah0203@gmail.com" target="_blank" rel="noreferrer">varshilshah0203@gmail.com</a></span>
                    </div>
                    <div className="itemContainer">
                        <GitHub className="icon" />
                        <span><a href="https://github.com/varshil1" target="_blank" rel="noreferrer">/varshil1</a></span>
                    </div>
                    <div className="itemContainer">
                        <TrendingUp className="icon" />
                        <span><a href="assets/resume.pdf" download="Varshil-Shah-Resume.pdf">My CV</a></span>
                    </div>
                </div>
                <div className="right">
                    <ThemeToggle /><button type="button" className="hamburger" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={()=>setMenuOpen(value => !value)}>
                        <span className="line1"></span>
                        <span className="line1"></span>
                        <span className="line1"></span>
                    </button>
                </div>
            </div>
        </div>
    )
}



