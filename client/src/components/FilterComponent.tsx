import styles from './FilterComponent.module.css';
import ChipGroup from './ui/ChipGroup';

interface FilterComponentProps {
  label: string;
  categories: { label: string; value: string }[];
  onFilter?: (filter: string) => void;
}

export default function FilterComponent({
  label,
  categories,
  onFilter,
}: FilterComponentProps) {
  const handleCategorySelection = (category: string) => {
    onFilter?.(category);
  };

  return (
    <div className={styles.headerCategories}>
      <span className={styles.headerCategories__title}>{label}</span>

      <ChipGroup
        chips={categories}
        onClick={handleCategorySelection}
      />
    </div>
  );
}
