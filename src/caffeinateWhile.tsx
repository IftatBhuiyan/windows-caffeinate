import { Action, ActionPanel, Form, popToRoot } from "@raycast/api";
import { useEffect, useState } from "react";
import { RunningApp, getRunningApps, startCaffeinate } from "./utils";

export default function Command() {
  const [loading, setLoading] = useState(true);
  const [apps, setApps] = useState<RunningApp[]>([]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const running = await getRunningApps();
      if (!isMounted) return;
      setApps(running);
      setLoading(false);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Form
      isLoading={loading}
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Caffeinate"
            onSubmit={async (data: { process: string }) => {
              await startCaffeinate({ status: true }, "Caffeinate process started", {
                watchPid: Number(data.process),
              });
              popToRoot();
            }}
          />
        </ActionPanel>
      }
    >
      <Form.Dropdown id="process" title="Application">
        {apps.map((app) => (
          <Form.Dropdown.Item key={`${app.pid}`} value={`${app.pid}`} title={app.name} />
        ))}
      </Form.Dropdown>
    </Form>
  );
}
