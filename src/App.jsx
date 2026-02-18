import { useState, useEffect,useRef } from "react";



/* 🌸 GLOBAL FLOATING HEARTS */
function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="heart"
          style={{
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 6 + "s",
          }}
        >
          💖
        </div>
      ))}
    </div>
  );
}

/* 🚀 Loading Screen */
function LoadingScreen() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-200 via-yellow-100 to-orange-200">

      {/* Plane */}
      <div
        className="absolute animate-fly flex items-center"
        style={{ top: "40%" }}
      >
        <div className="star star1">✨</div>
        <div className="star star2">⭐</div>
        <div className="star star3">💖</div>

        <img src="/hello.png" className="w-44 z-10" />
      </div>

      <p className="text-pink-500 font-bold text-lg mt-40 animate-fade">
        Loading something special for you 💖
      </p>
    </div>
  );
}

/* 💌 Intro Screen */
function IntroScreen({ onNext }) {
  return (
   <div className="fixed inset-0 
  bg-gradient-to-br from-[#cdcdd8] via-[#cbd0d4] to-[#c6c9ce]
  flex items-center justify-center
  min-h-screen
  pt-6
  overflow-hidden">




      <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-3xl w-full text-center">

        <p className="text-orange-400 italic mb-2">
          welcome to my little thought...
        </p>

        <h1 className="
text-5xl font-extrabold text-orange-500
drop-shadow-[0_0_12px_rgba(255,120,0,0.6)]
animate-pulse
">
  Hey You 💖💖
</h1>


        <div className="bg-green-100 p-6 rounded-2xl shadow-xl max-w-md mx-auto">

          <p className="mb-3 text-gray-700">
            I wanted to do a tiny something
            because you mean a lot to me.
          </p>

          <p className="text-pink-400 italic mb-4">
            Tap below, okay? ✨
          </p>

          <button
            onClick={onNext}
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition"
          >
            Open This 💖 →
          </button>

        </div>

      </div>

    </div>
  );
}



import { motion } from "framer-motion";

function CakePage({ onNext }) {
  const [stage, setStage] = useState("build");
  const [blown, setBlown] = useState(false);
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);

  /* BUILD SEQUENCE */
  useEffect(() => {
    setTimeout(() => setStage("cream"), 1200);
    setTimeout(() => setStage("candles"), 2400);
  }, []);

  /* START MIC */
  useEffect(() => {
    if (stage === "candles") startMic();
  }, [stage]);

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const mic = audioCtx.createMediaStreamSource(stream);
      mic.connect(analyser);

      analyserRef.current = analyser;
      audioCtxRef.current = audioCtx;
      detectBlow();
    } catch {
      alert("🎤 Allow microphone to blow candles");
    }
  };

  const detectBlow = () => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const volume = data.reduce((a, b) => a + b, 0) / data.length;

    if (volume > 65 && !blown) {
      setBlown(true);
      audioCtxRef.current?.close();
      setTimeout(() => setStage("done"), 800);
      setTimeout(() => onNext(), 4500);
      return;
    }
    requestAnimationFrame(detectBlow);
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-pink-200 via-rose-100 to-yellow-100 overflow-hidden relative">

      {/* 🎉 FULL SCREEN CONFETTI */}
      {stage === "done" && (
  <div className="fixed inset-0 pointer-events-none z-50">
    {[...Array(180)].map((_, i) => (
      <span
        key={i}
        className="party-burst"
        style={{
  left: Math.random()*100+"%",
  width: 6 + Math.random()*8 + "px",
  height: 14 + Math.random()*10 + "px",
  background:`hsl(${Math.random()*360},80%,60%)`,
  animationDelay: Math.random()*0.5+"s"
}}
      />
    ))}
  </div>
)}


      <div className="relative z-20 flex flex-col items-center justify-center">

        <h1 className="text-4xl font-bold text-pink-500 mb-16 md:mb-20">
  It’s Cake Time 🎂
</h1>



        {/* Cake Stack */}
        <div className="relative flex flex-col items-center">
          
          

  {/* Candles */}
  {stage === "candles" && (
  <div className="candles absolute -top-16">
    {[1,2,3,4].map(i => (
      <div
        key={i}
        className="candle cursor-pointer active:scale-95 transition"
        onClick={() => {
          if (!blown) {
            setBlown(true);
            audioCtxRef.current?.close();
            setTimeout(() => setStage("done"), 600);
            setTimeout(() => onNext(), 4500);
          }
        }}
      >
        <div className="wax-drop"></div>
        {!blown && <div className="flame"></div>}
      </div>
    ))}
  </div>
)}

  {/* Cake Body Wrapper */}
  <div className="relative flex flex-col items-center">


 <div className="relative flex flex-col items-center">

{/* 🔥 MELT MUST BE INSIDE TOP LAYER */}
    {stage !== "build" && (
    <motion.div
      className="cream"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
      </motion.div>
    )}
  {/* Top Layer */}
  <motion.div
    className="layer layer1 relative"
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ duration: 0.5 }}
  >
  </motion.div>
   
  {/* Bottom Layer */}
  <motion.div
    className="layer layer2"
    initial={{ scaleY: 0 }}
    animate={{ scaleY: stage !== "build" ? 1 : 0 }}
    transition={{ duration: 0.5 }}
  />

</div>


  </div>

  {/* Plate */}
  <motion.div
    className="plate mt-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  />

</div>

        <h2 className="mt-8 text-2xl font-bold text-pink-500">
          Happy Birthday Lovie 🎉
        </h2>

        <p className="text-sm text-gray-600 mt-2 animate-pulse text-center">
  🎤 Blow near mic or 👆 tap candles to cut the cake 🎂
</p>
        {/* 🎁 Glass Next Button */}
{stage === "done" && (
  <button
    onClick={onNext}
    className="mt-8 px-8 py-3 rounded-full
    bg-white/20 backdrop-blur-xl
    border border-white/30
    text-pink-600 font-bold
    shadow-[0_0_25px_rgba(255,105,180,0.5)]
    hover:scale-105 transition-all duration-300"
  >
    Next Surprise ✨ →
  </button>
  )}
      </div>

      <style>{`
        .plate{
          width:260px;height:22px;
          background:linear-gradient(to right,#fff,#e5e5e5);
          border-radius:50px;margin-top:18px;
          box-shadow:0 12px 30px rgba(0,0,0,0.25);
        }

        .layer{
          width:220px;
          transform-origin:bottom;
          position:relative;
        }
        .layer1{
          height:70px;
          background:linear-gradient(#ff7aa2,#ff3e78);
          border-radius:14px 14px 0 0;
          z-index:2;
        }
        .layer2{
          height:60px;
          background:linear-gradient(#ffc2d1,#ff8fab);
          border-radius:0 0 20px 20px;
        }

        .cream{
          width:220px;background:white;
          border-radius:0 0 20px 20px;
          position:relative;
        }
        .drip{
          position:absolute;width:22px;height:30px;
          background:white;border-radius:0 0 20px 20px;
          animation:drip 2s infinite ease-in-out;
        }
        .drip1{left:40px;animation-delay:0.2s;}
        .drip2{left:100px;animation-delay:0.5s;}
        .drip3{left:160px;animation-delay:0.8s;}

        @keyframes dripReal{
  0%{
    transform: translateY(-4px) scaleY(0.6);
    opacity:0.9;
  }
  40%{
    transform: translateY(6px) scaleY(1.15);
    opacity:1;
  }
  70%{
    transform: translateY(14px) scaleY(1);
    opacity:0.95;
  }
  100%{
    transform: translateY(18px) scaleY(0.95);
    opacity:0.9;
  }
}


        .candles{
  display:flex;
  gap:24px;
  position:absolute;
  top:-55px; /* was -80px */
}

        .candle{
          width:16px;height:56px;background:#ff4d6d;
          border-radius:8px;position:relative;
          box-shadow:0 0 12px rgba(255,0,90,0.6);
        }

        .wax-drop{
          position:absolute;width:10px;height:16px;
          background:#ff6b81;border-radius:50%;
          top:14px;left:3px;
          animation:wax 2.5s infinite ease-in-out;
        }
        @keyframes wax{
          0%{transform:translateY(0);opacity:0.8;}
          50%{transform:translateY(14px);opacity:1;}
          100%{transform:translateY(0);opacity:0.6;}
        }

        .flame{
          position:absolute;top:-20px;left:-2px;
          width:20px;height:20px;background:orange;
          border-radius:50%;
          box-shadow:0 0 30px orange;
          animation:flicker 0.3s infinite alternate;
        }
        @keyframes flicker{
          from{transform:scale(1);}
          to{transform:scale(1.25);}
        }

        .confetti{
          position:absolute;top:-10px;width:8px;height:18px;
          animation:confettiFall 3s linear forwards;
        }
        @keyframes confettiFall{
          to{transform:translateY(100vh) rotate(720deg);opacity:0;}
        }
          .cream{
  width:220px;
  height:30px;
  background:white;
      

  /* 🔥 reverse shape */
  border-radius:20px 20px 0 0;  /* top round, bottom flat */

  position:absolute;
  top:-10px;     /* adjust if needed */
  left:0;
  z-index:5;
}
  .drip{
  border-radius: 0 0 16px 16px; /* bottom only round */
}
.drip{
  position:absolute;
  width:18px;
  height:26px;
  background:white;
  border-radius:0 0 18px 18px;
  top:0;                /* cream top nundi start avvali */
  animation:dripReal 3s ease-in-out infinite;
  filter: blur(0.2px);
}
.drip1{left:40px; animation-delay:0.4s;}
.drip2{left:100px; animation-delay:0.8s;}
.drip3{left:160px; animation-delay:1.2s;}

.party-burst{
  position:absolute;
  top:-20px;
  width:10px;
  height:18px;
  border-radius:4px;
  animation:burstFall 3.5s linear forwards;
}

@keyframes burstFall{
  to{
    transform:translateY(110vh) rotate(720deg) scale(0.8);
    opacity:0;
  }
}


      `}</style>
    </div>
  );
}




function TravelPage({ onNext }) {
  
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [showWaitPopup, setShowWaitPopup] = useState(false);


  const [showDoor, setShowDoor] = useState(false);
  const [openDoor, setOpenDoor] = useState(false);
  const [km, setKm] = useState(0);
  const [speed, setSpeed] = useState(0);

  const romanticMusic = useRef(new Audio("/romantic.mp3"));
  const windSound = useRef(new Audio("/wind.mp3"));
  

  /* KM + SPEED SIMULATION */
  useEffect(() => {
    let interval;

    if (!showDoor) {
      interval = setInterval(() => {
        setKm(prev => (prev < 622 ? prev + 3 : 622));
        setSpeed(450 + Math.floor(Math.random() * 80));
      }, 200);
    }

    return () => clearInterval(interval);
  }, [showDoor]);

  /* Detect Video End Properly */
  const handleVideoEnd = () => {
  // Step 1: show wait popup + blur
  setShowWaitPopup(true);

  // Step 2: after 2 sec show door
  setTimeout(() => {
    setShowWaitPopup(false);
    setShowDoor(true);
  }, 2000);

};

  const handleDoorClick = () => {
  setOpenDoor(true);

  windSound.current.play();
  romanticMusic.current.volume = 0.5;
  romanticMusic.current.play();

  setTimeout(() => {
    onNext();
  }, 500); // 0.5 sec smooth fade
};


  return (
    <div className="fixed inset-0 
                bg-gradient-to-br 
                from-[#050510] 
                via-[#0d1b2a] 
                to-[#1b263b] 
                flex items-center 
                justify-center 
                overflow-hidden">

      {/* TOP DECOR */}
      <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-pink-500/20 to-transparent"></div>

      {/* BOTTOM DECOR */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-purple-600/20 to-transparent"></div>


      {/* VIDEO */}
    {/* 🎥 Center Cinematic Video Box */}
<div
  className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-500 ${
    showWaitPopup ? "blur-md scale-95" : ""
  }`}
>


  <div className="
    relative 
    w-[85%] max-w-[700px]   /* width increase */
    aspect-[4/3]            /* 🔥 4:3 box ratio */
    rounded-3xl 
    overflow-hidden
    shadow-2xl
    border border-white/10
    bg-black/40 backdrop-blur-md
  ">

    <video
  ref={videoRef}
  src="/travel.mp4"
  className="w-full h-full object-cover"
  playsInline
  onEnded={handleVideoEnd}
/>


    {/* Cinematic dark overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>

  </div>




  {/* ▶ Tap Overlay */}
  {!started && (
    <div
     onClick={() => {
  if (videoRef.current) {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setStarted(true);

    // 👇 show rotate hint only for mobile
    if (window.innerHeight > window.innerWidth) {
      setShowRotateHint(true);
      setTimeout(() => setShowRotateHint(false), 3000);
    }
  }
}}

      className="absolute inset-0 flex items-center justify-center cursor-pointer z-30"
    >
      
      {/* Blur Background */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

    {/* Popup Card */}
    <div className="relative bg-white/90 rounded-2xl px-8 py-6 shadow-2xl text-center animate-fade">
      <p className="text-xl font-bold text-pink-600">
        Hold on… 💖
      </p>
      <p className="text-gray-600 mt-2">
        Preparing something special for you ✨
      </p>
      <button className="bg-pink-200 backdrop-blur-md text-pink-900 px-5 py-2 rounded-xl border border-pink-300 shadow">

        Tap chey 💌
      </button>
    </div>
      
    </div>
  )}



  {/* 🌌 Night Sky Stars */}
<div className="absolute inset-0 z-0 pointer-events-none">
  {[...Array(60)].map((_, i) => (
    <div
      key={i}
      className="absolute bg-white rounded-full opacity-80 animate-pulse"
      style={{
        width: Math.random() * 3 + 1 + "px",
        height: Math.random() * 3 + 1 + "px",
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        animationDuration: 2 + Math.random() * 3 + "s",
      }}
    />
  ))}
</div>

{/* Background Stars */}
<div className="absolute inset-0 overflow-hidden z-0">
  {[...Array(40)].map((_, i) => (
    <div
      key={i}
      className="star-particle"
      style={{
        left: Math.random() * 100 + "%",
        top: Math.random() * 100 + "%",
        animationDelay: Math.random() * 5 + "s"
      }}
    />
  ))}
</div>


</div>
         {/* ⏳ Wait Popup */}
{showWaitPopup && (
  <div className="fixed inset-0 z-40 flex items-center justify-center">
    
    {/* Blur Background */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

    {/* Popup Card */}
    <div className="relative bg-white/90 rounded-2xl px-8 py-6 shadow-2xl text-center animate-fade">
      <p className="text-xl font-bold text-pink-600">
        Just a Sec..💖
      </p>
    </div>

  </div>
)}

      {/* DOOR AFTER VIDEO ENDS */}
      {showDoor && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    <div 
      className={`absolute inset-0 bg-black transition-opacity duration-1000 ${
        openDoor ? "opacity-0" : "opacity-80"
      }`}
    />
    

    <div 
      className={`door-wrapper ${openDoor ? "open" : ""}`}
      onClick={handleDoorClick}
    >

      <div className="door-left"></div>
      <div className="door-right"></div>

      {!openDoor && (
  <div className="absolute inset-0 flex items-center justify-center">
    <p className="text-white text-2xl md:text-3xl font-bold animate-pulse text-center">
      <button className="bg-pink-200 backdrop-blur-md text-pink-900 px-5 py-2 rounded-xl border border-pink-300 shadow">
       Tap To Open 🚪✨
      </button>
    </p>
  </div>
)}


      {openDoor && <div className="light-burst"></div>}

    </div>

  </div>

      )}

    </div>
  );
}

/* 💖 STYLE SELECTION PAGE */
function StyleSelectionPage({ onSelect }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center
      bg-gradient-to-br from-[#050510] via-[#0d1b2a] to-[#1b263b] text-white">

      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-pink-400">
          Choose Your Letter Style 💌
        </h1>

        <p className="opacity-70">
          Every queen deserves a special reveal 👑
        </p>

        <div className="grid grid-cols-2 gap-6 mt-8">
          
          <button onClick={() => onSelect("royal")}
            className="style-btn">👑 Royal Scroll</button>

          <button onClick={() => onSelect("glass")}
            className="style-btn">🧊 Glass Letter</button>

          <button onClick={() => onSelect("musical")}
            className="style-btn">🎵 Musical Reveal</button>

          <button onClick={() => onSelect("starry")}
            className="style-btn">🌌 Starry Night</button>
          
          
        </div>
      </div>
    </div>
  );
}
function ChooseLetterStyle({ onSelect }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center
    bg-gradient-to-br from-[#050510] via-[#0d1b2a] to-[#1b263b] text-white">

      <h1 className="text-4xl font-bold mb-10 text-pink-400">
        Choose Your Letter Style 💌
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <button onClick={() => onSelect("royal")} className="style-btn">👑 Royal Scroll</button>
        <button onClick={() => onSelect("glass")} className="style-btn">🧊 Glass Letter</button>
        <button onClick={() => onSelect("music")} className="style-btn">🎵 Musical Reveal</button>
        <button onClick={() => onSelect("starry")} className="style-btn">🌌 Starry Night</button>
    <button
  onClick={() => onSelect("seal")}
  className="fixed bottom-6 right-6 z-50
  bg-gradient-to-r from-pink-500 to-purple-500
  text-white px-6 py-3 rounded-full
  shadow-[0_0_25px_rgba(255,105,180,0.6)]
  hover:scale-105 transition-all duration-300"
>
  💌 I’ve told you everything… Continue?
</button>


      </div>
    </div>
  );
}

function LetterPage({ onBack }) {
  const [opened, setOpened] = useState(false);
  const [text, setText] = useState("");
  const scrollRef = useRef(null);


  const sealSound = useRef(new Audio("/seal-crack.mp3")); // 🔥 add this

  const breakSeal = () => {
    sealSound.current.play();
    setOpened(true);
  };
  

  const fullText = `
My Dearest Best Friend 💖,

From the very first moment you walked into my life,
something quietly changed within me.

You were never just a person…
You became my comfort in chaos,
my laughter in silence,
and my strength on the days I felt weak.

In this vast world full of temporary people,
you remained my constant,
my safe place,
my forever person.

You stood beside me not only in my happiest moments,
but also in my darkest nights —
when words were heavy and smiles were fake,
you understood me without a single question.

That is not friendship…
That is something rare,
something magical,
something meant only once in a lifetime ✨

No matter where life takes us,
no matter how far distances try to pull us apart,
one truth will always remain unchanged —

You will always be my best friend,
my favorite person,
and my forever home in human form ❤️

If I ever achieve anything in life,
remember… a part of that strength was always YOU.

Thank you for existing.
Thank you for understanding.
Thank you for staying.

Forever grateful,
Forever yours,
👑
 Faltooooz  
         
`;

  /* TYPEWRITER */
  useEffect(() => {
  if (!opened) return;

  let i = 0;
  const interval = setInterval(() => {
    setText(fullText.slice(0, i));
    i++;

    // 🔥 AUTO SCROLL FOLLOW
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    if (i > fullText.length) clearInterval(interval);
  }, 40);

  return () => clearInterval(interval);
}, [opened]);


  return (
    <div className="fixed inset-0 flex items-center justify-center
      bg-gradient-to-br from-[#050510] via-[#0d1b2a] to-[#1b263b] overflow-hidden">
{/* 🔙 Back Button */}
<button
  onClick={onBack}
  className="absolute top-6 left-6 z-50
  bg-gradient-to-br from-yellow-200 to-amber-400
  text-[#3e2c1c] font-bold px-5 py-2 rounded-full
  shadow-lg hover:scale-105 transition-all duration-300"
>
  ← Back
</button>

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="sparkle"
            style={{
              left: Math.random()*100+"%",
              top: Math.random()*100+"%",
              animationDelay: Math.random()*5+"s"
            }}
          />
        ))}
      </div>

      {/* Scroll Container */}
      <div className="relative flex flex-col items-center">

        {/* Top Stick */}
        <div className="scroll-stick"></div>

        {/* Ribbon + Seal */}
        {!opened && (
          <div className="relative mb-6 flex flex-col items-center">
            <div className="ribbon"></div>

            <div
              onClick={breakSeal}
              className="wax-seal"
            >
              👑
            </div>

            <p className="royal-handwriting text-[26px] mt-2">
              Break the Royal Seal
            </p>
          </div>
        )}

        {/* Scroll Paper */}
        <div className={`scroll-paper ${opened ? "open" : ""}`}>
          <div className="royal-scroll-area">
            <pre className="font-serif whitespace-pre-wrap text-lg leading-relaxed text-[#3e2c1c]">
              {text}
              <span className="quill-cursor">🪶</span>
            </pre>
          </div>
        </div>

        {/* Bottom Stick */}
        <div className="scroll-stick bottom"></div>

      </div>
    </div>
  );
}
 function GlassLetterPage({ onBack }) {
  const [cracked, setCracked] = useState(false);
  const [showText, setShowText] = useState(false);
  const [typed, setTyped] = useState("");
  const [ripple, setRipple] = useState(null);
  const cardRef = useRef(null);

  const crackSound = useRef(new Audio("/glass-crack.mp3"));
  const glowSound = useRef(new Audio("/magic-glow.mp3"));

  const fullText = `Hey… 💎

You know what I realised?

Some people don’t enter our life with big dramatic moments…
they just stay,
quietly,
and somehow make everything feel a little easier.

You’re that person for me.

No big speeches,
no over-explaining feelings,
just random talks,
silly laughs,
and that strange comfort
that never needed a reason.

You never tried to change me,
never overanalysed my moods,
you just stayed normal with me.
And honestly, that meant a lot.

Like glass — clear, real, no pretence.
That’s how our friendship always felt.

Simple… but strong.

I don’t usually say things like this,
but life genuinely feels lighter
knowing you’re there.

Not as some dramatic “special person”,
not as someone I have to impress,
but as my constant…
my best friend 🤍

And no matter where life takes us,
I just hope this clarity between us
never gets complicated.

Because some bonds don’t need noise…
they just stay,
quiet,
strong,
and crystal clear 💫
`;

  /* 💥 BREAK GLASS WITH RIPPLE */
  const breakGlass = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipple({ x, y });
    crackSound.current.play();
    setCracked(true);

    setTimeout(() => {
      glowSound.current.play().catch(() => {});
      setShowText(true);
    }, 1200);
  };

  /* ✍️ TYPEWRITER */
  useEffect(() => {
    if (!showText) return;
    let i = 0;
    const interval = setInterval(() => {
      setTyped(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 38);
    return () => clearInterval(interval);
  }, [showText]);

  /* 🧊 3D TILT EFFECT */
  const handleMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 14;
    const rotateY = ((x / rect.width) - 0.5) * -14;

    cardRef.current.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetTilt = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  const glowStrength = Math.min(typed.length / fullText.length, 1);

  return (
    <div className="fixed inset-0 flex items-center justify-center
      bg-gradient-to-br from-[#040414] via-[#0b1b33] to-[#0f2744] overflow-hidden">

      {/* Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(45)].map((_, i) => (
          <div key={i}
            className="absolute bg-white rounded-full opacity-80 animate-pulse"
            style={{
              width: Math.random()*3+1+"px",
              height: Math.random()*3+1+"px",
              top: Math.random()*100+"%",
              left: Math.random()*100+"%",
              animationDuration: 2+Math.random()*4+"s"
            }}
          />
        ))}
      </div>

      {/* Back */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-50 
        bg-white/10 backdrop-blur-xl border border-white/30
        px-5 py-2 rounded-full text-white shadow-lg"
      >
        ← Back
      </button>

      {/* Tap Prompt */}
      {!cracked && (
        <div
          onClick={breakGlass}
          className="relative text-white text-3xl cursor-pointer animate-pulse
          bg-white/10 backdrop-blur-xl px-10 py-7 rounded-3xl
          border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)] overflow-hidden"
        >
          💎 Tap To Break The Crystal

          {/* Ripple */}
          {ripple && (
            <span
              className="ripple"
              style={{ left: ripple.x, top: ripple.y }}
            />
          )}
        </div>
      )}

      {/* Reveal */}
      {cracked && (
        <div className="relative flex items-center justify-center">

          {/* Crack Spread */}
          <div className="absolute inset-0 crack-spread"></div>

          {/* Smoke */}
          <div className="absolute w-[600px] h-[600px] bg-pink-400/20 blur-3xl rounded-full animate-ping"></div>

          {/* Card */}
          {showText && (
            <div
              ref={cardRef}
              onMouseMove={handleMove}
              onMouseLeave={resetTilt}
              className="relative w-[520px] h-[300px] rounded-[28px]
              backdrop-blur-[30px] bg-white/10 border border-white/20
              flex flex-col justify-center text-left
              text-white px-10 py-8 transition-transform duration-200
              overflow-hidden"
              style={{
                boxShadow: `0 0 ${40 + glowStrength*80}px rgba(120,200,255,${0.25 + glowStrength*0.5})`
              }}
            >
              {/* Aurora blobs */}
              <div className="absolute -top-20 -left-20 w-[260px] h-[260px]
                bg-gradient-to-br from-purple-400 via-blue-400 to-cyan-300
                blur-3xl opacity-40 animate-pulse rounded-full"></div>

              <div className="absolute -bottom-24 -right-16 w-[240px] h-[240px]
                bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400
                blur-3xl opacity-40 animate-pulse rounded-full"></div>

              {/* Shine */}
              <div className="absolute inset-0 rounded-[28px]
                bg-gradient-to-br from-white/30 via-transparent to-transparent
                opacity-30 pointer-events-none"></div>

              {/* Text */}
              <p className="relative text-lg leading-relaxed font-semibold whitespace-pre-line">
                {typed}
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`
        .ripple {
          position:absolute;
          width:20px;
          height:20px;
          border-radius:50%;
          background:rgba(255,255,255,0.4);
          transform:translate(-50%,-50%);
          animation:rippleAnim 0.8s ease-out forwards;
        }
        @keyframes rippleAnim{
          from{width:20px;height:20px;opacity:0.8;}
          to{width:400px;height:400px;opacity:0;}
        }

        .crack-spread {
          background: radial-gradient(circle at center,
            rgba(255,255,255,0.6) 0%,
            rgba(255,255,255,0.1) 40%,
            transparent 70%);
          animation: crackGrow 1.2s ease forwards;
        }
        @keyframes crackGrow{
          from{opacity:0;transform:scale(0.2);}
          to{opacity:1;transform:scale(1);}
        }
      `}</style>
    </div>
  );
}






function MusicalLetterPage({ onBack }) {
  // 1️⃣ states
  const [typed, setTyped] = useState("");
  const [active, setActive] = useState(null);
const whiteKeys = [
  "You touched my soul like a gentle melody 🎶",
  "Every note I play whispers your name 💖",
  "My heart beats in rhythm with you 🫀",
  "Our love is the most beautiful symphony ✨",
  "Forever I will play only YOU 💍"
];

const blackKeys = [
  "You are my secret tune 🤫🎵",
  "My silent heartbeat is YOU 💓",
  "Even silence sings your name 💫"
];

  // 2️⃣ buffers refs
  const keyBuffers = useRef([]);
  const blackKeyBuffers = useRef([]);

  // 3️⃣ preload sounds (IKKADA – component lopala, return mundu)
  useEffect(() => {
    const loadSounds = async () => {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();

      const load = async (url) => {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        return await ctx.decodeAudioData(arrayBuffer);
      };

      keyBuffers.current = await Promise.all([
        load("/sounds/p1.mp3"),
        load("/sounds/p2.mp3"),
        load("/sounds/p3.mp3"),
        load("/sounds/p4.mp3"),
        load("/sounds/p5.mp3"),
      ]);

      blackKeyBuffers.current = await Promise.all([
        load("/sounds/b1.mp3"),
        load("/sounds/b2.mp3"),
        load("/sounds/b3.mp3"),
      ]);

      window.__pianoCtx = ctx;
    };

    loadSounds();
  }, []);

  // 4️⃣ play sound instant function
  const playSound = (type, index) => {
    const ctx = window.__pianoCtx;
    if (!ctx) return;

    const buffer =
      type === "white"
        ? keyBuffers.current[index]
        : blackKeyBuffers.current[index];

    if (!buffer) return;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  };

  // 5️⃣ playLine logic
  const playLine = (text, keyId, type = "white", soundIndex = 0) => {
    setActive(keyId);
    setTyped("");
    let i = 0;

    playSound(type, soundIndex); // 🔊 instant

    const interval = setInterval(() => {
      setTyped((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 35);
  };




  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-white overflow-hidden
    bg-gradient-to-b from-[#01010a] via-[#06061a] to-[#01010a]">

      {/* 🔙 Back */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 bg-white/10 backdrop-blur-xl border border-white/20
        px-5 py-2 rounded-full shadow-lg"
      >
        ← Back
      </button>

      {/* 🎵 Floating Notes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="absolute text-xl animate-floatNote opacity-60"
            style={{
              left: Math.random() * 100 + "%",
              animationDuration: 6 + Math.random() * 6 + "s",
              animationDelay: Math.random() * 5 + "s"
            }}
          >
            🎵
          </span>
        ))}
      </div>

      {/* 🎹 Glass Piano */}
      <div className="relative mb-14">

        {/* White Keys */}
        <div className="flex relative">
          {whiteKeys.map((line, i) => (
            <div
              key={i}
              onClick={() => playLine(line, "w" + i, "white", i)}
              className={`relative w-24 h-56 mx-[2px] rounded-b-2xl cursor-pointer
              backdrop-blur-2xl bg-white/10 border border-white/20
              shadow-[0_10px_25px_rgba(255,255,255,0.1)]
              transition-all duration-200
              ${active === "w" + i ? "bg-white/20 scale-y-95 shadow-[0_0_30px_rgba(255,255,255,0.4)]" : ""}`}
            >
              {/* Glow Ripple */}
              {active === "w" + i && (
                <span className="absolute inset-0 rounded-b-2xl border border-pink-400/50 animate-ping"></span>
              )}
            </div>
          ))}
        </div>

        {/* Black Keys */}
        <div className="absolute top-0 left-[50px] flex gap-[54px]">
          {blackKeys.map((line, i) => (
            <div
              key={i}
              onClick={() => playLine(line, "b" + i, "black", i)}
              className={`relative w-14 h-36 rounded-xl cursor-pointer
              backdrop-blur-2xl bg-black/40 border border-white/20
              shadow-[0_5px_20px_rgba(0,0,0,0.6)]
              transition-all duration-200
              ${active === "b" + i ? "bg-pink-400/40 scale-95 shadow-[0_0_25px_rgba(255,100,200,0.8)]" : ""}`}
            >
              {active === "b" + i && (
                <span className="absolute inset-0 rounded-xl border border-pink-400/50 animate-ping"></span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 📝 Glass Letter Output */}
      <div className="relative w-[620px] min-h-[220px] px-12 py-10 rounded-[28px]
      backdrop-blur-[30px] bg-white/10 border border-white/20
      shadow-[0_0_60px_rgba(120,200,255,0.25)]
      text-center leading-relaxed text-xl font-semibold whitespace-pre-line overflow-hidden">

        {/* Shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-25" />

        {typed || "Play the glass piano… each key holds a love note 🎹💖"}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes floatNote {
          0% { transform: translateY(100vh) scale(0.8); opacity: 0; }
          30% { opacity: 0.8; }
          100% { transform: translateY(-10vh) scale(1.2); opacity: 0; }
        }
        .animate-floatNote {
          animation: floatNote linear infinite;
        }
      `}</style>
    </div>
  );
}


function StarryLetterPage({ onBack }) {
  const [stage, setStage] = useState(0);
  // 0 text → 1 constellation → 2 pisces draw → 3 shooting star → 4 name → 5 black hole

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2000);
    const t2 = setTimeout(() => setStage(2), 4500);
    const t3 = setTimeout(() => setStage(3), 6500);
    const t4 = setTimeout(() => setStage(4), 9000);
    const t5 = setTimeout(() => setStage(5), 12000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Pisces star path (curved flow feel)
  const piscesStars = [
    [-80, -60], [-40, -40], [0, -20], [40, -40], [80, -60],
    [40, 0], [0, 20], [-40, 0], [-80, 20],
    [-40, 60], [0, 80], [40, 60],
  ];

  // "Ammu" star letters layout
  const nameStars = [
    [-120, 40], [-100, -40], [-80, 40], [-110, 0], [-90, 0],
    [-40, 40], [-40, -20], [-10, 0], [20, -20], [20, 40],
    [60, 40], [60, -20], [90, 0], [120, -20], [120, 40],
    [160, -20], [160, 40], [200, 40], [200, -20],
  ];

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-white overflow-hidden">

      {/* Back */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-50 bg-white/10 backdrop-blur-xl border border-white/20
        px-5 py-2 rounded-full shadow-lg"
      >
        ← Back
      </button>

      {/* Twinkling stars background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(140)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDuration: 2 + Math.random() * 4 + "s",
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      {/* Stage 0: Connecting text */}
      {stage === 0 && (
        <p className="text-xl opacity-70 animate-pulse">
          ✨ Connecting stars ...
        </p>
      )}

      {/* Stage 1: Constellation dots */}
      {stage === 1 && (
        <div className="relative">
          {piscesStars.map((p, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full shadow-[0_0_12px_white] animate-starPop"
              style={{
                width: "6px",
                height: "6px",
                transform: `translate(${p[0]}px, ${p[1]}px)`,
                animationDelay: i * 0.15 + "s",
              }}
            />
          ))}
        </div>
      )}

      {/* Stage 2: Pisces lines */}
      {stage === 2 && (
        <div className="relative flex items-center justify-center">
          {piscesStars.map((p, i) => {
            const next = piscesStars[(i + 1) % piscesStars.length];
            const dx = next[0] - p[0];
            const dy = next[1] - p[1];
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            return (
              <div
                key={i}
                className="absolute h-[2px] bg-white/80 origin-left animate-lineDraw"
                style={{
                  width: length + "px",
                  transform: `translate(${p[0]}px, ${p[1]}px) rotate(${angle}deg)`,
                  animationDelay: i * 0.12 + "s",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Stage 3: Shooting Star */}
      {stage === 3 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="shooting-star"></div>
          <p className="absolute bottom-32 w-full text-center opacity-80">
            ☄️ Make a wish...
          </p>
        </div>
      )}

      {/* Stage 4: Ammu stars */}
      {stage === 4 && (
        <div className="relative">
          {nameStars.map((p, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full shadow-[0_0_15px_white] animate-starPop"
              style={{
                width: "7px",
                height: "7px",
                transform: `translate(${p[0]}px, ${p[1]}px)`,
                animationDelay: i * 0.08 + "s",
              }}
            />
          ))}
        </div>
      )}

      {/* Stage 5: Black Hole Ending */}
      {stage === 5 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="black-hole-core"></div>
          <div className="black-hole-ring"></div>
          <p className="mt-40 text-xl opacity-80 animate-fadeIn text-center">
            🕳️ Throw all bad memories into this black hole...
          </p>
        </div>
      )}

      <style>{`
        @keyframes twinkle {
          0%,100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        .animate-twinkle { animation: twinkle ease-in-out infinite; }

        @keyframes starPop {
          from { opacity: 0; transform: scale(0.2); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-starPop { animation: starPop 0.6s ease forwards; }

        @keyframes lineDraw {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        .animate-lineDraw {
          animation: lineDraw 0.9s ease forwards;
          transform-origin: left;
        }

        /* Shooting star */
        .shooting-star {
          position: absolute;
          top: -50px;
          left: -100px;
          width: 2px;
          height: 120px;
          background: linear-gradient(to bottom, white, transparent);
          transform: rotate(45deg);
          animation: shoot 2s linear forwards;
          filter: drop-shadow(0 0 6px white);
        }
        @keyframes shoot {
          0% { transform: translate(0,0) rotate(45deg); opacity: 1; }
          100% { transform: translate(100vw, 100vh) rotate(45deg); opacity: 0; }
        }

        /* Black hole */
        .black-hole-core {
          width: 130px;
          height: 130px;
          background: radial-gradient(circle, #000 40%, #111 65%, transparent 100%);
          border-radius: 50%;
          box-shadow: 0 0 40px 20px rgba(255,255,255,0.08),
                      0 0 80px 40px rgba(255,0,200,0.15);
          animation: blackPulse 2.5s ease-in-out infinite;
          z-index: 10;
        }

        .black-hole-ring {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 2px dashed rgba(255,255,255,0.15);
          animation: rotateRing 6s linear infinite;
        }

        @keyframes rotateRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes blackPulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.12); box-shadow: 0 0 60px rgba(255,0,200,0.25); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1.5s ease forwards; }
      `}</style>
    </div>
  );
}


/* 🎁 Main App */
function MainApp() {
const [letterStyle, setLetterStyle] = useState(null);

const [guess, setGuess] = useState("");
const [guessedCorrect, setGuessedCorrect] = useState(false);
const [hint, setHint] = useState(false);

const [revealedSong, setRevealedSong] = useState(false);
const audioRef = useRef(null);
  const [step, setStep] = useState(0);
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");

  const correctDob = "19-02-2005";
  const correctName = "ammu";

  const card =
    "bg-white/30 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-96 text-center";

  const checkDob = () => {
    if (dob === correctDob) setStep(2);
    else alert("Wrong DOB 😜");
  };

  const checkName = () => {
    if (name.toLowerCase() === correctName) setStep(3);
    else alert("Wrong Name 😅");
  };
  const handleGuess = () => {
  if (guess.toLowerCase().trim() === "oh my friend") {
    setGuessedCorrect(true);
  } else {
    setHint(true);
  }
};


  return (
   <div className="min-h-screen w-full 
  bg-gradient-to-br from-white
-400 via-white -300 to-yellow-200
  overflow-x-hidden">


    




      {step === 0 && (
  <div className="w-full h-screen flex items-center justify-center">
    <div className={card}>
      <div
        className="text-6xl animate-bounce cursor-pointer"
        onClick={() => setStep(1)}
      >
        ✉️
      </div>

      <p className="text-pink-500 mt-3 font-bold">
        Open Envelope 💌
      </p>
    </div>
  </div>
)}


     {step === 1 && (
  <div className="w-full h-screen flex items-center justify-center">
    <div className={card}>
      <h2 className="text-white mb-3">Enter DOB</h2>

      <input
        className="w-full p-3 rounded-full mb-3 text-center"
        placeholder="19-02-2005"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      <button
        onClick={checkDob}
        className="bg-pink-500 text-white px-4 py-2 rounded-full"
      >
        Submit
      </button>
    </div>
  </div>
)}

      {step === 2 && (
  <div className="w-full h-screen flex items-center justify-center">
    <div className={card}>
      <h2 className="text-white mb-3">Enter Name</h2>

      <input
        className="w-full p-3 rounded-full mb-3 text-center"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={checkName}
        className="bg-purple-500 text-white px-4 py-2 rounded-full"
      >
        Continue
      </button>
    </div>
  </div>
)}

     {step === 3 && (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="bg-yellow-100 p-6 rounded-3xl shadow-xl w-full max-w-xl text-center">
      <h2 className="text-3xl font-bold text-orange-500 mb-3">
        A Little Note 💌
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4 text-left">
       Hey my favorite  ❤️

This is just the beginning…
There are more little surprises waiting for you ahead ✨
        <br /><br />
       So don’t stop here… keep going 😉
        <br /><br />
        Always yours 😘
      </p>

      <button
        onClick={() => setStep(4)}
        className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold"
      >
        Keep Going ✨ →
      </button>
    </div>
  </div>
)}

      {step === 4 && (
  <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-10">

    {/* Title */}
    <h2
      className="text-4xl font-bold text-purple-500"
      style={{
        textShadow: "0 0 10px #a855f7, 0 0 20px #c084fc, 0 0 30px #e9d5ff"
      }}
    >
      This One Song = You💖🎧💖
    </h2>

    {/* 🎵 Cassette */}
    <div className="cassette-card relative w-full max-w-3xl">
      <p className="cassette-side">SIDE 1</p>

      <h3 className="cassette-title">
        {guessedCorrect ? "Oh My Friend 💕" : "Guess the Song 🤔"}
      </h3>

      <p className="cassette-sub">
        {guessedCorrect
          ? "You got it right 😍"
          : "Did you guess it? 💭"}
      </p>

      <div className="cassette-bar">
        <span></span>
        <span></span>
      </div>

      <div
        className="play-btn cursor-pointer"
        onClick={() => {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }}
      >
        ▶
      </div>

      <audio ref={audioRef} preload="auto">
        <source src="/song1.mp3" type="audio/mp3" />
      </audio>
    </div>

    {/* 🎯 Guess Box */}
    {!guessedCorrect && (
      <div className="bg-white/10 backdrop-blur-2xl border border-white/30
      rounded-3xl p-8 shadow-[0_0_40px_rgba(255,192,203,0.25)] w-full max-w-xl">

        <p className="text-gray-700 mb-3 font-semibold">
          Guess the song name 🎶
        </p>

        <input
          type="text"
          placeholder="Type here..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="w-full p-3 rounded-full text-center border"
        />

        {hint && (
          <p className="text-sm text-pink-500 mt-2 animate-pulse">
            Hint: Telugu friendship song 😉
          </p>
        )}

        <button
          onClick={handleGuess}
          className="mt-5 bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition"
        >
          Next ✨
        </button>
      </div>
    )}

    {/* 🎉 BOOM + NEXT (CENTERED FIX) */}
    {guessedCorrect && (
      <div className="flex flex-col items-center gap-6 mt-6">
        <div className="text-3xl animate-bounce">
          🎉 BOOM! You guessed it 💖
        </div>

        <button
          onClick={() => setStep(5)}
          className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:scale-105 transition"
        >
          🎂 Next Surprise →
        </button>
      </div>
    )}

  </div>
)}

      {/* STEP 5 CAKE PAGE */}
{step === 5 && (
  <CakePage onNext={() => setStep(6)} />
)}

{/* STEP 6 TRAVEL */}
{step === 6 && (
  <TravelPage onNext={() => setStep(7)} />
)}




{step === 7 && !letterStyle && (
  <ChooseLetterStyle
    onSelect={(style) => {
      if (style === "seal") setStep(8);
      else setLetterStyle(style);
    }}
  />
)}


{step === 7 && letterStyle === "royal" && (
  <LetterPage onBack={() => setLetterStyle(null)} />
)}

{step === 7 && letterStyle === "glass" && (
  <GlassLetterPage onBack={() => setLetterStyle(null)} />
)}

{step === 7 && letterStyle === "music" && (
  <MusicalLetterPage onBack={() => setLetterStyle(null)} />
)}

{step === 7 && letterStyle === "starry" && (
  <StarryLetterPage onBack={() => setLetterStyle(null)} />
)}

{/* STEP 8 FINAL LETTER BASED ON STYLE */}
{step === 8 && (
  <SealDecisionPage onBack={() => setStep(7)} />
)}



    </div>
    
  );
}


/* 🌈 ROOT */
export default function App() {

  const [stage, setStage] = useState("loading");
  const [locked, setLocked] = useState(true);

useEffect(() => {
  const unlockTime = new Date("2026-02-19T00:00:00");

  const checkTime = () => {
    if (new Date() >= unlockTime) {
      setLocked(false); // unlock only
    }
  };

  checkTime();
  const interval = setInterval(checkTime, 1000);
  return () => clearInterval(interval);
}, []);

if (locked) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white text-center px-6">
      <h1 className="text-3xl font-bold mb-4 animate-pulse">
        🎁 Surprise Unlocks At 12:00 AM
      </h1>
      <p className="opacity-70">Just wait a little more… 💖</p>
    </div>
  );
}
  return (
    <>
      {/* Hearts Everywhere */}
      <FloatingHearts />

      {stage === "loading" && <LoadingScreen />}

      {stage === "intro" && (
        <IntroScreen onNext={() => setStage("main")} />
      )}

      {stage === "main" && <MainApp />}
    </>
  );
}
function SealDecisionPage({ onBack }) {
  const [sealed, setSealed] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center
    bg-gradient-to-br from-black via-purple-900 to-black text-white overflow-hidden">

      <h1 className="text-4xl mb-10 text-center font-bold">
        💌 Shall we seal this..?
      </h1>

      <div className="flex gap-8">
        {/* 💖 Seal It */}
        <button
          onClick={() => setSealed(true)}
          className="px-8 py-4 rounded-full
          bg-pink-500 hover:scale-105 transition"
        >
          💖 Seal It
        </button>

        {/* 💭 Not Yet */}
        <button
          onClick={onBack}
          className="px-8 py-4 rounded-full
          bg-white/20 backdrop-blur-xl hover:scale-105 transition"
        >
          💭 Not Yet
        </button>
      </div>

      {/* 🌙 ENDING OVERLAY */}
      {sealed && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center
        text-center z-50 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide px-6">
            💌 This memory  is sealed forever
          </h1>
        </div>
      )}
    </div>
  );
}
