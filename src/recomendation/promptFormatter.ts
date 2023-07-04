import { MenuItem } from 'src/restaurant/entities/menuItem';
import { MenuFilters } from './IMenuFilters';

export const formatter = (filter: MenuFilters, menu: MenuItem[]) => {
  return `Considerando esse filtro ${filter}, sugira a verdadeira melhor opção dentro desse cardápio ${menu}, responda apenas única e exclusivamente, estritamente o ID do item`;
};
