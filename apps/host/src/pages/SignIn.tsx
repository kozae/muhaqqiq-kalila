import SignInForm from "@components/SignInForm";
import { useNavigate } from "react-router-dom";
export default function SignInPage() {
  const navigate = useNavigate();
  return (
    <SignInForm
      onSignIn={async () => {
        navigate("/");
      }}
    />
  );
}
