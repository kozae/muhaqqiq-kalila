export const AppButton = () => {
  const signOut = async () => {
    try {
      const res = await fetch("/api/sign-out");
      console.log({ res });
    } catch (e) {
      console.log({ e });
    }
  };

  const verify = async () => {
    try {
      const res = await fetch("/api/verify-session");
      console.log(await res.json());
    } catch (e) {
      console.log({ e });
    }
  };

  return (
    <>
      <button
        className="bg-secondary-500 px-4 py-2 rounded-md mr-2"
        onClick={signOut}
      >
        Sign Out
      </button>
      <button
        className="bg-secondary-700 text-white px-4 py-2 rounded-md"
        onClick={verify}
      >
        Verify
      </button>
    </>
  );
};
