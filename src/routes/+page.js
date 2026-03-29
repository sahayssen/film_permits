import officers from '$lib/data/officers.json';

export function load() {
  const sortedOfficers = [...officers].sort(
    (a, b) => Number(b.total_substantiated_complaints) - Number(a.total_substantiated_complaints)
  );

  return {
    showHeader: true,
    showFooter: true,
    officers: sortedOfficers,
  };
}