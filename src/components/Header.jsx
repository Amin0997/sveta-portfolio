import { Link } from "react-router-dom";

export default function Header({
  projectData,
  activeColor,
  mode = "home",
  prevProject,
  nextProject,
}) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xs bg-white/90">
      <div className="w-full max-w-[1440px] mx-auto px-[clamp(16px,5vw,140px)] flex items-start justify-between pt-6 pb-4">
        {/* LEFT */}
        <nav className="flex justify-between items-center text-[32px] leading-10">
          <Link to="/">
            <h1
              className="font-medium transition-colors duration-300"
              style={{ color: activeColor || "black" }}
            >
              Sveta Magayaeva
            </h1>
            <h2 className="text-[#999999]/90 font-normal">Graphic Designer</h2>
          </Link>
        </nav>

        {/* RIGHT */}
        {mode === "home" ? (
          <ul className="flex mt-2 font-normal text-[32px] flex-col mr-[38%] leading-8 gap-y-4">
            {Object.entries(projectData).map(([name, data]) => (
              <li key={name}>
                <Link
                  to={data.link}
                  className="transition-colors duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = data.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                  }}
                >
                  {data.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex gap-x-10 text-[24px] font-normal">
            {/* PREVIOUS */}
            {prevProject && (
              <Link
                to={prevProject.link}
                className="group flex flex-col items-center gap-1 w-[120px]"
              >
                <span
                  className="opacity-60 group-hover:opacity-100 transition text-center"
                  style={{ color: prevProject.color }}
                >
                  previous
                </span>
                <div className="relative w-full h-px bg-black/20 overflow-hidden mt-1">
                  <div className="absolute right-0 top-0 h-full w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </div>
              </Link>
            )}

            {/* NEXT */}
            {nextProject && (
              <Link
                to={nextProject.link}
                className="group flex flex-col items-center gap-1 w-[120px]"
              >
                <span
                  className="opacity-60 group-hover:opacity-100 transition text-center"
                  style={{ color: nextProject.color }}
                >
                  next project
                </span>
                <div className="relative w-full h-px bg-black/20 overflow-hidden mt-1">
                  <div className="absolute left-0 top-0 h-full w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
