import { useState, useEffect } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

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
      }, 3200);
    }
  }, []);

  return (
    <main className="h-screen">
      <LoadingOverlay isLoadingVisible={isLoadingVisible} />
      <section className={`p-14 flex h-screen justify-center items-center`}>
        <h1>Homepage</h1>
      </section>
    </main>
  );
}
