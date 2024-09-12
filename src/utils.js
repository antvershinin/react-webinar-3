const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

export const pluralizeNum = number => {
  const stringNum = String(number);
  const digitExceptions = stringNum.endsWith('2') || stringNum.endsWith('3') || stringNum.endsWith('4')
  const tensExceptions = stringNum.includes('12') || stringNum.includes('13') || stringNum.includes('14')

  return ` | Выделяли ${number} раз${(digitExceptions && !tensExceptions) ? 'а' : ''}`;
};
