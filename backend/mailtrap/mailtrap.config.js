import { MailtrapClient } from "mailtrap";

const TOKEN = "618b4a9337d7406292e66c87d919c70a";

export const mailTrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "entrynest Test",
};  
 
