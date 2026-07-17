import { startCaffeinate, getSchedule, changeScheduleState } from "./utils";

export default async function Command() {
  const schedule = await getSchedule();
  if (schedule !== undefined) await changeScheduleState("decaffeinate", schedule);
  await startCaffeinate({ status: true }, "Your PC is now caffeinated");
}
