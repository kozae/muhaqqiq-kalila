import NavDashboard from "@components/NavDashboard";
import PageWrapper from "@layout/PageWrapper";
import useSession from "@lib/use-session";

export default function Home() {
  const session = useSession();
  return (
    <PageWrapper>
      <div className="flex h-full flex-col lg:flex-row">
        <div
          className={`${
            session ? "w-full lg:w-1/2" : "w-full"
          } h-full px-4 pt-16`}
        >
          <div className="flex w-full flex-col justify-center px-4 align-middle">
            <div className="flex w-full justify-center px-4 align-middle">
              <img className="h-[200px] w-auto" src="/logo_512.png" alt="" />
            </div>
            <h1 className="text-primary-500 mx-auto pt-4 text-6xl font-bold lg:text-8xl">
              Muḥaqqiq
            </h1>
            <h1 className="text-secondary-900 mx-auto  pt-4 text-2xl lg:text-4xl">
              Textual Scholarship Toolkit
            </h1>
          </div>
        </div>
        {session && (
          <div className="h-full w-full py-16 lg:w-1/2">
            <NavDashboard />
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
