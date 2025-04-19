import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import InputField from "../components/InputField";
import AuthForm from "./AuthForm";
import Button from "../components/Button";
import { Link } from "react-router";

interface SignupState {
  username: string;
  password: string;
  confirm_password: string;
  error: string[] | string | null;
}
export default function Signup() {
  const [formData, setFormData] = useState<SignupState>({
    username: "",
    password: "",
    confirm_password: "",
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
            Create <br />
            Account.
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
            <InputField
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
              placeholder="Confirm Password"
            >
              <img src="/public/icons/check.svg" />
            </InputField>
            <Button>Signup</Button>

            <p>
              <span className="text-[#454545]">
                Already have an account? &nbsp;
              </span>
              <Link
                className="bg-clip-text text-transparent bg-gradient-to-r from-violet-900 to-[#826684]"
                to="/login"
              >
                Login.
              </Link>
            </p>
          </div>
        </Form>
      </>
    </AuthForm>
  );
}
