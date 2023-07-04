import { formatCNPJ } from './cnpjFormatter';

describe('formatCNPJ', () => {
  it('should remove non-digit characters from CNPJ', () => {
    const cnpj = '12.345.678/0001-90';
    const expectedResult = '12345678000190';

    const formattedCNPJ = formatCNPJ(cnpj);

    expect(formattedCNPJ).toEqual(expectedResult);
  });

  it('should return empty string if CNPJ is null', () => {
    const cnpj = null;
    const expectedResult = '';

    const formattedCNPJ = formatCNPJ(cnpj);

    expect(formattedCNPJ).toEqual(expectedResult);
  });

  it('should return empty string if CNPJ is undefined', () => {
    const cnpj = undefined;
    const expectedResult = '';

    const formattedCNPJ = formatCNPJ(cnpj);

    expect(formattedCNPJ).toEqual(expectedResult);
  });

  it('should return empty string if CNPJ is empty', () => {
    const cnpj = '';
    const expectedResult = '';

    const formattedCNPJ = formatCNPJ(cnpj);

    expect(formattedCNPJ).toEqual(expectedResult);
  });
});
