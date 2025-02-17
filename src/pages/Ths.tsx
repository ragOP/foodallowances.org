import React, { useState, useEffect } from "react";
//@ts-ignore
import TagManager from "react-gtm-module";
import axios from "axios";
import "./styles.scss";

import { scrollTo } from "../utils";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head_bg from "../assets/emily.png";
import {  Link } from 'react-router-dom';
import Headline from "../assets/emily.png";

// google tag manager

const tagManagerArgs = {
  gtmId: "GTM-KZJBC3B",
};

// TagManager.initialize(tagManagerArgs);

export default function Tsf() {

  const SlideUp = cssTransition({
    enter: "toast-enter",
    exit: "toast-exit",
  });
  
  const messages = [
    "Emily A. Rodriguez from Miami, FL just qualified for a $3,900 Food Allowance.",
    "Michael D. Johnson from Dallas, TX just qualified for a $3,900 Food Allowance.",
    "Sophia L. Thompson from Los Angeles, CA just qualified for a $3,900 Food Allowance.",
    "Ethan M. Baker from Chicago, IL just qualified for a $3,900 Food Allowance.",
    "Ava K. Campbell from Seattle, WA just qualified for a $3,900 Food Allowance."
  ];
  
  // Function to shuffle array in place
  const shuffleArray = (array:any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  
  shuffleArray(messages);
  
  const notify = (message:any) => {
    // Dismiss all existing toasts
    toast.dismiss();
    let boldedMessage = message;
  
    // Make the word "Allowance" bold in all lines
    boldedMessage = boldedMessage.replace(
      /\$3,900 Food Allowance/g,
      '<strong class="green-bold">$900 Food Allowance</strong>'
    );
  
    // Make specific dollar amounts bold only in specific lines
    const specialAmounts = ["$16,800", "$16,800", "$16,800", "$16,800"];
    specialAmounts.forEach((amount) => {
      if (message.includes(amount)) {
        boldedMessage = boldedMessage.replace(
          amount,
          `<strong class="green-bold">${amount}</strong>`
        );
      }
    });
  
    // Show new toast
    toast(<div dangerouslySetInnerHTML={{ __html: boldedMessage }} />, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
    });
  };
  
  useEffect(() => {
    const delayedEffect = setTimeout(() => {
      const showRandomToast = () => {
        const randomTime = 20000;
        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];
        notify(randomMessage);
        return randomTime;
      };
  
      // Show the first toast
      let nextTime = showRandomToast();
  
      // Set up a recurring timer
      const timer = setInterval(() => {
        nextTime = showRandomToast();
      }, nextTime);
  
      // Cleanup
      return () => {
        clearInterval(timer);
      };
    }, 20000); // 6-second delay before the useEffect code runs
  
    // Cleanup for the setTimeout
    return () => {
      clearTimeout(delayedEffect);
    };
  }, []);
  
  // const [zipCode, setZipCode] = useState("");
  // useEffect(() => {
  //   const fetchUserLocation = async () => {
  //     try {
  //       const response = await axios.get("https://ipapi.co/json/");
  //       console.log('response',response.data);
  //       setZipCode(response.data.postal);
  //     } catch (error) {
  //       console.error("Error fetching user location:", error);
  //     }
  //   };

  //   fetchUserLocation();
  // }, []);
  useEffect(() => {
    window.document.title = "Senior's Allowance Program 2024";

    axios
      .get(process.env.REACT_APP_PROXY + `/visits/8`)
      .then(({ data }) => {
        if (data.length === 0) {
          const visits = {
            visits: 1,
            views: 0,
            calls: 0,
            positives: 0,
            negatives: 0,
          };

          axios
            .post(
              process.env.REACT_APP_PROXY + `/visits/create-visits8`,
              visits
            )
            .catch((err) => console.log(err));
        } else {
          const _id = data[0]._id;
          const _visits = data[0].visits;
          const _views = data[0].views;
          const _calls = data[0].calls;
          const _positives = data[0].positives;
          const _negatives = data[0].negatives;

          const visits = {
            visits: _visits + 1,
            views: _views,
            calls: _calls,
            positives: _positives,
            negatives: _negatives,
          };
          axios
            .put(
              process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
              visits
            )
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCall = () => {
    getButtonClick({ buttonId: 5 })
    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls + 1,
        positives: _positives,
        negatives: _negatives,
      };
      axios
        .put(
          process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
          visits
        )
        .catch((err) => console.log(err));
    });
  };

  const [quiz, setQuiz] = useState("Are you over the age of 64?  ");
  const [step, setStep] = useState("process");
  const [min, setMin] = useState(3);
  const [second, setSecond] = useState<any>(0);
  const [yes,setYes]=useState("YES, I'M 65 OR OLDER")
  const [no,setNo]=useState("NO, I'M 64 OR YOUNGER")
  

  const stepProcess = () => {
    if (step === "Reviewing Your Answers...") {
      setTimeout(() => {
        setStep("Matching With Best Options...");
      }, 1500);
    }
    if (step === "Matching With Best Options...") {
      setTimeout(() => {
        setStep("Confirming Eligibility...");
      }, 1500);
    }
    if (step === "Confirming Eligibility...") {
      setTimeout(() => {
        setStep("completed");

        axios
          .get(process.env.REACT_APP_PROXY + `/visits/8`)
          .then(({ data }) => {
            const _id = data[0]._id;
            const _visits = data[0].visits;
            const _views = data[0].views;
            const _calls = data[0].calls;
            const _positives = data[0].positives;
            const _negatives = data[0].negatives;
            const visits = {
              visits: _visits,
              views: _views + 1,
              calls: _calls,
              positives: _positives,
              negatives: _negatives,
            };
            axios
              .put(
                process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
                visits
              )
              .catch((err) => console.log(err));
          });
      }, 1500);
    }

    if (step === "completed") {
      const startTime: any = new Date();
      const timer = setInterval(() => {
        const nowTime: any = new Date();
        setSecond((180 - Math.round((nowTime - startTime) / 1000)) % 60);
        setMin(
          Math.floor((180 - Math.round((nowTime - startTime) / 1000)) / 60)
        );
      }, 1000);
    }
  };

  useEffect(() => {
    stepProcess();
  }, [step]);

  const topScroll = (id: any) => {
    scrollTo({ id });
  };

  const handleQuizP = () => {
    topScroll("btn");
    if (quiz === "Are you over the age of 64?  ") {
      setYes("Yes")
      setNo("No")
      setQuiz("Are You Currently Enrolled in Medicare Part A or Part B?");
        getButtonClick({ buttonId: 1 })
    } else {
      setStep("Reviewing Your Answers...");
     
      topScroll("top");
       getButtonClick({ buttonId: 3 })
    }

    axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
      const _id = data[0]._id;
      const _visits = data[0].visits;
      const _views = data[0].views;
      const _calls = data[0].calls;
      const _positives = data[0].positives;
      const _negatives = data[0].negatives;
      const visits = {
        visits: _visits,
        views: _views,
        calls: _calls,
        positives: _positives + 1,
        negatives: _negatives,
      };
      axios
        .put(
          process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
          visits
        )
        .catch((err) => console.log(err));
    });
  };

  const [rgbaTags, setRgbaTags] = useState(
    (window as any)._rgba_tags || [] // Temporary assertion for _rgba_tags
  );
  
  // Function to append the parameter to the URL
  // Function to append the parameter to the URL
  const appendToURL = (param: string, value: string) => {
    let url = window.location.href;
    const hashIndex = url.indexOf('#');
    let hash = '';

    // Check and save hash part of the URL
    if (hashIndex !== -1) {
      hash = url.substring(hashIndex);
      url = url.substring(0, hashIndex);
    }

    const newParam = `${param}=${encodeURIComponent(value)}`;
    if (url.includes('?')) {
      if (url.includes(`${param}=`)) {
        const regex = new RegExp(`${param}=[^&]*`);
        url = url.replace(regex, newParam);
      } else {
        url += `&${newParam}`;
      }
    } else {
      url += `?${newParam}`;
    }

    // Update the URL without reloading the page
    window.history.pushState(null, '', url + hash);
  };


  const handleQuizN = () => {
    if (quiz === "Are you over the age of 64?  ") {
      // Transition to the second question when "NO" is clicked on the first question
      setQuiz("Are You Currently Enrolled in Medicare Part A or Part B?");
      // Set the options for the second question (Yes and No)
      setYes("Yes");
      setNo("No");
        getButtonClick({ buttonId: 2 })
    } else if (quiz === "Are You Currently Enrolled in Medicare Part A or Part B?") {
      // Logic for when the "NO" button is pressed on the second question
      appendToURL('ab', 'no');
      console.log('Before updating _rgba_tags:', window._rgba_tags);
      // Scroll to the "NO" button section
      window._rgba_tags[0] = {"ab":"no"}
      window._rgba_tags.push({
      "ab": "no"
  });
  console.log('After updating _rgba_tags:', window._rgba_tags);
      // Update the _rgba_tags array
      // const updatedTags = [...rgbaTags, { ab: 'no' }];
      // setRgbaTags(updatedTags);
      // (window as any)._rgba_tags = updatedTags;
  
      // Scroll to the "NO" button section
      topScroll("btn");
  
      // Update quiz state for next question or review step
      setStep("Reviewing Your Answers...");
      topScroll("top");
        getButtonClick({ buttonId: 4 })
  
      // Update visit data using Axios
      axios.get(process.env.REACT_APP_PROXY + `/visits/8`).then(({ data }) => {
        const _id = data[0]._id;
        const _visits = data[0].visits;
        const _views = data[0].views;
        const _calls = data[0].calls;
        const _positives = data[0].positives;
        const _negatives = data[0].negatives;
        const visits = {
          visits: _visits,
          views: _views,
          calls: _calls,
          positives: _positives,
          negatives: _negatives + 1,  // Increment negative count
        };
        axios
          .put(
            process.env.REACT_APP_PROXY + `/visits/update-visits8/` + _id,
            visits
          )
          .catch((err) => console.log(err));
      });
    }
  };
 const websiteViewCount = async () => {
    await fetch("https://anlyatical-dashboard.onrender.com/api/website", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "websiteId": 102,
        "websiteName": "foodallowances.org/engmed-ths",
      }),
    });
  }

  ///'''''

  const getButtonClick = async ({ buttonId }: { buttonId: number }) => {
    await fetch("https://anlyatical-dashboard.onrender.com/api/button", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "websiteId": 102,
        "buttonId": buttonId,
      }),
    });
  }

  useEffect(() => {
    websiteViewCount()
  }, [])


  const handleSession = async () => {
  
    const generateSessionId = () => {
      return 'session-' + Math.random().toString(36).substr(2, 9);
    };

    const sessionId = generateSessionId();
    async function endSession() {
      const response = await axios.post('https://anlyatical-dashboard.onrender.com/api/website', { websiteId: 102, sessionId });
      console.log('Session ended. Duration:', response.data.duration, 'seconds');
    }

    try {
      // Start the session
      await axios.post('https://anlyatical-dashboard.onrender.com/api/website', { websiteId:102, sessionId });
      console.log('Session started');

      // Record an interaction
      await axios.post('https://anlyatical-dashboard.onrender.com/api/website', { websiteId:102, sessionId });
      console.log('Interaction recorded');

      // End the session after 5 seconds
      window.addEventListener('beforeunload', endSession);

      setTimeout(endSession, 5000);

      return () => {
        endSession();
        window.removeEventListener('beforeunload', endSession);
      };

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    handleSession();
  }, []);
  useEffect(()=>{
    const url = window.location.href.split('?')[0]; // Remove query params from URL
    window.history.replaceState(null, '', url);
  },[])
  return (
    <div>
{/*      <ToastContainer /> */}
      <div style={{marginBottom:'4px'}} className="top-sticky-blue-test2" id="top">
      Senior's Allowance Program 2025
      </div>
      {step === "process" ? (
        <>
          <div className="main-container-5">
            <div className="main-descrition-5-5">
              <div className="main-des-title-6-7">
                <b>
Seniors On Medicare Can Claim Their Food Allowance Card Worth Thousands Of Dollars!
                </b>
              </div>
              {/* <img className='topic-img-larger' src = {Headline} alt = "head"/> */}
              <img className="topic-img-middle-z" src={Head_bg} alt="head" />
              <div  style={{marginTop:'14px'}}className="main-des-5">
Eligible Americans are taking advantage of this opportunity to secure their Food Allowance Card, which covers the cost of groceries, rent, bills, and other monthly expenses.

              </div>
              <div className="main-des-5"  style={{marginTop:'-5px'}}>
Use your allowance card at your favorite places like Walmart, Target, CVS, and many more. Answer the questions below to check your eligibility now!
              </div>
              {/* <div className='main-des-5' style = {{marginTop:"1rem"}}><b>Simplemente responda las siguientes preguntas:</b></div> */}
            </div>
            <div style={{marginTop:'-5px'}} className="survey">
              <div className="quiz-5" id="btn">
                {quiz}
              </div>
              <div  className="answer">
                <div className="answer-btn-5" onClick={handleQuizP}>
              {yes}
                </div>
                <div className="answer-btn-5" onClick={handleQuizN}>
              {no}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : step !== "process" && step !== "completed" ? (
        <div className="checking" style={{ fontWeight: "700" }}>
          {step}
        </div>
      ) : (
        <div className="checking">
          <div className="congrats">Congratulations, You Qualify!</div>
          <div className="top-description-5">
            Make A <b>Quick Call</b> To Claim Your Food Allowance!
          </div>
          <div className="spots-count">Spots remaining: 4</div>
          <div className="tap-direction">👇 TAP BELOW TO CALL 👇</div>
          <a href="tel:+16142658802">             <div className="call-btn" onClick={handleCall}>            CALL (323) 689-7861           </div>           </a>
          <div className="sub-description">
          Make sure to ask for medicare benefit for your area in order to receive the <b> Highest Possible Allowance.</b>
          </div>
          <div className="sub-title">We Have Reserved Your Spot</div>
          <div className="sub-description">
            Due to high call volume, your official agent is waiting for only{" "}
            <b>3 minutes</b>, then your spot will not be reserved.
          </div>
          <div className="timer">
            <div className="timer-cell">{min}</div>
            <div className="timer-cell">:</div>
            <div className="timer-cell">{second}</div>
          </div>
        </div>
      )}
       <div className="footer2">
      
        <div className="terms2">

        <Link to="/terms-and-conditions">Terms & Conditions</Link> | 
        <Link to="/privacy-policy">Privacy Policy</Link>
        </div>
        <div>
        
        <hr/>
        </div>
        <div className="copyright">
          
        
        </div>

{/* <p>G2 Licensed Agent : Gregory K. Teipelz</p> */}
        {/* <p>{zipCode} </p> */}
      </div>
{/*       <ToastContainer
        position="bottom-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </div>
  );
}
