import { type PropsWithChildren } from "react";

const Title = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <h1 className="text-3xl md:text-4xl font-bold text-[#0F828C] mb-4">
      {children}
    </h1>
  );
};

export default Title;
