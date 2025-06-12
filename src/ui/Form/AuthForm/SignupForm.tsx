import { ChangeEvent, useState } from "react";
import Form from "../components/Form";
import InputField from "../components/InputField";
import AuthForm from "./AuthForm";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router";
import {
  ISignupResponse,
  ISignupState,
  SignupPayloadType,
} from "../../../core/types/auth/signup.types";
import { apiPostRequest } from "../../../core/utils/request.utils";
import {
  ApiErrorResponse,
  ApiSucessResponse,
} from "../../../core/types/api/response";
import { asyncResponseErrorHandler } from "../../../core/errors/errors";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ISignupState>({
    email: "",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload: SignupPayloadType = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      confirm_password: formData.confirm_password,
    };

    const response = await apiPostRequest<
      SignupPayloadType,
      ApiErrorResponse | ApiSucessResponse<ISignupResponse>
    >("auth/signup", payload);

    if (!response.success){
      const errors = asyncResponseErrorHandler(response);
      for (const err of errors){
        toast(err)
      }
    } else{
      navigate("/login");
    }
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
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            >
              <img src="/public/icons/mail.svg" />
            </InputField>
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
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            >
              <img src="/public/icons/lock.svg" />
            </InputField>
            <InputField
              name="confirm_password"
              type="password"
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
