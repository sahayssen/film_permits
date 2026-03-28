import permits from '$lib/data/permits.json';

export function load() {
  return {
    showHeader: true,
    showFooter: true,
    permits,
  };
}