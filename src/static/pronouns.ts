import { createRow, formatRows } from './functions.ts';

export type PronounsLegendKey = 'love' | 'okay' | 'close';

export interface PronounsLegendItemData {
  preference: PronounsLegendKey;
  description: string;
}

export interface PronounsItemValueData {
  value: string;
  preference: PronounsLegendKey;
}

export interface PronounsItemData {
  title: string;
  values: PronounsItemValueData[];
}

export interface PronounsData {
  Legend: PronounsLegendItemData[];
  Items: PronounsItemData[];
}

export type PronounRow = [string, string, string];

export function convertPronounsItemValueDataToRow(data: PronounsItemValueData, index: number): PronounRow {
  return createRow(index, data.value, data.preference);
}

export function convertPronounsItemData(data: PronounsItemData): string[] {
  const rows: PronounRow[] = [
    ['ID', 'VALUE', 'PREFERENCE'],
    ...data.values.map((item, index) => convertPronounsItemValueDataToRow(item, index))
  ];
  return ['', data.title, ...formatRows(rows)];
}

export function convertPronounsLegendItemDataToRow(data: PronounsLegendItemData, index: number): PronounRow {
  return createRow(index, data.preference, data.description);
}

export function convertPronounsLegendItemData(data: PronounsData['Legend']): string[] {
  const rows: PronounRow[] = [
    ['ID', 'PREFERENCE', 'DESCRIPTION'],
    ...data.map((item, index) => convertPronounsLegendItemDataToRow(item, index))
  ];
  return ['legend', ...formatRows(rows)];
}

export function convertPronounsData({ Legend, Items }: PronounsData): string[] {
  return [...Items.flatMap(convertPronounsItemData), '', ...convertPronounsLegendItemData(Legend)];
}
