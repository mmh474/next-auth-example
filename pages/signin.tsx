import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="absolute inset-0 flex w-full h-full items-center justify-center">
      {Object.values(providers).map((provider: any) => (
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={() => signIn(provider.id)}
        >
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
