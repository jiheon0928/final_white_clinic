import classNames from "classnames";

const Layout = ({
  children,
  title,
  className = "",
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <div className={classNames("px-4 sm:px-6 lg:px-8 bg-white", className)}>
      <div className="flex flex-col h-full gap-4 bg-white p-8 rounded-lg text-black shadow-lg max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent cursor-default">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
