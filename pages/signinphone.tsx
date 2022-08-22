import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getProviders } from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { useEffect, useState } from "react";
import auth from "./api/auth/firebase";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export default function SignInPhone({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const countryCode = "+1";

  const requestOtp = () => {
    if (!phone) {
      alert("Enter the number please");
    } else {
      const appVerifier = window.recaptchaVerifier;
      const phoneValue = countryCode + phone;
      signInWithPhoneNumber(auth, phoneValue, appVerifier)
        .then((confirmationResult: any) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch((error) => console.log(error));
    }
  };

  const handleConfirmCode = () => {
    if (!code) {
      alert("Please add the code");
    } else {
      window.confirmationResult
        .confirm(code)
        .then((result: any) => console.log(result.user, "result"));
    }
  };

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
          console.log(response, "response");
        },
      },
      auth
    );
  }, []);

  return (
    <div className="grid gap-6 mt-10 mb-6 md:grid-cols-2">
      <input
        type="tel"
        id="phone"
        name="phone"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="123-45-678"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        required
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setPhone(e.currentTarget.value)
        }
      />
      <button
        type="button"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => requestOtp()}
      >
        Sign in with Phone
      </button>
      <input
        type="text"
        id="code"
        name="code"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setCode(e.currentTarget.value)
        }
      />
      <button
        type="button"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => handleConfirmCode()}
      >
        Confirm Code
      </button>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
