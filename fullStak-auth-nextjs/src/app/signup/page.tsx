"use client";
import axios from "axios";
import Button from "@/components/Button";import InputBox from "@/components/InputBox";
import { Backend_URL } from "@/lib/Constants";
import Link from "next/link";
import React, { useRef } from "react";

import {register} from '../service/signupFetch'


type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  console.log(Backend_URL);
  
  const data = useRef<FormInputs>({
    name: "",
    email: "",
    password: "",
  });


  return (
    <>
      <div className="m-2 h-screen rounded overflow-hidden shadow">
        <div className="p-2">
          Sign up
        </div>
        <div className="p-2 flex flex-col gap-6">
          <InputBox
            autoComplete="off"
            name="name"
            labelText="Name"
            required
            onChange={(e) => (data.current.name = e.target.value)}
          />
          <InputBox
            name="email"
            labelText="Email"
            required
            onChange={(e) => (data.current.email = e.target.value)}
          />
          <InputBox
            name="password"
            labelText="Password"
            type="password"
            required
            onChange={(e) => (data.current.password = e.target.value)}
          />
          <div className="flex justify-center items-center gap-2">
            <Button onClick={() => register(data.current)}>Submit</Button>
            <Link href={"/"}>Cancel</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
