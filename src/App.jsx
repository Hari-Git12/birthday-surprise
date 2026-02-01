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
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-pink-200 via-pink-100 to-yellow-100">

      <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-3xl w-full text-center">

        <p className="text-orange-400 italic mb-2">
          welcome to my little thought...
        </p>

        <h1 className="text-5xl font-bold text-orange-500 mb-4">
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




function CakePage({ onNext }) {
  const [stage, setStage] = useState("drop"); // drop → cream → candles → cut → done
  const [blown, setBlown] = useState(false);
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);
  const [blowSound] = useState(new Audio("/blow.mp3")); // Custom blow sound

  /* STEP 1 → Drop + Cream + Candles (AUTO) */
  useEffect(() => {
    setTimeout(() => setStage("cream"), 1500);
    setTimeout(() => setStage("candles"), 3000);
  }, []);

  /* STEP 2 → Start Mic when candles appear */
  useEffect(() => {
    if (stage === "candles") {
      startMic();
    }
  }, [stage]);

  /* MIC DETECTION */
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
      alert("🎤 Please allow microphone access");
    }
  };

  /* Detect Blow */
  const detectBlow = () => {
    if (!analyserRef.current) return;

    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const volume = data.reduce((a, b) => a + b, 0) / data.length;

    // 👇 Adjust sensitivity here (adjust the volume threshold if needed)
    if (volume > 65 && !blown) {
      setBlown(true);
      blowSound.play(); // Play the blow sound
      afterBlow();
      return;
    }

    requestAnimationFrame(detectBlow);
  };

  /* AFTER USER BLOWS */
  const afterBlow = () => {
    // Stop mic
    audioCtxRef.current?.close();

    // Continue animation
    setTimeout(() => setStage("cut"), 800); // Cutting cake
    setTimeout(() => setStage("done"), 2200); // Done
    setTimeout(() => onNext(), 4500); // Proceed to next step
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-rose-200 to-yellow-200 relative overflow-hidden">
      {/* Main Card */}
      <div className="bg-[#fff4dd]/95 rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center relative z-20">
        <h1 className="text-4xl font-bold text-pink-600 mb-2">It’s Cake Time 🎂</h1>
        <p className="text-gray-600 mb-6">Happy Birthday Lovie 💖</p>

        {/* Plate */}
        <div className="relative flex justify-center mt-8">
          <div className="absolute -bottom-5 w-72 h-6 bg-gray-300 rounded-full shadow-xl"></div>

          {/* Cake */}
          <div className="relative">
            {/* Cake Body */}
            <div className={`cake-base ${stage !== "drop" ? "drop-done" : ""}`}>
              {/* Cream */}
              {stage !== "drop" && (
                <div className={`cream ${stage !== "cream" ? "cream-done" : ""}`}></div>
              )}

              {/* Cut Effect */}
              {(stage === "cut" || stage === "done") && (
                <>
                  <div className="slice-left"></div>
                  <div className="slice-right"></div>
                </>
              )}
            </div>

            {/* Candles */}
            {stage !== "drop" && stage !== "cream" && (
              <div className="flex gap-4 justify-center absolute -top-16 w-full">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="relative candle">
                    <div className="wick"></div>
                    {!blown && <div className="flame"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* STATUS */}
        <p className="mt-8 text-sm text-gray-600 animate-pulse">
          {stage === "drop" && "🍰 Cake is coming down..."}
          {stage === "cream" && "🤍 Cream is melting..."}
          {stage === "candles" && !blown && "💨 Blow near mic to turn off candles"}
          {stage === "candles" && blown && "✨ Candles blown!"}
          {stage === "cut" && "🔪 Cutting cake..."}
          {stage === "done" && "🎉 Happy Birthday!"}
        </p>
      </div>
    </div>
  );
}

/* 🎁 Main App */
function MainApp() {

  const [step, setStep] = useState(0);
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");

  const correctDob = "02-02";
  const correctName = "lalitha";

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-400 via-pink-300 to-yellow-200 flex items-center justify-center px-4 pb-20">

      {/* Step 0 Envelope */}
      {step === 0 && (
        <div className={card}>

          <div
            className="text-6xl animate-bounce cursor-pointer"
            onClick={() => setStep(1)}
          >
            ✉️
          </div>

          <p className="text-white mt-3 font-bold">
            Open Envelope 💌
          </p>

        </div>
      )}

      {/* Step 1 DOB */}
      {step === 1 && (
        <div className={card}>

          <h2 className="text-white mb-3">Enter DOB</h2>

          <input
            className="w-full p-3 rounded-full mb-3 text-center"
            placeholder="02-02"
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
      )}

      {/* Step 2 Name */}
      {step === 2 && (
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
      )}

      {/* Step 3 NOTE */}
      {step === 3 && (
        <div className="bg-yellow-100 p-6 rounded-3xl shadow-xl w-full max-w-xl text-center">

          <h2 className="text-3xl font-bold text-orange-500 mb-3">
            A Little Note 💌
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4 text-left">

            Hey my favorite person ❤️ <br /><br />

            You mean everything to me.
            My happiness, my smile.

            <br /><br />

            Thank you for being you 💖

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
      )}

      {/* Step 4 MUSIC */}
      {step === 4 && (
        <div className="space-y-12 w-full max-w-3xl px-4">

          <h2 className="text-4xl font-bold text-orange-500 text-center">
            Some Songs That Reminded Me of You 💖
          </h2>

          <p className="text-center text-sm text-gray-600">
            Hope they feel nice 🎧
          </p>

          {/* Cassette */}
          {[
            { name: "Permission To Dance", file: "song1.mp3" },
            { name: "Butter", file: "song2.mp3" },
            { name: "Fake Love", file: "song3.mp3" },
          ].map((song, i) => (
            <div key={i} className="cassette-card">

              <p className="cassette-side">
                SIDE {i + 1}
              </p>

              <h3 className="cassette-title">
                {song.name} 💕
              </h3>

              <p className="cassette-sub">
                My heart in music 💘
              </p>

              <div className="cassette-bar">
                <span></span>
                <span></span>
              </div>

              <div className="play-btn">▶</div>

              <audio controls className="w-full mt-4">
                <source src={`/${song.file}`} />
              </audio>

            </div>
            
          ))}
          <div className="text-center mt-10">
  <button
    onClick={() => setStep(5)}
    className="bg-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition"
  >
    🎂 Next Surprise →
  </button>
</div>


        </div>
      )}
      {/* STEP 5 CAKE PAGE */}
{step === 5 && (
  <CakePage onNext={() => setStep(6)} />
)}


    </div>
  );
}


/* 🌈 ROOT */
export default function App() {

  const [stage, setStage] = useState("loading");

  useEffect(() => {
    setTimeout(() => {
      setStage("intro");
    }, 3000);
  }, []);

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
