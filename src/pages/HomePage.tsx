import { useState, useEffect } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import heroImage from "../assets/hero.mp4";
import { Avatar } from "@chakra-ui/react";
import audioImage from "../assets/audio.png";
import interactionImage from "../assets/interactive.png";
import ambienceImage from "../assets/ambience.png";
import pollImage from "../assets/poll.png";
import analyticsImage from "../assets/analytics.png";
import customizeImage from "../assets/customize.png";
import BlogEditor from "../components/BlogEditor";

export default function HomePage() {
  const isFirstVisit = sessionStorage.getItem("isFirstVisit");
  const [isLoadingVisible, setIsLoadingVisible] = useState(!isFirstVisit);

  useEffect(() => {
    // Check if it's the user's first visit for the session using sessionStorage

    if (!isFirstVisit) {
      sessionStorage.setItem("isFirstVisit", "no");
      setTimeout(() => {
        setIsLoadingVisible(false);
      }, 3500);
    }
  }, []);

  return (
    <main className="h-screen">
      <LoadingOverlay isLoadingVisible={isLoadingVisible} />
      {!isLoadingVisible && (
        <section className="h-screen flex justify-center items-center relative overflow-hidden -z-10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroImage} type="video/mp4"></source>
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>

          <div className="absolute flex flex-col items-center">
            <p className="text-gray-400 mb-4">Posts that come to life</p>
            <div>
              <p className="text-center font-serif text-4xl md:text-6xl">
                Captivate your audience
              </p>
            </div>
          </div>
        </section>
      )}

      {!isLoadingVisible && (
        <section className="flex flex-col bg-gradient-to-tr from-[#2e1139] to-[#190322] items-center">
          <div className="px-24 py-24 text-center">
            <p className="text-gray-400 mb-4">Pick and choose. Your choice</p>
            <h2 className="text-3xl md:text-4xl font-serif">
              Reading has never been this{" "}
              <span className="text-rose-300">interactive</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-24 md:gap-12 mt-12 max-w-screen-xl">
              <div className="text-left md:w-1/3">
                <img
                  src={ambienceImage}
                  alt=""
                  className="rounded-md mb-6 w-full"
                />
                <p className="font-medium text-xl mb-3">Dynamic Ambience</p>
                <p className="text-gray-400">
                  Sample TextSample TextSample TextSample TextSample TextSample
                  Text Sample Text Sample Text Sample Text Sample Text Sample
                  Text Sample Text Sample Text Sample Text
                </p>
              </div>
              <div className="text-left md:w-1/3">
                <img
                  src={audioImage}
                  alt="Image of audio waves"
                  className="rounded-md mb-6 w-full"
                />
                <p className="font-medium text-xl mb-3">Audio Tonality</p>
                <p className="text-gray-400">
                  Sample TextSample TextSample TextSample TextSample TextSample
                  Text Sample Text Sample Text Sample Text Sample Text Sample
                  Text Sample Text Sample Text Sample Text
                </p>
              </div>
              <div className="text-left md:w-1/3">
                <img
                  src={interactionImage}
                  alt="Image of phone"
                  className="rounded-md mb-6 w-full "
                />
                <p className="font-medium text-xl mb-3">Interactive Elements</p>
                <p className="text-gray-400">
                  Sample TextSample TextSample TextSample TextSample TextSample
                  Text Sample Text Sample Text Sample Text Sample Text Sample
                  Text Sample Text Sample Text Sample Text
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      {!isLoadingVisible && (
        <section className="flex flex-col justify-center items-center bg-[#0c434b] text-slate-200">
          <div className="px-14 py-24 text-center">
            <h2 className="text-3xl md:text-4xl font-serif">
              Be a writer. <span className="text-green-300">Engage</span> your
              audience
            </h2>
            <div className="mt-10 flex justify-center gap-4 md:scale-110">
              <Avatar
                name="Ryan Florence"
                showBorder={false}
                loading="eager"
                size="lg"
                src="https://bit.ly/dan-abramov"
              />
              <Avatar
                name="Ryan Florence"
                showBorder={false}
                loading="eager"
                size="lg"
                src="https://bit.ly/kent-c-dodds"
              />
              <Avatar
                name="Ryan Florence"
                showBorder={false}
                loading="eager"
                size="lg"
                src="https://bit.ly/prosper-baba"
              />
              <Avatar
                name="Ryan Florence"
                showBorder={false}
                loading="eager"
                size="lg"
                src="https://bit.ly/code-beast"
              />
              <Avatar
                name="Ryan Florence"
                showBorder={false}
                loading="eager"
                size="lg"
                src="https://bit.ly/ryan-florence"
              />
            </div>
          </div>
        </section>
      )}
      {!isLoadingVisible && (
        <section className="flex flex-col bg-gradient-to-tr from-[#020831] to-[#300404] items-center">
          <div className="px-24 py-24 text-center">
            <p className="text-gray-400 mb-4">Connect with your audience</p>
            <h2 className="text-3xl md:text-4xl font-serif">
              Take your content to the{" "}
              <span className="text-yellow-300">next level</span>
            </h2>
            <div className="flex flex-col md:flex-row gap-24 md:gap-12 mt-12 max-w-screen-xl">
              <div className="text-left md:w-1/3">
                <img
                  src={pollImage}
                  alt="Image of question marks"
                  className="rounded-md mb-6 w-full "
                />
                <p className="font-medium text-xl mb-3">Polls & Prompts</p>
                <p className="text-gray-400">
                  Sample TextSample TextSample TextSample TextSample TextSample
                  Text Sample Text Sample Text Sample Text Sample Text Sample
                  Text Sample Text Sample Text Sample Text
                </p>
              </div>
              <div className="text-left md:w-1/3">
                <img
                  src={analyticsImage}
                  alt="Image of analytics dashboard"
                  className="rounded-md mb-6 w-full"
                />
                <p className="font-medium text-xl mb-3">Analytics Dashboard </p>
                <p className="text-gray-400">
                  Sample TextSample TextSample TextSample TextSample TextSample
                  Text Sample Text Sample Text Sample Text Sample Text Sample
                  Text Sample Text Sample Text Sample Text
                </p>
              </div>
              <div className="text-left md:w-1/3">
                <img
                  src={customizeImage}
                  alt="Image of phone"
                  className="rounded-md mb-6 w-full "
                />
                <p className="font-medium text-xl mb-3">Superb customization</p>
                <p className="text-gray-400">
                  Sample TextSample TextSample TextSample TextSample TextSample
                  Text Sample Text Sample Text Sample Text Sample Text Sample
                  Text Sample Text Sample Text Sample Text
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      <footer className="px-24 py-4 text-center bg-gray-950">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} All rights reserved. Built by Bobby
          & Weirong
        </p>
      </footer>
    </main>
  );
}
