// hooks/useFormattedDate.ts
import { useMemo } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale'; // Impor locale Bahasa Indonesia

type Options = {
  formatString?: string;
  relative?: boolean;
};

export function useFormattedDate(
  date: string | Date,
  options: Options = {}
): string {
  const { formatString = 'd MMMM yyyy', relative = false } = options;

  const memoizedDate = useMemo(() => {
    const dateObj = new Date(date);

    if (relative) {
      return formatDistanceToNow(dateObj, {
        addSuffix: true,
        locale: id,
      });
    }

    return format(dateObj, formatString, {
      locale: id,
    });
  }, [date, formatString, relative]);

  return memoizedDate;
}