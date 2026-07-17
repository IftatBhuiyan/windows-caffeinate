import { startCaffeinate, stopCaffeinate, isCaffeinateRunning } from "./utils";

export default async function Command() {
  const running = await isCaffeinateRunning();
  if (running) {
    await stopCaffeinate({ status: true }, "Your PC is now decaffeinated");
  } else {
    await startCaffeinate({ status: true }, "Your PC is now caffeinated");
  }
}
