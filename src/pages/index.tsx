import Head from "next/head";
import { useRouter } from "next/router";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {date} from "zod";

/**
  Calculates the time difference between the server time and client time.
  @param {Date} serverTime - The server time.
  @param {Date} clientTime - The client time.
  @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
*/
const calculateTimeDifference = (server: Date, client: Date) => {
  const difference = (server.getTime() - client.getTime())/1000;
  return difference;
};

export const getServerSideProps: () => Promise<{ props: { Server: string } }> = async () => {
  const Server = new Date().toISOString();
  return { props: { Server } }
}

export default function Home({ Server,}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const moveToTaskManager = () => {
    router.push("/tasks");
  }
  const ClientTime = new Date();
  const ServerTime = new Date(Server);
  const time = `${ServerTime.getDate()}-${ServerTime.getMonth()}-${ServerTime.getFullYear()} ${ServerTime.getHours()}:${ServerTime.getMinutes()}`;
  const differenceTime = calculateTimeDifference(ClientTime, ServerTime);

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          {/* Display here the server time (DD-MM-AAAA HH:mm)*/}
          <p>
            Server time: {time}
          </p>

          {/* Display here the time difference between the server side and the client side */}
          <p>
            Time diff:  {differenceTime.toString()} s
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
