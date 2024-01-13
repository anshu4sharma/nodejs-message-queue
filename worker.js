
import { Worker } from "bullmq";
import { connectionObj } from "./connection.js";

const mockSendEmail = async (payload) => {
  const { from, to, subject, body } = payload;
  return new Promise((resolve) => {
    console.log(`Sending Email to ${to}....`);
    setTimeout(() => resolve(1), 4 * 1000);
  });
};

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const data = job.data;
    console.log("Job Rec.. ", job.id);

    await mockSendEmail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      body: data.body,
    });
  },
  {
    ...connectionObj,
    limiter: {
      max: 50,
      duration: 10 * 1000,
    },
  }
);

export default emailWorker;
