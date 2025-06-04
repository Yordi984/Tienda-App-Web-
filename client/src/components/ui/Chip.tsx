import { cn } from '../../utils/cn';
import styles from './Chip.module.css';

interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  active?: boolean;
}

export default function Chip({ label, active, ...props }: ChipProps) {
  return (
    <span
      className={cn(styles.chip, active ? styles.chipActive : '')}
      {...props}
    >
      {props.children || label}
    </span>
  );
}
