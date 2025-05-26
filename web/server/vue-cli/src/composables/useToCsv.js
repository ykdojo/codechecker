export function useToCsv() {
  const convertToCsv = (data, headers) => {
    if (!data || !data.length) return '';

    const headerRow = headers.join(',') + '\n';
    const rows = data.map(item =>
      headers.map(header => JSON.stringify(item[header] || '')).join(',')
    );

    return headerRow + rows.join('\n');
  };

  const downloadCsv = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    convertToCsv,
    downloadCsv
  };
}