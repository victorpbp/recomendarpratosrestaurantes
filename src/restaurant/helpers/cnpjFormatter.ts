export function formatCNPJ(cnpj: string): string {
  return cnpj.replace(/\D/g, '');
}
