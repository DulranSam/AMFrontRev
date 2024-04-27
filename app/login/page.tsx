import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/store";

export default function LoginPage() {
  const { loading, setLoading, status, setStatus, BASE, setCompany } =
    useContext(UserContext);
  const [creds, setCreds] = useState({ gmail: "", password: "" });
  const navigator = useNavigate();

  async function userLogin(e) {
    e.preventDefault();
    try {
      setStatus("");
      setLoading(true);
      const response = await Axios.post(`${BASE}/users/login`, creds);
      if (response.status === 200) {
        const { token, company } = response.data;

        // Store JWT in local storage
        localStorage.setItem("token", token);

        setCompany(company);
        setStatus(`${company.gmail} Logged in!`);
        setTimeout(() => {
          navigator("/");
        }, 1200);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setStatus("Wrong Credentials");
      } else {
        setStatus("Error");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="pb-6">
        <h1 className={title({ color: "cyan" })}>Login</h1>
      </div>

      <form
        action=""
        className="flex flex-col gap-6 max-w-full"
        onSubmit={userLogin}
      >
        <Input
          isRequired
          type="email"
          label="Email"
          placeholder="Enter your email"
          onChange={handleChange}
          name="email"
        />

        <Input
          isRequired
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
        />

        <Button
          className="bg-gradient-to-tr from-slate-800 to-lime-200"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
