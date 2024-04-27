import { title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { UserContext } from "../context/store";

export default function JoinPage() {
  const { loading, setLoading, status, setStatus, BASE } =
    useContext(UserContext);
  const [gmail, setGmail] = useState("");
  const navigator = useNavigate();

  async function userRegister(e) {
    e.preventDefault();
    setStatus("");
    try {
      setLoading(true);
      const response = await Axios.post(`${BASE}/users/register`, { gmail });
      if (response.status === 201) {
        setStatus("Registration complete! Redirecting to login...");
        setTimeout(() => {
          navigator("/login");
        }, 1200);
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setStatus(`${gmail} is already taken!`);
      } else {
        setStatus("Error occurred during registration");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className={title()}>Join Us</h1>
      <div className="">
        <div className="pb-4 pt-4">
          <h1 className={title({ color: "cyan", size: "sm" })}>
            All we need is your email
          </h1>
        </div>
        <form action="" className="flex flex-row gap-6" onSubmit={userRegister}>
          <Input
            isRequired
            type="email"
            label="Email"
			name="email"
            placeholder="Enter your email"
            className="max-w-full"
            onChange={(e) => {
              setGmail(e.target.value);
            }}
          />
          <div className="pt-2 ">
            <Button
              className="bg-gradient-to-tr from-slate-800 to-lime-200"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
        <div className="pt-2">
          <p>
            Already a user? <Link href={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
