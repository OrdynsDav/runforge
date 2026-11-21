import { Text } from "../../atoms/Text/Text";
import "./StateMessage.css";

type StateMessageProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function StateMessage({
  title,
  description,
  actionLabel,
  onAction,
}: StateMessageProps) {
  return (
    <div className="state-message">
      <Text as="h2" variant="title">
        {title}
      </Text>
      <Text as="p" variant="caption">
        {description}
      </Text>
      {actionLabel && onAction && (
        <button
          type="button"
          className="state-message__action"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
