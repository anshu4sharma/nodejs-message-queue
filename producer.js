import { Queue } from "bullmq";
import { connectionObj } from "./connection.js";

const notificationQueue = new Queue("email-queue", {
  ...connectionObj,
});

async function init() {
  const res = await notificationQueue.add("email to anshu", {
    from: "anshu@gmail.com",
    to: "sharma@gmail.com",
    subject: "hello from me !",
    body: "hey anshu welcome to bullq",
  });
  console.log("Job added to queue", res.id);
}

init();
