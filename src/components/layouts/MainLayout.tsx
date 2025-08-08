import { type PropsWithChildren } from "react";
import Header from "../sections/header/Header";
import Footer from "../sections/footer/Footer.";

const MainLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
