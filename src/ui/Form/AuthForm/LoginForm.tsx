import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import InputField from "../components/InputField";
import AuthForm from "./AuthForm";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import {
  ILoginResponse,
  ILoginState,
  LoginPayloadType,
} from "../../../core/types/auth/login.types";
import {
  ApiErrorResponse,
  ApiSucessResponse,
} from "../../../core/types/api/response";
import { apiPostRequest } from "../../../core/utils/request.utils";
import { asyncResponseErrorHandler } from "../../../core/errors/errors";
import toast from "react-hot-toast";
import { useAuth } from "../../../core/context/auth.context";

export default function Login() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ILoginState>({
    email: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: LoginPayloadType = {
      email: formData.email,
      password: formData.password,
    };
    const response = await apiPostRequest<
      LoginPayloadType,
      ApiErrorResponse | ApiSucessResponse<ILoginResponse>
    >("auth/login", payload);

    if (!response.success) {
      const errors = asyncResponseErrorHandler(response);
      for (const err of errors) {
        toast(err);
      }
    } else {
      setIsAuthenticated(true);
      navigate("/discover");
    }
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
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            >
              <img src="/public/icons/mail.svg" />
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
