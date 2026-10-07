import { ThemeToggle } from "../../Theme";
import "./google.scss";

import { useEffect } from "react";
import Typewriter from 'typewriter-effect/dist/core';


export default function Google() {
  
    useEffect(()=> {
        var input = document.getElementById('text_demo')
        var butt = document.getElementById('press');
        
var customNodeCreator = function(character) {
  // Add character to input placeholder
  input.value = input.value + character;

  // Return null to skip internal adding of dom node
  return null;
}

var onRemoveNode = function({ character }) {
  if(input.value) {
    // Remove last character from input placeholder
    input.value = input.value.slice(0, -1)
  }
}

var typewriter = new Typewriter(null, {
  loop: false,
  delay: 45,
  onCreateTextNode: customNodeCreator,
  onRemoveNode: onRemoveNode,
  // onanimationend : butt.form.submit()
});

var NavBar=document.getElementById("NavBar");
var temp=document.getElementById("g-logo");
var temp1=document.getElementById("temp1");
var temp2=document.getElementById("temp2");
var temp3=document.getElementById("temp3");
typewriter
.pauseFor(2500)
  .typeString('A creative Software developer')
  .pauseFor(100)
  .deleteAll()
  .typeString('Inquisitive data engineer who knows what to google ')
  .pauseFor(100)
  .deleteAll()
  .pauseFor(200)
  .callFunction(() =>{
    NavBar.style=" transform: translateY(-100px); transition: ease 2s;";
    temp.style=" transform: translateX(-1000px); transition: ease 2s;    overflow: hidden;";
    temp1.style=" transform: translateX(1000px); transition: ease 2s;    overflow: hidden;";
    temp2.style=" transform: translateY(1000px); transition: ease 2s; overflow:hidden;";
    temp3.style=" transform: translateY(1000px); transition: ease 2s;";
  })
  .pauseFor(2000)
  .callFunction(() => {
    console.log('All strings were deleted');
    butt.form.submit()

    // history.push('/intro');

  })
  .start();
return () => typewriter.stop();

} ,[]);
    return (
   <div className="bdy">

        <nav id="NavBar">
        <a href="mailto:varshilshah0203@gmail.com">Email</a>
        <a href="https://github.com/varshil1" target="_blank" rel="noreferrer">GitHub</a>
        <ThemeToggle />
        <a href="#/intro">Skip intro →</a>
    </nav>
    <section className="section-1">
        <img alt="" src="assets/img/logo.png" className="logo" id="g-logo"/>
        <form action="/#/intro" id="ok"><br/><br/>
            <div className="s-box">
              <div id="temp1">
                <img alt="" src="assets/img/search.svg" className="search-icon"/>
                <textarea aria-label="Portfolio introduction" readOnly placeholder="What are you looking for ?" className="s-input" id="text_demo"/>
                <img alt="" src="assets/img/vs.png" className="vs-icon"></img>
                </div>
                <div id="temp2">
                <input type="submit" id="press" className="s-btn" value="Google Search"/>
                <input type="submit" className="s-btn" value="I'm Feeling Lucky"/>
                </div>
            </div>
        </form>
        <div className="lang" id="temp3">
            Available for hire in:
            <span>United States</span>
        </div>
    </section>
    
    </div>
   )

   
}

