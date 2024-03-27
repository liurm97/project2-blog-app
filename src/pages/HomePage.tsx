import { useState, useEffect } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import heroImage from "../assets/hero.mp4";

export default function HomePage() {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

  useEffect(() => {
    // Check if it's the user's first visit for the session using sessionStorage
    const isFirstVisit = sessionStorage.getItem("isFirstVisit");

    if (!isFirstVisit) {
      setIsLoadingVisible(true);
      sessionStorage.setItem("isFirstVisit", "no");
      setTimeout(() => {
        setIsLoadingVisible(false);
      }, 3500);
    }
  }, []);

  return (
    <main className="h-screen">
      <LoadingOverlay isLoadingVisible={isLoadingVisible} />
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
            <p className="text-center font-serif text-3xl md:text-6xl">
              Captivate your audience
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
