export function convertIndexToHex(index: number): string {
  return `0x${index.toString(16).padStart(2, '0')}`;
}

export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createRow<Values extends string[], Row>(index: number, ...values: Values): Row {
  return [convertIndexToHex(index), ...values] as Row;
}

export function formatRows(rows: string[][]): string[] {
  if (rows.length === 0) return [];
  const columnWidths = rows[0]!.map((_, columnIndex) => Math.max(...rows.map((row) => row[columnIndex]?.length ?? 0)));

  return rows.map((row) =>
    row
      .map((value, index) => {
        if (index === row.length - 1) return value;
        return `${value.padEnd(columnWidths[index] ?? value.length)} `;
      })
      .join('')
  );
}
