import { useEffect } from "react";

import HomePage from "./HomePage";
import RankPage from "./RankPage";
import UniformPage from "./UniformPage";
import HistoryPage from "./HistoryPage";
import MockDrillPage from "./MockDrillPage";

function ServiceScrollPage({ service }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div className="w-full overflow-x-hidden scroll-smooth">
      <section><HomePage service={service} /></section>
      <section><RankPage service={service} /></section>
      <section><UniformPage service={service} /></section>
      <section><HistoryPage service={service} /></section>
      <section><MockDrillPage service={service} /></section>
    </div>
  );
}

export default ServiceScrollPage;
