import { Text } from "../../atoms/Text/Text";
import "./LogViewer.css";

export default function LogViewer({ logs }: { logs: string[] }) {
  return (
    <div className="log-viewer">
      <Text as="h3" variant="label">
        Logs
      </Text>
      {/* tabIndex, чтобы длинные логи можно было прокручивать с клавиатуры */}
      <Text as="pre" variant="code" className="log-viewer__output" tabIndex={0}>
        {logs.length > 0 ? logs.join("\n") : "No logs yet."}
      </Text>
    </div>
  );
}
