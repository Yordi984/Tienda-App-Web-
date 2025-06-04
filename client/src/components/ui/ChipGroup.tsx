import { useState } from 'react';
import Chip from './Chip';
import styles from './ChipGroup.module.css';

interface ChipGroupProps {
  chips: { label: string; value: string }[];
  onClick?: (value: string) => void;
}

export default function ChipGroup({ chips, onClick }: ChipGroupProps) {
  const [selectedChip, setSelectedChip] = useState<string | null>(
    chips[0]?.value || null,
  );

  const handleChipClick = (value: string) => {
    setSelectedChip(value);
    onClick?.(value);
  };

  return (
    <ul className={styles.headerCategories__categoriesList}>
      {chips.map((chip) => (
        <li key={chip.value}>
          <Chip
            active={selectedChip === chip.value}
            onClick={() => handleChipClick(chip.value)}
          >
            {chip.label}
          </Chip>
        </li>
      ))}
    </ul>
  );
}
