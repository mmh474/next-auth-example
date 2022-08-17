import { unstable_getServerSession } from "next-auth/next";
import { GetServerSideProps } from "next/types";
import Layout from "../components/layout";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Page() {
  return (
    <Layout>
      <h1>
        This page is protected by Server Side, using unstable_getServerSession
      </h1>
      <p>Only admin users can see this page.</p>
      <p>
        To learn more about the NextAuth middleware see&nbsp;
        <a href="https://docs-git-misc-docs-nextauthjs.vercel.app/configuration/nextjs#middleware">
          the docs
        </a>
        .
      </p>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
