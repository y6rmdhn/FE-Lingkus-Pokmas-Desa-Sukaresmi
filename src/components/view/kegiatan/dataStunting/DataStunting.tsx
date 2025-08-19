import { ChartLineStunting } from "@/components/block/lineChart/LineChart";
import Title from "@/components/block/title/Title";
import MainLayout from "@/components/layouts/MainLayout";
import { useEffect } from "react";

const DataStunting = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <MainLayout>
      <div className="mt-28 px-20 mb-20">
        <Title>Data Stunting</Title>

        <ChartLineStunting />
      </div>
    </MainLayout>
  );
};

export default DataStunting;
