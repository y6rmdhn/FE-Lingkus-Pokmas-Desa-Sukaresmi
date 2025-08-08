import type { PropsWithChildren } from "react";

const SubTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return <p className="text-lg text-gray-600 font-semibold">{children}</p>;
};

export default SubTitle;
