import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import InputField from "../components/InputField";
import AuthForm from "./AuthForm";
import Button from "../components/Button";
import { Link } from "react-router";

interface LoginState {
  username: string;
  password: string;
  error: string[] | string | null;
}
export default function Login() {
  const [formData, setFormData] = useState<LoginState>({
    username: "",
    password: "",
    error: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <AuthForm>
      <>
        <div>
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-violet-900 to-[#826684]">
            Welcome <br />
            back.
          </h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center flex-col gap-4">
            <InputField
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
            >
              <img src="/public/icons/person.svg" />
            </InputField>
            <InputField
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            >
              <img src="/public/icons/lock.svg" />
            </InputField>
            <Button>Login</Button>

            <p>
              <span className="text-[#454545]">
                Don't have an account yet? &nbsp;
              </span>
              <Link
                className="bg-clip-text text-transparent bg-gradient-to-r from-violet-900 to-[#826684]"
                to="/signup"
              >
                Signup.
              </Link>
            </p>
          </div>
        </Form>
      </>
    </AuthForm>
  );
}
